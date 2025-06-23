/// <reference types="vitest/config" />
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "api",
      fileName: (format: string) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["@tanstack/react-query"],
      output: {
        globals: {
          "@tanstack/react-query": "ReactQuery",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
  },
});
