import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const dotenv = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        plugins: [["@swc/plugin-emotion", {}]],
      }),
      tsconfigPaths(),
    ],
    server: {
      proxy: {
        "/ai": {
          target: "https://api.openai.com/v1",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/ai/, ""),
          headers: {
            Authorization: `Bearer ${dotenv.OPENAI_API_KEY}`,
          },
        },
        "/image": {
          target: "https://api.freepik.com/v1/ai/text-to-image",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/image/, ""),
          headers: {
            "x-freepik-api-key": dotenv.FREEPIK_API_KEY,
          },
        },
      },
    },
  };
});
