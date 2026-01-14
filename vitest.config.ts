/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
  resolve: {
    alias: {
      "/api": path.resolve(__dirname, "./src/api"),
      "/features": path.resolve(__dirname, "./src/app/features"),
      "/pages": path.resolve(__dirname, "./src/app/pages"),
      "/store": path.resolve(__dirname, "./src/app/store"),
      "/ui": path.resolve(__dirname, "./src/app/ui"),
    },
  },
});
