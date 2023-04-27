8*8
// 根组件

// vue3 写法 -- 组合api
<template>
  <div class="container">
    vue3 组合api写法
    <h1>{{name}}</h1>
    <!-- 因为是 toRefs 返回的数据对象中的所有属性值，并且返回的 ...obj1，所以可以直接用name，免去使用点语法 -->
    <h1>{{age}}</h1>
    <button @click="updateName">修改名字</button>
    <button @click="updateAge">修改年龄</button>
  </div>
</template>
<script>
// 从vue中按需引入reactive
import { reactive, toRefs } from 'vue';
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

    // toRefs 是函数，转换响应式对象中所有属性为单独响应式数据，对象成为普通对象，并且值是关联的
    // 使用场景：剥离响应式对象，想使用响应式对象中的多个或者所有属性做为响应式数据，通常用于解构或展开reactive定义的对象是数据
    // toRef(obj, 'age') 得到 obj 这个响应式数据对象中的 age 属性值，此时得到的这个属性值是一个响应式的数据对象，值存储在 value 属性中
    // toRefs(obj) 得到 obj 这个响应式的数据对象中的所有属性值
    const obj1 = toRefs(obj)
    console.log('obj1', obj1);
    const updateAge = () => {
      console.log('updateAge');
      // 只能通过修改 age 的 value 值的修改数据
      obj1.age.value = 20
    }

    // setup 中返回 数据和函数；（注意：无论返回数据还是函数，都必须以对象的形式返回）
    // obj1 是通过 toRefs 生成的，所以其所有属性都是响应式数据，直接展开返回，单个属性的数据也是响应式的
    return { ...obj1, updateName, updateAge }
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