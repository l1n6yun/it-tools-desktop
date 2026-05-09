import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import markdown from 'vite-plugin-vue-markdown'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/main/index.ts'),
        },
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/preload/index.ts'),
        },
      },
    },
  },
  renderer: {
    root: resolve(__dirname, 'src/renderer'),
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/renderer/index.html'),
        },
      },
    },
    plugins: [
      VueI18n({
        runtimeOnly: true,
        jitCompilation: true,
        compositionOnly: true,
        fullInstall: true,
        strictMessage: false,
        include: [resolve(__dirname, 'locales/**')],
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
          'vue-i18n',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
          },
        ],
        vueTemplate: true,
        dts: resolve(__dirname, 'src/renderer/src/auto-imports.d.ts'),
        eslintrc: {
          enabled: true,
        },
      }),
      Icons({ compiler: 'vue3' }),
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      vueJsx(),
      markdown(),
      svgLoader(),
      Components({
        dirs: ['src/'],
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        resolvers: [NaiveUiResolver(), IconsResolver({ prefix: 'icon' })],
        dts: resolve(__dirname, 'src/renderer/src/components.d.ts'),
      }),
      Unocss(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src/renderer/src'),
      },
    },
    define: {
      'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
    },
  },
})
