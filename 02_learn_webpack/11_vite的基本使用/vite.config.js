// 从 @vitejs/plugin-vue 这个插件中导入 vue 这个方法 
const vue = require('@vitejs/plugin-vue');

module.exports = {
  plugins: [
    // 调用导入的 vue 方法
    vue(),
  ]
}