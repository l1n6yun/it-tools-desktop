import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import shadow from 'vue-shadow-dom'

import 'virtual:uno.css'

import { naive } from './plugins/naive.plugin'
import { electronPlugin } from './plugins/electron.plugin'

import App from './App.vue'
import router from './router'
import { i18nPlugin } from './plugins/i18n.plugin'
import { useStyleStore } from './stores/style.store'

const app = createApp(App)

app.use(createPinia())
app.use(createHead())
app.use(i18nPlugin)
app.use(router)
app.use(naive)
app.use(shadow)

// 在 Electron 中禁用 Plausible 追踪，提供空的 plausible 实例
app.provide('plausible', undefined)

// 使用 Electron 插件
const styleStore = useStyleStore()
app.use(electronPlugin, {
  onDarkModeToggle: () => {
    styleStore.toggleDark()
  },
})

app.mount('#app')
