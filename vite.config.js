import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'vite-plugin-md'
import AutoImport from 'unplugin-auto-import/vite'
import LinkAttributes from 'markdown-it-link-attributes'
import Shiki from 'markdown-it-shiki'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),

    Pages({
      routeStyle: 'nuxt'
    }),

    Components({
      dirs: [
        'src/components',
        'src/articles'
      ],
      extensions: ['vue', 'md']
    }),

    Markdown({
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Shiki, {
          theme: 'monokai'
        })
        md.use(LinkAttributes, {
          matcher: (link) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),

    AutoImport({
      imports: [
        'vue',
        'vue-router'
      ]
    })
  ]
})
