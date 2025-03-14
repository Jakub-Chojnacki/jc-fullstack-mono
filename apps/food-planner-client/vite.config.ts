import commonjs from "@rollup/plugin-commonjs";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), react()],
  build: {
    rollupOptions: {
      plugins: [commonjs()],
    },
  },
  optimizeDeps: {
    include: ["@jcmono/api-contract/**/*"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
