// ref 属性

<template>
  <div>
    <!-- 
      vue2.0 中通过ref获取单个dom
      1、通过ref属性绑定该元素
      2、通过this.$refs.box获取单个dom
     -->
    <div ref="box">box</div>
    <!-- 
      vue2.0 中通过ref获取多个元素
      1、通过ref属性绑定被遍历元素
      2、通过this.$refs.li 获取所有遍历元素
      3、通过索引介可以选择具体哪一个元素
     -->
    <ul>
      <li
        v-for="i in 4"
        :key='i'
        :ref='li'
      >{{i}}</li>
    </ul>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
  name: 'App',
  setup () {
    // vue3.0 中通过ref获取单个dom
    // 1、先定义一个空的响应式数据，可以使用ref函数定义任何格式的响应式数据
    // 2、setup中返回该数据，你想获取哪个dom元素，就在该元素上使用ref属性绑定该数据即可
    // 3、注意：如果想获取dom元素，需要在 onMounted 生命周期函数中获取
    const box = ref(null)
    console.log(box);
    console.log(box.value);  // null
    // 在 onMounted 生命周期函数中获取dom元素
    onMounted(() => {
      console.log('11', box.value);  // <div>...</div>
    })

    // vue3.0 中通过ref获取多个dom
    // 1、先定义一个空数组，接收所有的dom
    // 2、定义一个函数，往空数组中 push dom
    const domList = []
    const li = (el) => {
      console.log('00', el);
      domList.push(el)
    }
    console.log(domList);
    onMounted(() => {
      console.log('22', domList);
    })

    return { box, li }
  }
}
</script>