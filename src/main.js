import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//import ElementPlus from 'element-plus'
import router from "./router/index.js";
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/less/index.less'
import store from './store/index.js'
import './api/mock.js'
import api from './api/api.js'
import './assets/font/iconfont.css'
const app=createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$app=api
app.use(store)
//app.use(ElementPlus)
app.use(router)
app.mount('#app')
