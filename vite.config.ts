import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/main.ts"),
      name: "HotVar",
      // the proper extensions will be added
      fileName: "hotvar",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
