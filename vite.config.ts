import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";
console.log("node env: ", process.env.NODE_ENV);

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: process.env.VITE_IPFS_BUILD === 'true' ? './' : '/',
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      ...(command === "serve"
        ? {
            include: ["buffer", "process"],
            exclude: [],
          }
        : {}),
    }),
  ],
  define: {
    global: "globalThis",
    // "globalThis.process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    // "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    // preventAssignment: true,
  },
  esbuild: {
    target: "esnext",
    define: {
      global: "globalThis",
    },
  },
  envPrefix: ["VITE_"],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      components: resolve(__dirname, "./src/components"),
      hooks: resolve(__dirname, "./src/hooks"),
      contexts: resolve(__dirname, "./src/contexts"),
      utils: resolve(__dirname, "./src/utils"),
      stores: resolve(__dirname, "./src/stores"),
      views: resolve(__dirname, "./src/views"),
      ...(command === "serve"
        ? {
            buffer: "buffer",
            process: "process",
          }
        : {}),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    ...(process.env.VITE_IPFS_BUILD === 'true' ? {
      assetsInlineLimit: 0, // Don't inline assets for IPFS
    } : {}),
  },
  optimizeDeps: {
    exclude: ["@trezor/connect-web", "@trezor/connect"],
    force: true,
  },
  server: {
    port: 3000,
    host: true,
    fs: {
      strict: false,
    },
  },
  publicDir: "public",
}));
