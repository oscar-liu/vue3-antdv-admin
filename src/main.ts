import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "./assets/css/base.less";
import 'ant-design-vue/dist/reset.css';
import "./assets/css/layout.less";

import './permission'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
