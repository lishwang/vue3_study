8*8
// 根组件

// vue3 写法 -- 组合api
<template>
  <div class="container">
    vue3 组合api写法
    <h1>{{obj.name}}</h1>
    <h1>{{obj.age}}</h1>
    <button @click="updateName">修改名字</button>
    <button @click="updateAge">修改年龄</button>
  </div>
</template>
<script>
// 从vue中按需引入reactive
import { reactive } from 'vue';
export default {
  name: 'App',
  // 组合api的起点，组合api的代码基本上都写在这儿
  // 可以理解为：在beforeCreate钩子函数，组件实例创建前就会被执行
  // 函数中的this=>undefined
  // 模板中使用的数据和函数需要在setup中返回，必须返回一个对象
  setup () {
    console.log('setup', this);

    // setup中定义数据
    // 普通数据  -- 不能被修改，不是响应式的
    // const obj = {
    //   name: 'zs',
    //   age: 18
    // }

    // reactive是一个函数，它可以定义一个复杂数据类型，并使其成为响应式数据
    // reactive函数定义的数据，可以实现响应式修改
    // 注意：使用 reactive 函数之前需要从vue中按需引入
    const obj = reactive({
      name: 'zs',
      age: 18
    })

    // setup中定义函数
    // 修改名字
    const updateName = () => {
      console.log('updateName');
      obj.name = obj.name == 'zs' ? 'li' : 'zs'
    }

    // 注意：从响应式数据对象中解构出来的属性数据，不再是响应式数据，如果想转换成响应式数据，可以采用toRef函数
    // 利用对象解构出 年龄
    // let { age } = obj
    // console.log('age', age);
    // // 修改年龄  -- 不具备响应式，修改失败
    // const updateAge = () => {
    //   console.log('updateAge');
    //   age = 20
    // }

    // toRef 是函数，转换响应式对象中某个属性为单独响应式数据，并且值是关联的
    // 使用场景：有一个响应式对象数据，但是模板中只需要使用其中一项数据，并且要求是响应式的
    // toRef(obj, 'age') 得到 obj 这个响应式数据对象中的 age 属性值
    let age = toRef(obj, 'age')
    console.log('age', age);
    const updateAge = () => {
      console.log('updateAge');
      age = 20
    }

    // setup 中返回 数据和函数；（注意：无论返回数据还是函数，都必须以对象的形式返回）
    return { obj, updateName, updateAge }
  },

  // vue3 中最好不要用vue2 中的钩子函数，会报警告
  // beforeCreate () {
  //   console.log('beforeCreate', this);
  // }
}
</script>



<!--

vue2 写法 -- 选项api
<template>
  <div class="">
    跟组件
    </div>
  </template>

<script>
export default {
  // 组件名称
  name: 'App',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data () {
    return {

    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子请自行删除
  /**
  * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
  */
  created () { },
  /**
  * el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.el 也在文档内。
  */
  mounted () { },
  // 组件方法
  methods: {}
}
</script>

<style scoped lang="less">

</style>

-->