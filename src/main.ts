import './assets/main.css'
import App from './components/App.vue'
import { createApp } from 'vue'
import useMsDisAppI18n from './locale/config/i18n'

const app = createApp(App)

useMsDisAppI18n(app, {
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  locales: ['ru', 'en'],
})

app.mount('#app')
