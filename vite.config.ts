import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `import { jsx } from 'react';`,
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "vite-plugin-ts-config-paths",
          setup(build) {
            build.onResolve({ filter: /.*/ }, (args) => {
              if (args.path.endsWith(".vue")) {
                return {
                  path: args.path,
                  namespace: "vue-raw",
                };
              }
            });
          },
        },
      ],
    },
  },
  rewrites: [
    {
      source: "/(.*)",
      destination: "/index.html",
    },
  ],
});
