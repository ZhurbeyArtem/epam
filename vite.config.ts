import react from "@vitejs/plugin-react";
import { defineConfig, UserConfig } from "vite";
import svgr from "vite-plugin-svgr";

const config: UserConfig = defineConfig({
  plugins: [react(), svgr()],
  esbuild: {
    jsxFactory: "jsx",
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

export default config;
