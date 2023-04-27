// computed 函数，用来定义计算属性的，计算属性不能修改

<template>
  <div>n: {{n}}</div>
  <div>m: {{m}}</div>
</template>

<script>
import { computed, ref } from 'vue'
export default {
  setup () {
    const n = ref(0)
    const m = computed(() => {
      return n.value + 2
    })

    return { n, m }
  }
}
</script>