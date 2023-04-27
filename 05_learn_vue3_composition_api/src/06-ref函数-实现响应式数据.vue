// ref 函数的使用

// ref 函数 和 reactive 函数的区别：
// reactive 常用于定义 复杂数据类型的响应式数据 -- 定义明确的复杂数据类型的响应式数据
// ref 常用于定义 简单数据类型的响应式数据，或者不明确要定义的数据类型的响应式数据

<template>
  <div>{{name}}</div>
  <div>{{age}}</div>
  <button @click="updateName">修改</button>
</template>

<script>
import { ref } from 'vue'

export default ({
  setup () {
    // 定义简单数据类型的响应式数据
    const name = ref('ls')
    const age = ref(20)

    const updateName = () => {
      console.log('updateName');
      name.value = 'zs'
    }

    return { name, age, updateName }
  },
})
</script>
