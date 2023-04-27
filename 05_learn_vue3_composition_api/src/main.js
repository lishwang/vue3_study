// main.js 主要职责：创建一个vue应用（理解成之前的跟实例）
// 1、从vue中按需导入createApp函数
// 2、创建一个跟组件App.vue并导入至main.js中
// 3、使用createApp创建应用实例
// 4、应用实例挂载到#app容器中

import { createApp } from 'vue'
import App from './App.vue'
// 依赖根组件创建一个跟实例
const app = createApp(App)
// 将实例挂载到#app容器中
app.mount('#app')