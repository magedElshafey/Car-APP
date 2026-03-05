import fs from "fs";

const SITE_URL = "https://wisefollowup.com";
const API_URL = "https://dashboard.wisefollowup.com/api/v1";

/* ========= API ROUTES (local copy) ========= */
const apiRoutes = {
  blogs: "blogs",
  leaflets: "leaflets",
};

/* ========= Minimal Types (local) ========= */
type Blog = {
  slug: string;
};

type Leaflet = {
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
  const staticPages = [
    "",
    "/about",
    "/contact-us",
    "/blogs",
    "/leaflets",
    "/medical-calculators",
    "/policies/privacy-policy",
    "/policies/cookies-policy",
    "/policies/terms-of-use",
    "/policies/medical-disclaimer",
  ];

  /* ========= Dynamic pages ========= */
  const blogs = await fetchAllItems<Blog>(apiRoutes.blogs);
  const leaflets = await fetchAllItems<Leaflet>(apiRoutes.leaflets);

  /* ========= Build URLs ========= */
  const urls = [
    ...staticPages.map((path) => `<url><loc>${SITE_URL}${path}</loc></url>`),

    ...blogs.map(
      (blog) => `<url><loc>${SITE_URL}/blogs/${blog.slug}</loc></url>`,
    ),

    ...leaflets.map(
      (leaflet) => `<url><loc>${SITE_URL}/leaflets/${leaflet.slug}</loc></url>`,
    ),
  ];

  /* ========= Sitemap XML ========= */
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap);
  console.log(
    `✅ sitemap.xml generated (${blogs.length} blogs, ${leaflets.length} leaflets)`,
  );
}

generateSitemap().catch((err) => {
  console.error("❌ Sitemap generation failed:", err);
  process.exit(1);
});
