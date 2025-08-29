// vite.config.ts
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path"; // ✅ built-in, no need to install
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
// 👇 This replaces __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
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
});
