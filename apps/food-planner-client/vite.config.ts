import path from "node:path";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const API_TARGET = `${env.VITE_API_TARGET ?? "http://localhost:3000"}`;

  return ({
    plugins: [
      TanStackRouterVite({ autoCodeSplitting: true }),
      react(),
      tsconfigPaths(),
    ],
    build: {

    },
    optimizeDeps: {
      include: ["@jcmono/api-contract/**/*"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@forms": path.resolve(__dirname, "./src/forms"),
        "@queries": path.resolve(__dirname, "./src/queries"),
        "@layouts": path.resolve(__dirname, "./src/layouts"),
      },
    },

    server: {
      proxy: {
        "/api": {
          target: API_TARGET,
          changeOrigin: true,
        },
      },
    },
  });
},
);
