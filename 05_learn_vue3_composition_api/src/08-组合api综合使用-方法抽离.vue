// 综合使用 reactive函数、toRefs函数

<template>
  <div>
    <div>坐标</div>
    <!-- <div>x: {{mouse.x}}</div> -->
    <!-- <div>y: {{mouse.y}}</div> -->
    <div>x: {{x}}</div>
    <div>y: {{y}}</div>

    <hr>

    <div>{{count}} <button @click="add">累加1</button></div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onUnmounted, ref } from 'vue'

// 抽离方法一
const mouseComponent = () => {
  // 定义复杂类型的响应式数据
  const mouse = reactive({
    x: 0,
    y: 0
  })

  // 修改响应式数据
  const move = (e) => {
    // console.log(e);
    mouse.x = e.pageX
    mouse.y = e.pageY
  }

  // 等dom渲染完毕，再监听事件
  onMounted(() => {
    // 监听鼠标移动事件
    document.addEventListener('mousemove', move)
  })

  // 组件销毁，删除事件
  onUnmounted(() => {
    document.removeEventListener('mousemove', move)
  })

  return mouse
}

// 抽离方法二
const countComponent = () => {
  const count = ref(0)
  const add = () => {
    count.value++
  }
  return { count, add }
}

export default {
  setup () {

    // 功能一：
    // 使用抽离的方法
    const mouse = mouseComponent()

    // 功能二：
    const { count, add } = countComponent()

    // 返回响应式数据
    // return { mouse }
    return { ...toRefs(mouse), count, add }
  }
}
</script>