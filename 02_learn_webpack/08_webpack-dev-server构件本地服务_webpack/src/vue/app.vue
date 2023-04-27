<template>
  <!-- template 中的内容可以通过 vue-loader 把 template 中的内容编译之后放到 export default 中 一起导出 -->
  <h2>vue文件渲染</h2>
  <h2>{{message}}</h2>
  <HelloWorld />
</template>

<script>
import HelloWorld from './hello.vue'
export default {
  components: {
    HelloWorld
  },
  data () {
    return {
      message: '.vue文件中的内容'
    }
  }
}
</script>

<style scoped>
h2 {
  color: red;
}
</style>