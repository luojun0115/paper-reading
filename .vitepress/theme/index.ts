import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import Layout from './Layout.vue'
import Home from './Home.vue'
import PaperGrid from './PaperGrid.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'

import './themes.generated.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Home', Home)
    app.component('PaperGrid', PaperGrid)
    app.component('ThemeSwitcher', ThemeSwitcher)
  }
} satisfies Theme
