import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import legacy from "@vitejs/plugin-legacy";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [
      react(),

      legacy({
        targets: ["defaults", "not IE 11"],
      }),

      // 🟢 image optimization (production only)
      ...(isProd
        ? [
          viteImagemin({
            gifsicle: { optimizationLevel: 7 },
            optipng: { optimizationLevel: 7 },
            mozjpeg: { quality: 80 },
            svgo: { plugins: [{ removeViewBox: false }] },
          }),
        ]
        : []),

      // gzip
      viteCompression({
        algorithm: "gzip",
        ext: ".gz",
      }),

      // brotli
      viteCompression({
        algorithm: "brotliCompress",
        ext: ".br",
      }),

      // bundle analyzer (production only)
      ...(isProd
        ? [
          visualizer({
            filename: "dist/stats.html",
            gzipSize: true,
            brotliSize: true,
            open: false,
          }),
        ]
        : []),
    ],

    /**
     * ⚠️ كفاية جدًا — ومش محتاج أي hacks زيادة
     */
    define: {
      "process.env.NODE_ENV": JSON.stringify(
        isProd ? "production" : "development"
      ),
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom"],
    },

    build: {
      target: "esnext",
      sourcemap: false,
      emptyOutDir: true,
      chunkSizeWarningLimit: 600,

      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.info", "console.debug"],
          passes: 2,
          dead_code: true,
        },
        format: {
          comments: false,
        },
      },

      cssCodeSplit: true,
      reportCompressedSize: true,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;

            const parts = id.split("node_modules/")[1].split("/");
            const pkg = parts[0].startsWith("@")
              ? `${parts[0]}/${parts[1]}`
              : parts[0];

            if (pkg === "react" || pkg === "react-dom") return "react";
            if (pkg.includes("react-router")) return "router";
            if (pkg.includes("@tanstack")) return "tanstack";
            if (pkg === "axios") return "axios";
            if (pkg.includes("framer-motion")) return "motion";
            if (pkg.includes("keen-slider") || pkg.includes("swiper"))
              return "sliders";
            if (

              pkg.includes("sonner") ||
              pkg.includes("@radix-ui")
            )
              return "ui";

            return `vendor-${pkg.replace("/", "__")}`;
          },

          entryFileNames: "assets/js/[name]-[hash].js",
          chunkFileNames: "assets/js/[name]-[hash].js",

          assetFileNames: (assetInfo) => {
            const name = assetInfo.name ?? "";

            if (name.endsWith(".css"))
              return "assets/css/[name]-[hash][extname]";

            if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name))
              return "assets/img/[name]-[hash][extname]";

            if (/\.(woff2?|ttf|otf|eot)$/i.test(name))
              return "assets/fonts/[name]-[hash][extname]";

            return "assets/[name]-[hash][extname]";
          },
        },
      },
    },

    server: {
      port: 3000,
    },
  };
});

