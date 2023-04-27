// 根组件

// vue3 写法 -- 组合api
<template>
  <div class="container">
    vue3 组合api写法
    <h1 @click="say()">{{msg}}</h1>
  </div>
</template>
<script>
export default {
  name: 'Setup',
  // 组合api的起点，组合api的代码基本上都写在这儿
  // 可以理解为：在beforeCreate钩子函数，组件实例创建前就会被执行
  // 函数中的this=>undefined
  // 模板中使用的数据和函数需要在setup中返回，必须返回一个对象
  setup () {
    console.log('setup', this);

    // setup中定义数据
    const msg = 'hi vue3'

    // setup中定义函数
    const say = () => {
      console.log('hi vue3!!!');
    }

    // setup 中返回 数据和函数；（注意：无论返回数据还是函数，都必须以对象的形式返回）
    return { msg, say }
  },

  // vue3 中最好不要用vue2 中的钩子函数，会报警告
  beforeCreate () {
    console.log('beforeCreate', this);
  }
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