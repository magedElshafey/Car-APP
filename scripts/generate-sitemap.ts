import fs from "fs";

const SITE_URL = "https://q-car.dev.qutell.net";
const API_URL = "https://q-car.dev.qutell.net/api/site";

/* ========= API ROUTES (local copy) ========= */
const apiRoutes = {
  blogs: "blogs",
};

/* ========= Minimal Types (local) ========= */
type Blog = {
  slug: string;
};

/**
 * Backend may return:
 * 1) Paginated response with meta
 * 2) Non-paginated response (data only)
 */
type ApiResponse<T> = {
  data: T[];
  meta?: {
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
  };
};

/* ========= Fetch ALL items (paginated OR not) ========= */
async function fetchAllItems<T>(endpoint: string): Promise<T[]> {
  const allItems: T[] = [];

  // 1️⃣ Fetch first page
  const firstRes = await fetch(`${API_URL}/${endpoint}?page=1`);
  if (!firstRes.ok) {
    throw new Error(`Failed to fetch ${endpoint} page 1`);
  }

  const firstJson = (await firstRes.json()) as ApiResponse<T>;

  // لو data مش Array → نرجع فاضي عشان ما نكسرش
  if (!Array.isArray(firstJson.data)) {
    return [];
  }

  allItems.push(...firstJson.data);

  // 2️⃣ لو مفيش meta أو last_page → endpoint مش paginated
  const lastPage = firstJson.meta?.last_page;
  if (!lastPage || lastPage <= 1) {
    return allItems;
  }

  // 3️⃣ Fetch باقي الصفحات
  for (let page = 2; page <= lastPage; page++) {
    const res = await fetch(`${API_URL}/${endpoint}?page=${page}`);
    if (!res.ok) break;

    const json = (await res.json()) as ApiResponse<T>;
    if (Array.isArray(json.data)) {
      allItems.push(...json.data);
    }
  }

  return allItems;
}

async function generateSitemap() {
  /* ========= Static pages ========= */
  const staticPages = ["", "/about", "/blogs"];

  /* ========= Dynamic pages ========= */
  const blogs = await fetchAllItems<Blog>(apiRoutes.blogs);

  /* ========= Build URLs ========= */
  const urls = [
    ...staticPages.map((path) => `<url><loc>${SITE_URL}${path}</loc></url>`),

    ...blogs.map(
      (blog) => `<url><loc>${SITE_URL}/blogs/${blog.slug}</loc></url>`,
    ),
  ];

  /* ========= Sitemap XML ========= */
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
  console.log(`✅ sitemap.xml generated (${blogs.length} blogs)`);
}

generateSitemap().catch((err) => {
  console.error("❌ Sitemap generation failed:", err);
  process.exit(1);
});
