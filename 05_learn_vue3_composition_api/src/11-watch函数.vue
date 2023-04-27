// watch 监听器

<template>
  <div>
    <div>{{count}}</div>
    <button @click="add">自增</button>
    <hr>
    <div>name: {{obj.name}}</div>
    <div>age: {{obj.age}}</div>
    <button @click="updateName">改变</button>
    <hr>
    <div>sex: {{obj.person.sex}}</div>
    <button @click="sexChange">深度改变</button>
  </div>
</template>

<script>
import { ref, watch, reactive } from 'vue'
export default {
  setup () {
    // 定义一个ref简单响应式数据
    const count = ref(0)
    // 修改响应式数据
    const add = () => {
      console.log(count);
      count.value++
    }
    // 监听一个ref响应式数据
    // 1、第一个参数，需要监听的目标
    // 2、第二个参数，监听的对象改变后触发的函数
    watch(count, (newVal, oldVal) => {
      console.log(newVal, oldVal);
    })

    // 定义一个reactive复杂响应式数据
    const obj = reactive({
      name: 'zs',
      age: 18,
      person: {
        sex: 'nan'
      }
    })
    // 修改响应式数据
    const updateName = () => {
      console.log('updateName');
      obj.name = 'li'
    }
    // watch 监听一个reactive响应式数据
    // 1、第一个参数，需要监听的目标
    // 2、第二个参数，监听的对象改变后触发的函数
    // 3、第三个参数，配置选项，是一个对象，例如 { deep：true，immediate：true}  deep可以监听到更深层次的数据的变化；immediate 当页面一加载就触发watch
    watch(obj, (newVal, oldVal) => {
      console.log(newVal, oldVal);
    })

    // 监听多个响应式数据的变化
    watch([count, obj], () => {
      console.log('数据变化了');
    })

    // 监听对象中某个属性的变化 -- 需要写成函数返回该属性的方式才能监听到
    watch(() => obj.name, () => {
      console.log('监听obj.name改变了');
    })

    const sexChange = () => {
      obj.person.sex = 'nv123'
    }
    // 监听对象中更深层次的属性的变化（监听深层次变化的属性）  --  不需要用到 深度监听deep
    watch(() => obj.person.sex, () => {
      console.log('监听 obj.person.sex 改变了 -- 监听到属性');
    })

    // 监听对象中更深层次的属性的变化（监听深层次变化的属性的对象）  --  需要用到 深度监听deep
    watch(() => obj.person, () => {
      console.log('监听 obj.person.sex 改变了 -- 监听到对象');
    }, {
      deep: true
    })

    return { count, obj, add, updateName, sexChange }
  }
}
</script>