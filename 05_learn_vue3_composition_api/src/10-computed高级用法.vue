// computed 函数，用来定义计算属性的，计算属性不能修改

<template>
  <div>n: {{n}}</div>
  <div>m: {{m}}</div>
  <!-- 使用 v-model 来绑定计算属性 -->
  <input
    type="text"
    v-model="m"
  >
</template>

<script>
import { computed, ref } from 'vue'
export default {
  setup () {
    const n = ref(0)

    // 计算属性两种用法

    // 计算属性普通用法，传入方法，返回值就是计算属性的值
    // const m = computed(() => {
    //   return n.value + 2
    // })

    // 计算属性高级用法，传入对象，get方法获取计算属性的值，set方法监听计算属性的改变
    const m = computed({
      // get 函数，获取计算属性的值，是computed方法提供的一个对象参数
      get () {
        return +n.value + 2
      },
      // set 函数，给计算属性设置值的时候触发
      set (value) {
        console.log(value);
        return n.value = value
      }
    })

    return { n, m }
  }
}
</script>