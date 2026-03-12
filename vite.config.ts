import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig((configEnv) => {
  const localEnv = loadEnv(configEnv.mode, process.cwd())

  return {
    plugins: [vue(), vueJsx(), vueDevTools()],
    server: {
      port: Number(localEnv.VITE_PORT ?? 8080),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
