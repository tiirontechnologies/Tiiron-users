// vite.config.ts
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// 👇 This replaces __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  server: {
    port: 5173
  },
  preview: {
    port: 3002
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@icons": path.resolve(__dirname, "src/assets/icons"),
      "@images": path.resolve(__dirname, "src/assets/images"),
    },
  },
  optimizeDeps: {
    include: ["@emotion/styled", "@emotion/react", "@mui/material"],
  },
});
