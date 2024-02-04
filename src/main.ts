import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "./assets/css/base.less";
import 'ant-design-vue/dist/reset.css';
import "./assets/css/layout.less";

import './permission'

const app = createApp(App)

//导入组件库
import * as Icons from '@ant-design/icons-vue'
// 注册组件
Object.keys(Icons).map(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})


app.use(createPinia())
app.use(router)
app.mount('#app')
