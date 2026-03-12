import '@/shared/assets/main.css'

import { createApp } from 'vue'
import App from '@/app/App.vue'
import router from './router'
import { RegleVuePlugin } from '@regle/core'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin)
app.use(RegleVuePlugin)

app.mount('#app')
