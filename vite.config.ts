import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    commonjsOptions: {
      include: ["tailwind.config.js", "node_modules/**"],
    },
  //  outDir:'D:/Projects/nobel/hris/public'
  rollupOptions: {
    output: {
      dir: 'D:/Projects/nobel/hris/public/assets',
      entryFileNames: '[name].js',
      assetFileNames: 'assets/[name].[ext]',
      chunkFileNames: "chunk-[name].js",
      manualChunks: undefined,
      
    }
  }
  },
  optimizeDeps: {
    include: ["tailwind-config"],
  },
  plugins: [react()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "tailwind-config": path.resolve(__dirname, "./tailwind.config.js"),
    },
  },
  
});
