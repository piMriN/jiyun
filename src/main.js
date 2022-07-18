import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './permission'

const app = createApp(App)
app.use(ElementPlus).use(store).use(router).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
