Vue3 内容整理

![createApp流程](.\vue3-image\createApp流程.png)

- 使用Proxy进行数据劫持
  - 在Vue2.x的时候，使用Object.defineProperty来劫持数据的getter和setter方法；这种方式一直存在一个缺陷就是当给对象添加或删除属性时无法劫持和监听，所以在Vue2.x的时候，不得不提供一些特殊的API，比如`$set` 或 `$delete`，事实上都是一些hack方法，也增加了开发者学习新的API的成本，而在Vue3.x开始，Vue使用Proxy来实现数据的劫持；
- 删除了一些不必要的API
  - 移除了实例上的`$on、$off、和 $once`
  - 移除了一些特性：filter、内联模板等；
- 编译方面的优化
  - 生成 Block Tree、Slot 编译优化、diff 算法优化。
- 有 Options API 到 Composition API ：
  - 在Vue2.x的时候，通过 Options API 来描述组件对象；
  - Options API 包括 data、props、methods、computed、生命周期等等这些选项；
  - 存在比较大的问题是多个逻辑可能是在不同的地方，比如 created 中会使用某一个 method 来修改data的数据，代码的内聚性非常差；
  - Composition API 可以将 相关联的代码 放在同一处 进行处理，而不需要在多个 Options 之间寻找；
- Hooks 函数增加代码的复用性：
  - 在 Vue2.x 的时候，通常通过 mixins 在多个组件之间共享逻辑，但 mixins 也是有一大堆的Options组成的，并且多个mixins会存在命名冲突的问题；
  - 在 Vue3.x 中，可以通过 Hook 函数，来将一部分独立的逻辑抽取出去，并且他们还可以做到是响应式的；
- 安装和使用 Vue 的方式
  - 方式一：在页面中通过 CDN 的方式来引入；
  - 方式二：下载 Vue 的 JavaScript 文件，并且自己手动引入；
  - 方式三：通过 npm 包管理工具安装使用它（webpack）；
  - 方式四：直接通过 Vue CLI 创建项目；
- CDN：内容分发网络（Content Delivery Network 或 Content Distribution Network，缩写：CDN）
  - 通过 相互连接的网络系统，利用最靠近每个用户的服务器；
  - 更快、更可靠地将音乐、图片、视频、应用程序以及其他文件发送给用户；
  - 来提供高性能、可扩展性及低成本的网络内容传递给用户；
- 常用的 CDN 服务器可以大致分为两种：
  - 自己的CDN服务器：需要购买自己的CDN服务器，阿里、腾讯、亚马逊、Google购买；
  - 开源的CDN服务器：unpkg、JSDelivr、cdnjs；
- Vue 的 CDN 引入：
  - `<script src="https://unpkg.com/vue@next"></script>`



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### data属性

- data属性是传入的一个函数，并且该函数需要返回一个对象；
- data中返回的对象会被 Vue 的响应式系统劫持，之后对该对象的修改或者访问都会在劫持中被处理；



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### methods属性

- methods属性是一个对象，我们会在这个对象中定义很多的方法：
  - 这些方法可以被绑定到 template 模板中；
  - 在该方法中，可以使用 this 关键字来直接访问到data 中返回的对象的属性；
- 注意：不应该使用箭头函数来定义 method 函数，理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向组件实例；



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### 数组更新检测

- Vue 将被侦听的数组的变更方法进行了包裹，所以他们变化将会触发视图更新（以下方法 改变原数组）：
  - push 、pop、shift、unshift、splice、sort、reverse；
- 替换数组方法，以下方法不会改变原数组，而是会生成新的数组：
  - filter、concat、slice；



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### v-on的使用：绑定事件监听

- 修饰符：
  - .stop - 调用 event.stopPropagation();
  - .prevent - 调用 event.preventDefault();
  - .capture - 添加事件侦听器时使用 capture 模式；
  - .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调；
  - .{keyAlias} - 仅当事件是从特定键触发时才触发回调；
  - .once - 只触发一次回调；
  - .left - 只当点击鼠标左键时触发；
  - .right - 只当点击鼠标右键时触发；
  - .middle - 只当点击鼠标中键时触发；
  - .passive - { passive: true } 模式添加侦听器；



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### v-model 的使用

- v-model 修改内容时，会将内容隐式转换成 字符串 类型，可以用 修饰符 .number 解决 数字 被 转换成 字符串的问题；
- v-model 修饰符
  - .number 防止绑定的数字类型被转换成字符串类型；
  - .lazy 监听 input 框的 change 事件，当输入框输入内容后，回车后才会触发 v-model 修改内容；
  - 默认情况下 监听 input 事件，实时触发 v-model 修改内容；
  - .trim 删除前后空格

![v-model](.\vue3-image\v-model.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### v-for 中 key 的作用（有 key 时的 diff 算法）

- 官方解释
  - key 属性主要用在 Vue 的虚拟DOM算法，在新旧 nodes 对比时辨识 VNodes ；
  - 如果不适用 key，vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法；
  - 而使用key时，它会基于key的变化重新排列元素顺序，并且会移除/销毁key不存在的元素；



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### 虚拟节点（VNode）

- VNode 可以理解为 HTML 元素创建出来的 VNode ；
- VNode全称是 Virtual Node，也是虚拟节点；
- 无论组件还是元素，最终在 Vue 中表现出来的都是一个个的 VNode；
- VNode 的本质是一个 JavaScript 的对象；是对 dom 元素的描述；
- template =》 VNode =》 真实 DOM（浏览器上）；

![](.\vue3-image\VNode.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  / ** 

### 虚拟DOM（VDOM）

- 如果不只有一个div，而是有一大堆的元素，就会形成一个 VNode Tree；

![虚拟DOM](.\vue3-image\虚拟DOM.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### diff 算法

- 通俗的理解：对比 旧的 VNodes 和 新的 VNodes 的过程就是 diff 算法；
  - 例如：利用v-for循环渲染一个数组中的元素后，在通过数组的splice方法在数组中间加入一个元素；
  - 过程：数组改变前，vue会先将v-for代码解析成 虚拟DOM树（多个 VNode），然后被v8引擎解析为真实DOM渲染到浏览器上；数组改变后，通过对比 新旧 VNodes（多个 VNode）的不同（ diff 算法），来最大程度的节省渲染性能渲染新DOM；
- 在 Vue 中，对于相同父元素的子元素节点并不会重新渲染整个列表；
- Vue 中会对于有 key 和没有 key 调用两个不同的方法：
  - 有 key ，就使用 patchKeyedChildren 方法；
  - 没有 key ，就是用 patchUnkeyedChildren 方法；![案例 f 来理解 diff 算法](.\vue3-image\案例 f 来理解 diff 算法.png)
- 有 key 时的 diff 算法步骤（5步）
  - 从头部开始遍历，对比新旧VNode，遇到相同的节点就继续，遇到不同的就跳出循环；
  - 从尾部开始遍历，遇到相同的节点就继续，遇到不同的就跳出循环；
  - 如果最后新节点更多，就添加新节点；
  - 如果旧节点更多，就移除旧节点；
  - 如果中间存在不知道如何排列的位置序列，就使用key建立索引  最大限度的使用旧节点；
- 没有 key 时 diff 算法（3步）
  - 比较新旧VNode的长度，选取较短的一个进行遍历，依次进行patch；
  - 如果最后新节点更多，就添加新节点；
  - 如果旧节点更多，就移除旧节点；



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### 过滤器

- vue3 不支持使用 过滤器了，因为filter本质上还是函数的调用，推荐两种方法：使用计算属性（或者methods方法）、或者使用全局的方法；
- 全局的方法可以挂载在 `app.config.globalProperties ` 下；



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### 计算属性 computed

- 计算属性的 getter 和 setter 方法；
- 计算属性的 getter 方法，就是普通的计算属性的使用；
- 计算属性的 setter 方法，在计算属性被改变时触发；例如，在methods 中改变计算属性的值就会触发该计算属性下的setter方法；



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### 侦听器 watch

- ```
  # 前提条件
  data(){
  	return {
  		wls:{
  			name: '111',
  			age: 18,
  		}
  	}
  }
  ```

- 监听属性本身变化

  ```
  watch: {
      wls: function(newValue, oldValue) {
        console.log(newValue, oldValue);
      },
  }
  ```

- 监听属性本身的变化，可以把方法放入 methods 中，这里直接函数名的字符串即可，如下:

  ```
  watch: {
     wls: 'wlsFunction',
  }
  methods:{
  	wlsFunction: function(newValue, oldValue) {
      	console.log(newValue, oldValue);
      },
  }
  ```

- 监听引用类型内部某一个属性值的变化

  ```
  watch: {
     'wls.name': function(newValue,oldValue) {
        console.log(newValue,oldValue)
      }
  }
  ```

- 监听引用类型内部属性值的变化

  ```
  watch: {
    wls: {
    handler :function(newValue, oldValue) {
          // 由于vue内部没有做引用类型的深拷贝，所以这里两个值都是改变之后的值；
          console.log(newValue, oldValue)
        },
        deep: true,
     }
  }
  ```

- 监听一个属性，可以传入多个回调函数

  ```
  watch: {
     wls: [
    // 在methods中定义，这里就引用
    'handler1',
    function handler2(val, oldVal) {
      console.log('handler2');
    },
    {
      handler: function handler3(val, oldVal) {
        console.log('handler3')
      },
      deep: true,
    }
  ]
  },
  methods:{
  	handler1() {
         console.log('handler1')
      }
  }
  ```

- 监听器放在 created 生命周期函数中定义 `this.$watch( ' 监听的属性 '，' 回调函数 '，' 属性配置 ' )`

  ```
  created() {
          // 监听器也可以这样定义
          // 参数一：监听的属性； 参数二：回调函数； 参数三：配置对象；
          // 该方法有一个返回值；如果用该返回值去调用该方法，会取消侦听；*****************
          // 注意：这里的回调函数可以用箭头函数，因为create是一个方法，有自己的作用域，作用域内的this指向组件实例
          const unWatch = this.$watch('wls', (newValue, oldValue) => {
            console.log(newValue, oldValue)
          },{
            deep: true,
            // immediate: true,
          })
          // 取消侦听器，上面的那个侦听器就不会再执行，如果配置了immediate属性，会执行一次；
          unWatch();
        },
  ```



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### 对象的浅拷贝

- **Object.assign( { },  info )**

- 注意：该方法只会**拷贝第一层内容**，**会另外创建一个引用地址**，并复制其**里面的内容**，如果是一般属性直接复制，如果是**引用类型，复制其引用地址**

  ```
  const info = {name:'why',friends:{age: 18}};
  const obj = Object.assign({}, info);  // obj = {name:'why',friends:{age: 18}}
  info.name = 'wls';
  info.friends.age = 20;
  console.log(obj.name);   // 'why'
  console.log(obj.friends.age);  // 20
  ```

- lodash 库 中 _.clone() 方法



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### 对象深拷贝

- 方法一

  - **JSON.parse(JSON.stringify( obj ))**；

  - 缺点：

    - （1）如果对象里有函数,函数无法被拷贝下来

      （2）无法拷贝copyObj对象原型链上的属性和方法

      （3）当数据的层次很深，会栈溢出

- 方法二

  - lodash 库 中  _.cloneDeep()  方法；`_. 表示Lodash中的全局对象`

- 方法三

  - ```
    function isObject(obj) {
            return typeof obj === 'object' && obj !== null
        }
        function deepCopy( source ) {
        if (!isObject(source)) return source; //如果不是对象的话直接返回
            let target = Array.isArray( source ) ? [] : {} //数组兼容
            for ( var k in source ) {
              if (source.hasOwnProperty(k)) {
                if ( typeof source[ k ] === 'object' ) {
                      target[ k ] = deepCopy( source[ k ] )
                  } else {
                      target[ k ] = source[ k ]
                  }
              }
            }
            return target
        }
    ```

  - 缺点：

    - （1）无法保持引用

      （2）当数据的层次很深，会栈溢出

- 方法四

  - ```
    function cloneLoop(x) {
        const root = {};
    
        // 栈
        const loopList = [
            {
                parent: root,
                key: undefined,
                data: x,
            }
        ];
    
        while(loopList.length) {
            // 深度优先
            const node = loopList.pop();
            const parent = node.parent;
            const key = node.key;
            const data = node.data;
    
            // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
            let res = parent;
            if (typeof key !== 'undefined') {
                res = parent[key] = {};
            }
    
            for(let k in data) {
                if (data.hasOwnProperty(k)) {
                    if (typeof data[k] === 'object') {
                        // 下一次循环
                        loopList.push({
                            parent: res,
                            key: k,
                            data: data[k],
                        });
                    } else {
                        res[k] = data[k];
                    }
                }
            }
        }
    
        return root;
    }
    
    ```

  - 优点

    - （1）不会栈溢出

      （2）支持很多层级的数据



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### 引用类型

Object、Array、Function、Date



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### webpack

##### webpack 简介 *****

- 注意：**每个项目最好都用局部的webpack来打包，不然会引发冲突**

- webpack的全局安装

  ```
  # 全局安装
  npm install webpack webpack-cli -g
  
  # 局部安装
  npm install webpack webpack-cli -D
  ```

  ![](.\vue3-image\webpack.png)

- webpack 对文件的处理

  - Javascript 的打包
    - 将 ES6 转换成 ES5 的语法；
    - TypeScript 的处理，将其转换成 JavaScript ;
  - css 的处理
    - css 文件模块的加载、提取；
    - Less、Sass 等预处理器的处理；
  - 资源文件 img、font
  - HTML 资源的处理
  - vue项目的单页面文件 .vue 文件

- webpack是一个静态的模块化打包工具，为现代的JavaScript应用程序；

  - 打包 bundler ：webpack 可以帮助我们进行打包项目，是一个打包工具；
  - 静态的 static ：最终将代码打包成静态资源，部署到静态服务器；
  - 模块化 module ：支持各种模块化开发，ES Module、CommonJS、AMD等；
  - 现代的 modern ：解决前端开发面临的问题；



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### webpack 全局使用

- 全局安装 webpack 和 webpack-cli 两个包

  ```
  npm install webpack webpack-cli -g
  ```

- 在项目 终端 窗口 运行 ` webpack ` 命令，先 cd 到当前目录，再输入命令

- 然后就会打包 到 dist 文件内；

- 打包的入口和出口
  - 运行 webpack 时，webpack 会查找当前目录下的 src/index.js 作为入口；如果当前项目没有 src/index.js 文件，且没有通过配置来指定入口和出口，就会报错；

- 配置指定入口和出口

  ```
  # 终端窗口 输入命令
  npx webpack --entry ./src/main.js --output-path ./build
  ```



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### webpack 局部使用（项目内单独安装使用，比较常用） *****

- 第一步，创建 package.json 文件，用于管理项目的信息、库依赖等；

  ```
  npm init -y
  ```

- 第二步，安装局部的 webpack

  ```
  # 安装在开发依赖
  npm install webpack webpack-cli -D
  ```

- 第三步，使用局部的webpack

  - 终端窗口中 执行 ` ./node_modules/.bin/webpack ` 命令，使用本项目安装的webpack打包；

  - 终端窗口中 执行 npx webpack 命令，使用本项目安装的webpack打包；

  - 在 package.json 中创建 script 脚本，执行脚本打包即可

  - ```
    "script":{"build": "webpack"}
    
    npm run build
    ```

  - 注意：如果在 终端窗口中 直接执行 `webpack ` 命令，默认使用全局安装的webpack打包，webpack 版本可能不一致，打包会出错；

- 安装过程中会生成 package-lock.json 文件，该文件主要是为了记住 安装包的版本号，便于下次安装时在缓存中找到；



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### webpack配置参数 *****

- mode

  - 设置模式，有两种模式：development开发模式、production生产模式；

  <img src=".\vue3-image\mode配置.png"  />

- devtool

  - 设置为 `'source-map'`，可以建立js映射文件，方便调试代码和错误；

- entry

  - 打包入口文件

- output

  - 打包出口文件

- module

  - 匹配模块，设置对应loader进行类型转换

- plugins

  - 插件，贯穿整个webpack的生命周期



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### webpack 的 loader *****

- loader 用于特定的模块类型进行转换；

- webpack 默认支持解析 ` .js ` 文件

- **css-loader 和 style-loader 的使用**

  - 注意：css-loader 只是负责将 .css 文件进行解析，并不会将解析之后的css插入到页面中；需要另外一个loader （style-loader）完成插入style的操作；因为 loader 的执行顺序是从右向左（或者说从下到上，从后向前的），所以需要将 style-loder 写到 css-loader 的前面；

  - loader 可以用于对模块的源代码进行转换；

  - 可以将 css 文件看成一个模块，通过 import 来加载这个模块；

  - 在加载这个模块时，webpack 其实不知道如何对其进行加载，所以必须制定一个 loader 来完成这个功能；

  - css-loader 的使用过程

    - 安装

      ```
      npm install css-loader -D
      ```

    - 使用 css-loader 加载 css 文件（三种方式）

      ```
      # 内联方式(import 导入 css 文件 时，在文件路径前加上 css-loader!，其中 ！ 用于分隔，必须要加上)
      import 'css-loader!../css/style.css';
      
      # CLI 方式（webpack5 中不再使用）
      
      # 配置方式
      在 webpack.config.js 文件中写明配置信息，module.rules中允许我们配置多个 loader （完成多种文件的加载）；
      module.rules 的配置如下：
      rules属性对应的值是一个数组：[rule];
      数组中存放的是一个个的rule，rule 是一个对象，对象中有多个属性：
      test属性：用于对 resource （资源）进行匹配的，通常会设置成正则表达式；
      use属性：对应的值是一个数组:[UseEntry]
      UseEntry 是一个对象，可以通过对象的属性来设置一些其他属性；
      loader：必须有一个loader 属性，对应的值是一个字符串；
      options：可选的属性，值是一个字符串或者对象，值会被传入到loader中；
      query：目前已经使用options来替代；
      传递字符串（如：use：['style-loader']）是loader属性的简写方式（如：use:[{loader:'style-loader'}]）;
      loader 属性：rule.use:[{loader}]的简写；
      ```

      ![css-loader内联方式](.\vue3-image\css-loader内联方式.png)![loader的配置方式](.\vue3-image\loader的配置方式.png)

- **postcss-loader**
  
  - 配合其下的配置，可以给 css 样式加浏览器前缀，适配不同的浏览器
  
- **file-loader** 
  
  - 处理 jpg、png、svg 等格式的图片，处理 import、require()、url() 等方式引入的一个文件资源，并且会将它放到输出的文件夹中；
  - 所有的图片都会被单独打包，所以如果浏览器想加载该文件，就需要向服务器发送请求；
  
- **url-loader**

  - url-loader 和 file-loader 的作用是相似的，但 url-loader 可以将较小的文件，转成 base64 的URL，可以直接被浏览器解析，而且被打包到其他文件内，需要加载时不需要向服务器请求；
  - ![](.\vue3-image\url-loader 的使用.png)

- **babel-loader**

  - 处理 js 文件内的 ES6及以上的代码转换成 ES5 代码；
  - 安装 ` @babel/core 、babel-loader `
  - ![](.\vue3-image\babel-loader 的使用.png)

- vue-loader

  - 处理 vue2 环境下的 .vue 文件

- vue-loader@next

  - 处理 vue3 环境下的 .vue 文件

  - 使用步骤：

    - 安装

      ```
      # 安装 vue 第三方文件，为了引用 createApp 等构造函数
      npm install vue;
      
      # 安装 vue-loader@next -D 为了解析 vue3 环境下的 .vue 文件
      npm install vue-loader@next -D;
      
      #安装 @vue/compiler-sfc -D 这个插件 为了配置在 vue-loader 这个loader中，解析 vue3 环境下的 .vue 文件
      npm install @vue/compiler-sfc -D
      ```

    - 创建一个 单文件组件 （.vue 文件）

    - 在 main.js 文件中使用

      ```
      import { createApp } from 'vue/dist/vue.esm-bundler.js'
      import App from './vue/app.vue'
      const app = createApp(App);
      app.mount('#app');
      ```

    - 在 webpack.js 文件中配置

      ```
      // 引入 vue-loader 包中的插件，用于解析 .vue 文件
      const { VueLoaderPlugin } = require('vue-loader/dist/index');
      // loader 中书写
      {
          test: /\.vue$/,
          loader: 'vue-loader',
      }
      // 插件中书写
      // 用于解析 .vue 文件
      new VueLoaderPlugin(),
      ```

    - 

- 

- 



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### webpack 的 Plugin *****

- plugin 可以用于执行更加广泛的任务，比如打包优化、资源管理、环境变量注入等；

- loader  与  plugin  的区别
  - loader 先安装，然后直接写在 user 属性后面 或者 写在 user 属性 后面的 loader 后面；
  - plugin 先安装，再引入，然后才能使用（一般情况下使用的都是一个class类）；
  - loader 只是在加载模块的时候，通过test去匹配这个模块，然后去使用不同的loader去处理这个模块；
  - plugin 可以在webpack中做很多事情，它贯穿于webpack整个的生命周期的；

![](.\vue3-image\webpack2.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 插件一： clean-webpack-plugin，重新打包时，自动删除dist（打包后的）文件夹；

- ![](.\vue3-image\插件 clean-webpack-plugin.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 插件二：html-webpack-plugin，在打包文件夹内自动根据模板生成 index.html 文件；

- 真实项目中一般不适用该包提供的模板，一般会自定义一个 index.html 模板；例如，vue-cli3 打包时自定义指定一个 index.html 模板；

  ![vue-cli打包的模板](.\vue3-image\vue-cli打包的模板.png)

- ![插件二：html-webpack-plugin](.\vue3-image\插件二：html-webpack-plugin.png)

- ![插件二：html-webpack-plugin2](.\vue3-image\插件二：html-webpack-plugin2.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 插件三：DefinePlugin 插件，不需要安装，webpack内置，需要引入使用

- ![插件三 DefinePlugin 1](.\vue3-image\插件三 DefinePlugin 1.png)
- ![插件三 DefinePlugin 2](.\vue3-image\插件三 DefinePlugin 2.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 插件四：copy-webpack-plugin 用于文件的拷贝

- 如果报错：可能因为public文件夹下所有的文件都被放在ignore中忽视了，此时不能用 **/ ；

- ![插件四：CopyWebpackPlugin](.\vue3-image\插件四：CopyWebpackPlugin.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### webpack 常用工具 *****

###### PostCSS （可单独使用，不一定非在 webpack 下使用）

- PostCSS 是一个通过 JavaScript 来转换样式的工具，这个工具可以帮助我们进行一些css的转换和适配，比如自动添加浏览器前缀、css样式的重置（**给 css 样式加浏览器前缀**）；

- 使用 PostCSS

  - 第一步：查找 PostCSS 在构建工具中的扩展，比如 webpack 中的 postcss-loader ；

  - 第二步：选择可以添加你需要的PostCSS相关的插件；

  - 安装 postcss、postcss-cli

  - 因为我们需要添加前缀，所以安装 autoprefixer 或者 postcss-preset-env

  - 直接使用 postcss 工具，并且制定使用 autoprefixer 

  - 插件 autoprefixer 或者 postcss-preset-env

    - 都是 postcss 插件，可以帮助我们将一些现代的css特性转成大多数浏览器认识的css；
    - postcss-preset-env 插件 会根据目标浏览器或者运行时环境添加所需的 polyfill ；也会自动帮我们添加 autoprefixer ，相当于内置了 autoprefixer ；

    ![](.\vue3-image\postcss 配置1.png)
  
    ![](.\vue3-image\postcss 配置2.png)
  
  - 可以配置的其他插件：
  
    - pxtorem 将 px 转换 成 rem；
    
  ```
    # npx postcss --use (自动给浏览器添加前缀的插件) -o (输出到哪里) (输入的过程)
    npx postcss --use autoprefixer -o end.css ./src/css/style.css
  ```
  
  ![插件工具autoprefixer ](.\vue3-image\插件工具autoprefixer .png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### Babel （可单独使用，并不一定在webpack下使用）

- ![](.\vue3-image\babel的使用1.png)

- Babel 的命令行使用（单独使用）
  - ![](.\vue3-image\Babel 的命令行使用1.png)
  - ![](.\vue3-image\Babel 的命令行使用2.png)
  
- Babel 的预设 preset （可用于替代 babel 工具下的插件）
  - ![Babel 的预设 preset](.\vue3-image\Babel 的预设 preset.png)

- Babel 的配置内容也可以抽离到单独文件内
  
  ![](.\vue3-image\Babel的配置抽离.png)
  
  ![](.\vue3-image\Babel的配置抽离2.png)
  
  ![](.\vue3-image\Babel的配置抽离3.png)
  
- Babel 的底层逻辑
  
  - ![](.\vue3-image\Babel 的底层逻辑.png)
  
  - Babel编译器执行原理
  
    ![](.\vue3-image\Babel编译器执行原理.png)
  
  - 
  
- 



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### webpack打包后的文件的命名规则 *****

- 在 webpack.js 文件内对 loader 增加配置 （例如：file-loader 和 url-loader ）

![](.\vue3-image\打包资源文件命名1.png)

​	![](.\vue3-image\打包资源文件命名2.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### webpack5 新特性 *****

- 可以用 资源模块类型（asset module type） 代替 url-loader 、file-loader、raw-loader 这三个loader

![](.\vue3-image\资源模块类型（asset）.png)

![](.\vue3-image\资源模块类型（asset）2.png)

![](.\vue3-image\资源模块类型（asset）3.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### webpack 中对于 vue 代码的处理 （引入vue包，在 js 文件中写vue代码） *****

- 安装 vue 包

  - ```
    npm install vue
    ```

![](.\vue3-image\webpack 中对于 vue 代码的处理（1）.png)

![](.\vue3-image\webpack 中对于 vue 代码的处理（2）.png)

![](.\vue3-image\webpack 中对于 vue 代码的处理（3）.png)

![](.\vue3-image\webpack 中对于 vue 代码的处理（4）.png)

![](.\vue3-image\webpack 中对于 vue 代码的处理（5）.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### webpack 搭建本地服务器（为了实现自动编译打包）（webpack下的 devServer 属性配置对象）

![](.\vue3-image\webpack 搭建本地服务器（1）.png)

- webpack  watch模式，重新编译

  ![](.\vue3-image\webpack 搭建本地服务器（2）.png)

- webpack-dev-server  重新编译

  ![](.\vue3-image\webpack 搭建本地服务器（3）.png)
  
  ![](.\vue3-image\webpack 搭建本地服务器（4）.png)
  
  然后运行  ` npm run serve ` 来进行打包；
  
  - **模块热替换（HMR）**（开启后，修改保存某个模块中的内容，不会刷新整个浏览器）
  
    ![](.\vue3-image\模块热替换（HMR）（1）.png)
  
    - 开启 HMR 
  
    ![](.\vue3-image\模块热替换（HMR）（2）.png)
  
    - 但是在真实的开发中，如果是 vue 、react 项目中修改了组件，热更新不用再去额外配置
  
    ![](.\vue3-image\模块热替换（HMR）（3）.png)
  
    - HMR 热更新原理
  
      ![](.\vue3-image\HMR 热更新原理（1）.png)
  
      ![](.\vue3-image\HMR 热更新原理（2）.png)
  
  - host 设置主机地址
  
    ![](.\vue3-image\host 设置主机地址.png)
  
  - 设置端口（port）、自动打开浏览器（open）、压缩（compress）
  
    ![](.\vue3-image\设置端口（port）、自动打开浏览器（open）、压缩（compress）.png)
  
  - proxy 设置本地服务代理
  
    ![](.\vue3-image\proxy 设置本地服务代理（1）.png)
  
    ![](.\vue3-image\proxy 设置本地服务代理（2）.png)
  
  - 



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### webpack 的 resolve 配置（用于设置模块如何解析）

- modules 

  ![](.\vue3-image\webpack 的 resolve 配置（1）.png)

- extensions  &&  mainFiles

  ![](.\vue3-image\webpack 的 resolve 配置（2）.png)

- alias 给路径起别名

  ![webpack 的 resolve 配置（3）](.\vue3-image\webpack 的 resolve 配置（3）.png)

  ![](.\vue3-image\webpack 的 resolve 配置（4）.png)

- 



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### webpack 文件 按照 环境 分离书写

- 将webpack的配置文件 按照 环境 拆分为三个文件（开发、生产、公共），再通过 webpack 的 包 将文件合并；

![](.\vue3-image\webpack 文件 按照 环境 分离书写（1）.png)

- 在 package.json 文件中修改配置

  ![](.\vue3-image\webpack 文件 按照 环境 分离书写（2）.png)

- 安装 webpack-merge -D 用于合并 webpack 在不同文件内书写的配置对象

  ```
  npm install webpack-merge -D 
  ```

- 先导入 合并 需要用的函数

  ```
  const { merge } = require('webpack-merge')
  ```

- 导入 webpack 的公共配置文件

  ```
  const commonConfig = require('./webpack.common.config')
  ```

- 合并 本文件内的 webpack 配置 与 公共配置文件 进行合并，然后导出

  ```
  module.exports = merge(commonConfig, { *** })
  ```

![](.\vue3-image\webpack 文件 按照 环境 分离书写（3）.png)

- **修改文件内的相对路径**

  - entry 入口的路径不需要改
  - output 出口路径要修改
  - resolve 中的路径要修改
  - plugins 中的路径要修改，其中 BASE_URL 的路径不需要修改， from 后的路径不需要修改

- 

  

**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### webpack 分包 ***  可优化首页加载速度

- webpack在打包项目的时候，会将我们自己写的 js 文件全部打包到 app.js 文件内，但是随着项目的变大，app.js 会越来越大，打开项目时请求 app.js 这个静态资源也会越来越慢，然后就会影响用户打开项目时首页的加载速度，为了优化首页加载速度，可以将部分在首页用不到的 js 文件分开打包到独立的文件内；如下操作即可实现

  ```
  # 正常导入一个 js 文件内的方法 --- 打包到 app.js 文件内
  import { sum } from './***'
  
  # 分包 -- 打包到独立的文件内
  # 通过 import 函数导入的模块，后续 webpack 对其进行打包的时候就会进行分包操作，import() 函数导入 js 文件后会返回一个promise对象，res 里面就包含该文件内的所有方法
  import('./***').then((res) => {
  	console.log(res.sum(20, 30))
  })
  ```

  ![webpack 的代码分包](.\vue3-image\webpack 的代码分包.png)



##### require.context() 加载文件夹内的文件

- webpack 中的方法，用于加载文件夹内的文件，不用单独引入，只要安装了webpack，全局都可以使用；
- 使用方法及参数
  - 通常结合 require() 可以拿到这些文件内的代码；

```
# 参数一：文件夹路径；
# 参数二：是否递归，布尔值；
# 参数三：正则表达式，匹配哪些文件
require.context(参数一, 参数二， 参数三);

# 比如加载动态路由时，加载一个文件夹内所有路由文件中的路由对象代码；
const allRouters: RouteRecordRaw[] = [];
const routeFiles = require.context('../router/main', true, /.ts/);
routeFiles.keys().forEach(key => {
	// key 拿到的是每个文件相对于 ../router/main 的相对路径；
	// require(文件路径)： 拿到该文件内的代码；
	const route = require('../router/main' + key.split('.')[1]);
	allRouters.push(route.default);
})
consolr.log(allRouters);
```



- 



##### historyApiFallback

- historyApiFallback 这个属性主要是解决SPA页面在路由跳转之后，如果用户手动进行刷新页面，页面会返回404的错误；用 vue-cli 脚手架创建的项目，这个webpack的属性已经配置好了，不需要再额外配置，这里只是做了一个介绍；

- 原因：刷新后，浏览器会根据当前的url向服务器请求资源，如果没有，就返回404了

- 解决方案：将 webpack 的historyApiFallback属性设置为 true，如果服务器没有该资源，就会默认返回 index.html

  ```
  # vue.config.js 文件内
  module.exports = {
    // 配置webpack属性配置
    configureWebpack: {
      devServer: {
        // historyApiFallback 这个属性主要是解决SPA页面在路由跳转之后，如果用户手动进行刷新页面，页面会返回404的错误；
        // 原因：刷新后，浏览器会根据当前的url向服务器请求资源，如果没有，就返回404了
        // 解决方案：将 webpack 的historyApiFallback属性设置为 true，如果服务器没有该资源，就会默认返回 index.html
        historyApiFallback: true
        // 当然也可以是个对象，配置其他属性
        // historyApiFallback: {
        //   disableDotRule: true,
        //   htmlAcceptHeaders: [
        //     'text/html',
        //     'application/xhtml+xml'
        //   ],
        //   // 重写，如果请求不到资源，配置跳转的url
        //   rewrites: genHistoryApiFallbackRewrites(baseUrl, options.pages)
      }
    }
  }
  ```

![historyApiFallback](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\historyApiFallback.png)



### vscode 好用插件

- Remote Explorer  连接远程服务器
- Bookmarks  读源码时，可以给源码打标记
- Project Manager  保存文件以及打开文件方便

![vscode插件1](.\vue3-image\vscode插件1.png)

- Vetur 和 Volar 对 vue 单文件组件（SFC）的支持

  ![](.\vue3-image\Vetur 和 Volar.png)

##### 插件推荐

###### Vue 3 Snippets 和 Vue VSCode Snippets  自动生成代码片段

```
vbase-css 自动生成代码片段 template框架
```



- 



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### 路由

##### historyApiFallback 帮助我们解决 404 问题的一个属性配置（后端配置，例如 express搭建的web服务器）

![historyApiFallback 帮助我们解决 404 问题的一个属性配置](.\vue3-image\historyApiFallback 帮助我们解决 404 问题的一个属性配置.png)

##### 前端的两种路由

###### URL 的 hash

![URL 的 hash](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\URL 的 hash.png)

###### HTML5  的 history

![](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\HTML5  的 history.png)

##### 路由的使用

- 路由的使用步骤

![路由的使用步骤](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\路由的使用步骤.png)

##### 动态路由匹配

- 可以传多个动态属性

```
# router文件内
const route = [
	{
        // 动态路由匹配（优点：刷新页面参数不丢失）
        // path: '/user/:userName',
        path: '/user/:userName/:id', // 传多个动态属性
        component: () => import('../views/UserView.vue')
     },
]

# vue 文件内
<router-link to="/user/wls">user动态路由</router-link>
<router-link to="/user/wls/2">user动态路由</router-link>
```



##### 嵌套路由

```
# router文件内
const route = [
	{
    path: '/home',
    name: 'home', // 路由独一无二的名称
    component: HomeView,
    // 嵌套路由
    children: [
      {
        path: '',
        redirect: '/home/message'
      },
      {
        path: 'message',
        component: () => import('../views/MessageCom.vue')
      }
    ]
  }
]

# vue 文件内
<!-- 嵌套路由 -->
<router-link to="/home/message">message</router-link>
<router-link to="/home/goods">goods</router-link>

<router-view></router-view>
```



##### 声明式导航

- ```
  <router-link to="/home">home</router-link>
  ```

- 

##### 编程式导航

```
# vue 文件内
<template>
  <div>
    <!-- 编程式导航 -->
    <button @click="jumpToAbout">跳转</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  // vue2
  methods: {
    // jumpToAbout () {
    //   this.$router.push('/about')
    //   // this.$router.replace('/about')
    //   // this.$router.go(-1)
    //   // this.$router.forward()
    //   // this.$router.back()
    // }
  },

  // vue3
  setup () {
    const router = useRouter()

    const jumpToAbout = () => {
      // router.push('/about')
      router.push({
        path: '/about',
        query: {
          name: 'wls',
          age: 18
        }
      })
    }

    return {
      jumpToAbout
    }
  }
}
</script>
```



##### router-link 属性

- Vue-Router4.x 中的 router-link 做了很多修改

   1、可以用插槽

   2、增加的删除的属性

​    2.1、to: 跳转页面，是一个字符串或者一个对象；

​    2.2、replace：相当于 history 模式下的 replaceState，设置该属性后，当点击router-link时会调用 router.replace(), 默认调用 router.push();两者的区别在于是否有历史记录，是否可以回退页面；

​    2.3、active-class：设置当前活跃的class类名，默认是 router-link-active；

​    2.4、exact-active-class：链接精准激活时，用于渲染<a>标签的class，默认是 router-link-exact-active；

​    2.5、删除tag属性，默认渲染成 <a> 标签；

![router-link 属性](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\router-link 属性.png)

- router-link 的 v-slot

  - 利用作用域插槽，可以拿到 router-link 组件内部传来的内容，通常用的内容如下：
    - href：解析后的URL
    - route：解析后的规范化的 route 对象
    - navigate：触发导航的函数，直接在元素上 ` @click=navigate ` 即可实现编程式的路由跳转
    - isActive：是否匹配状态（当前路由与当前URL是否匹配或者精确匹配），布尔值；
    - isExactActive：是否精确匹配，布尔值；
    - custom：不加该属性时，插槽内部自定义的元素会被渲染在<a> 元素内部，加上后，<a>元素消失；

  ![router-link 的 v-slot](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\router-link 的 v-slot.png)

- 



##### router-view 的属性

- router-view 中可以使用作用域插槽 v-slot ，主要用在 **动态组件（component）、 给组件加 缓存（keep-alive）以及 给组件加 动画效果（transition）**，拿到 router-view 组件内部传来的内容，通常用到的是：

  - Component：拿到当前占位的组件，要渲染的组件；
  - route：解析出的标准化路由对象；

  ```
  # vue 文件内
  <template>
  	<router-view v-slot="props">
  		# 动画组件	
  		<transition name="wls">
  			<keep-alive>
  				<component :is="props.Component" />
  			</keep-alive>
  		</transition>
  	</router-view>
  </template>
  
  <style>
  /* 动画效果样式 */
  .wls-enter-from,
  .wls-leave-to {
    opacity: 0;
  }
  .wls-enter-to,
  .wls-leave-from {
    opacity: 1;
  }
  .wls-enter-active,
  .wls-leave-active {
    transition: opacity 1s ease;
  }
  </style>
  ```

##### 动态添加路由

```
# router 文件内
// 动态添加主路由
const categoryRoute = {
  path: '/category',
  component: () => import('../views/CategoryView.vue')
}
router.addRoute(categoryRoute)

// 动态添加子路由（添加到name为home的路由下）
const homeMomentRoute = {
  path: 'moment',
  component: () => import('../views/HomeMoment.vue')
}
router.addRoute('home', homeMomentRoute)
```

![动态添加路由](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\动态添加路由.png)

##### 动态删除路由

- 删除路由有以下三种方式：
  - 方式一：添加一个 name 属性值相同的路由，会覆盖掉前面的路由，name属性是唯一的；
  
  - 方式二：通过 removeRoute 方法，传入路由名称；
  
  - 方式三：通过 addRoute 方法的返回值回调；
  
    ![动态删除路由](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\动态删除路由.png)



##### 路由的其他方法补充

- router.hanRoute() ：检测路由是否存在；
- router.getRoutes() ：获取一个包含所有路由记录的数组；

##### 路由导航守卫

- 前置守卫 beforeEach

  - vue-router4.x 版本的前置守卫有三个参数 to、from、next，但是next官方不推荐使用，因为可能会出现路由多次调用的问题，所以最好**用返回值的方式来控制是否跳转或者跳转哪里**；
    - to：即将进入的路由route对象；
    - from：即将离开的路由route对象；
  - 返回值控制跳转哪里或者是否跳转
    - false：取消当前导航；
    - 不返回或者返回undefined：进行默认导航；
    - 返回一个路由地址：
      - 返回 string类型的路径：'/home'；
      - 返回一个路由对象，对象包含path、query、params等信息；

  ![前置守卫 beforeEach](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\前置守卫 beforeEach.png)

##### 路由导航守卫完整解析流程

![路由导航守卫完整解析流程](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\路由导航守卫完整解析流程.png)

### vuex

##### vuex的状态管理

![vuex的状态管理](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\vuex的状态管理.png)

##### mutations中为什么不能执行异步操作？

- 当我们使用devtools时，devtools可以帮助我们捕获mutations的快照，但如果是异步操作，那么devtools将不能很好的追踪这个操作什么时候被完成，会导致devtools记录的数据没有与页面显示的数据保持一致。

##### vuex 用法

###### state 的用法

- 直接使用

  - 注意：在vue3的setup中使用的时候需要先获取 vuex 中提供的 ` useStore ` 钩子函数，` useStore() 可以得到整个 store 对象 `
  - vue3 中的 computed 返回值是一个 ref 对象；

  ```
  # vue2
  this.$store.state.userName
  
  # vue3
  import { useStore } from 'vuex';
  setup(){
  	const store = useStore();
  	const counter1 = computed(() => store.state.counter);
  	return { counter1 }
  }
  ```

  

- **辅助函数** ****  **-----------------------------------------------------------------------------------------------**

  - **mapState 方法返回值是一个对象，该对象的每一个属性值是一个函数**，因此可以直接写成computed的属性值，或者展开运算符；
  - **mapState 本质上还是使用  ` this.$store.state.name `  获取 vuex 中的数据；**

  ```
  # vue2
  import { mapState } from 'vuex'
  # 数组
  ...mapState(['userName','sex'])
  # 对象
  ...mapState({
  	userName1: state => state.userName,
  })
  # mapState方法返回一个对象，可以直接作为computed的属性值
  computed: mapState(['111','222'])
  
  # vue3
  import { mapState, useStore } from 'vuex';
  setup() {
  	// mapState 返回值是一个对象，该对象的每一个属性值是一个函数，因此
  	// storeStateFn = {name:function(){}, sex: function(){}, }
  	const storeStateFn = mapState(['userName','sex']);
  	const storeState = {};
  	Object.keys(storeStateFn).forEach(fnKey => {
  		// 拿到没有属性值（函数）
  		const fn = storeStateFn[fnKey];
  		// vue3 中 computed 的返回值是一个 ref 对象
  		// mapState 本质上还是使用  this.$store.state.name  获取 vuex 中的数据，因此，这里使用 bind 给 $store 重新指定 this 的指向，不然会报错；************************************************************
  		storeState[fnKey] = computed(fn).bind({$store, useStore});
  	})
  	return { ...storeState }
  }
  
  ```

  - 在setup中使用mapState，封装

  ![在setup中使用mapState](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\在setup中使用mapState.png)

###### getters 的用法

- 直接使用

  ```
  this.$store.getters.fullName;
  ```

- 辅助函数

  ```
  # vue2
  import { mapGetters } from 'vuex';
  computed:{
  	# 数组
  	...mapGetters(['fullName','counter'])
  	# 对象
  	...mapGetters({
  		fullName1: 'fullName',
  	})
  }
  
  # vue3 参考state用法
  ```


###### mutations 的用法  (state)

- 直接使用

  ```
  this.$store.commit('aaa', 50);
  ```

- 辅助函数

  ```
  # vue2
  import { mapMutations } from 'vuex';
  methods:{
  	...mapMutations(['aaa','bbb']),
  	...mapMutations({
  		aa: 'aaa',
  		bb: 'bbb'
  	})
  }
  
  # vue3
  setup() {
  	const mutations = mapMutations(['aaa','bbb']);
  	return {
  		...mutations
  	}
  }
  ```

###### actions 的用法  (context) 

- **参数 context 是一个和 store 实例有相同方法和属性的 context 对象，可以通过 context.state 和 context.getters 来获取 state 和 getters  *****

- 直接使用

  ```
  this.$store.dispatch('aaa',50);
  ```

- 辅助函数

  ```
  # vue2
  import { mapActions } from 'vuex';
  methods:{
  	...mapActions(['aaa','bbb']),
  	...mapActions({
  		aa: 'aaa',
  		bb: 'bbb'
  	})
  }
  
  # vue3
  setup() {
  	const actions = mapActions(['aaa','bbb']);
  	return {
  		...actions
  	}
  }
  ```




##### module 命名空间

- namespaced

- 加上命名空间后的参数变化***

```
# getters的参数由2个变成4个
getters:{
	countDouble(state,getters,rootState,rootGetters){
		return state.count * 2
	}
}

# actions 的参数还是一个，但是属性由4个变成6个
actions:{
	// context 的解构
	changeCount({commit,diapatch,state,rootState,getters,rootGetters}){
		commit('aaa', '123')
		// 对跟store中的mutations做commit操作 ***************
      	commit('rootAAA', '123', { root: true })
	}
}
```

- **加上命名空间后的 state 、getters 、mutations 、 actions 的用法*****

```
# vue2
# 没有 module 子模块
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
	computed:{
		...mapState(['aaa']),
		...mapGetters(['bbb'])
	},
	methods:{
		...mapMutations(['ccc']),
		...mapActions(['ddd'])
	}
}

# 使用子模块home中的方法
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
## 方法一：
export default {
	computed:{
		...mapState({
			homeAAA: state => state.home.aaa
		}),
		...mapGetters({
			homeBBB: 'home/bbb'
		})
	},
	methods:{
		...mapMutations(['home/ccc']),
		...mapActions({
			homeCCC:'home/ddd'
		})
	}
}

## 方法二：
export default {
	computed:{
		...mapState('home',['aaa']),
		...mapGetters('home',['bbb'])
	},
	methods:{
		...mapMutations('home',['ccc']),
		...mapActions('home',['ddd'])
	}
}

## 方法三：
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('home')
export default {
	computed:{
		...mapState(['aaa']),
		...mapGetters(['bbb'])
	},
	methods:{
		...mapMutations(['ccc']),
		...mapActions(['ddd'])
	}
}
# 以上是对 vue2 中 vuex 的使用
```

- 对于 vue3 中使用 vuex ，如果使用 state 和 getters 需要封装一个方法比较简单，如果使用 mutations 和 actions 直接使用辅助函数然后解构再 return 即可

![对于 vue3 中使用 vuex（1）](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\对于 vue3 中使用 vuex（1）.png)

![对于 vue3 中使用 vuex（2）](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\对于 vue3 中使用 vuex（2）.png)

### vue3 项目创建

##### vue-cli 的安装和使用

- 全局安装

  ```
  npm install @vue/cli -g
  # 局部安装
  npm install @vue/cli -D
  ```

- 升级

  ```
  npm update @vue/cli -g
  ```

- 查看vue-cli的版本

  ```
  vue --version
  ```

- 通过脚手架创建项目

  ```
  vue create 项目的名称
  ```

##### vue3 通过脚手架创建项目的过程

![](.\vue3-image\vue3 通过脚手架创建项目的过程.png)

##### vue3 项目的目录结构

![](.\vue3-image\vue3 项目的目录结构.png)

![](.\vue3-image\vue3 项目的目录结构（2）.png)

##### 终端中输入 npm run serve 命令时，Vue CLI 的运行原理

![](.\vue3-image\终端中输入 npm run serve 命令时，Vue CLI 的运行原理.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### 打包工具 --- Vite

##### 打包工具有 webpack、rollup、parcel、gulp、vite等；

- parcel 号称 零配置 的打包工具，但是该工具本身比较大，用的比较少；
- gulp 一般用于做一些自动化的东西；
- [webpack](https://webpack.js.org/) 开启的是 express 本地服务器；vite 开启的是 connect 本地服务器；
- [vite 官网](http://cn.vitejs.dev/config)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### vite 构建工具的原理

vite 会使用 Connect 库 建一个本地服务器，浏览器请求的时候直接请求的是 .ts / .less 等文件，然后vite工具将这些文件转化成 **es6 的 js** 代码，当浏览器真正去请求这个文件的时候，vite 对请求做了一个拦截，然后对请求做了一个转发，最后返回 vite 转换后的文件，这也是为什么用 Connect 的原因，因为 Connect 非常容易做请求的转发的；

![](.\vue3-image\打包工具 --- Vite.png)

![](.\vue3-image\打包工具 --- Vite（2）.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### vite 的使用

- ```
  # 局部安装 vite
  npm install vite -D
  
  # 局部安装后 使用 vite；vite会搭建一个本地服务，可以直接点击链接直接打开；
  npx vite
  ```



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### vite 默认对 css 进行处理

![](.\vue3-image\vite 默认对 css 进行处理.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### vite 对 typescript 的支持

![](.\vue3-image\vite 对 typescript 的支持.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### vite 对 vue 的支持

![](.\vue3-image\vite 对 vue 的支持.png)

```
# 安装插件 @vitejs/plugin-vue
# 在 vite.config.js 配置文件中配置插件
# 如果 vite 编译失败，安装插件 @vue/compiler-sfc 用于解析 .vue 文件（同 webpack 的配置）
```

![](.\vue3-image\vite 对 vue 的支持 --- vite配置文件 -- 插件配置.png)

- 
- 



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### vite 打包项目

- vite 在开发阶段使用时：执行 ` npx vite ` 搭建一个本地服务；
- vite 在生产阶段使用时：等项目开发完之后，执行 ` npx vite build ` 把项目打包到 dist 文件夹中，然后把 dist 文件夹部署在服务器中；
- 在 package.json 文件夹中进行如下配置后 可执行 ` npm run *** ` 来 打包 或者 开启 本地服务；

![](.\vue3-image\vite 打包项目.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### vite 打包比较快的原因

- vite 有预打包功能
  - 对于项目中安装的一些包，第一次执行 ` npx vite ` 时会对这些包做一个预打包，然后预打包的这几个包放到 ` node_modules/.vite ` 文件夹内，下一次再执行 ` npx vite ` 时就不再重复打包这些包；

- 基于 ` ESBuild ` 的解析

  ![](.\vue3-image\ESBuild的特点（1）.png)

![](.\vue3-image\ESBuild的特点（2）.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### vite 脚手架的使用

- 使用脚手架创建项目

```
# vite 脚手架的使用
## 方法一（老师推荐）：
### 安装脚手架
npm install @vitejs/create-app -g
### 使用脚手架创建项目
create-app 项目名称

## 方法二（官方推荐）：
npm init @vitejs/app
```

![](.\vue3-image\使用脚手架创建项目（1）.png)

- 创建项目的过程

  - 选择项目的框架

  ![](.\vue3-image\使用脚手架创建项目（2）.png)

  - 选择是否使用 typescript

  ![](.\vue3-image\使用脚手架创建项目（3）.png)

- 



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### JavaScript

##### javascript 代码的执行过程

- JavaScript代码  ==》 解析，转成 AST 树  ==》 字节码  ==》 浏览器的 V8引擎 读取字节码后 转化 并 运行（v8 也会把一些经常用的字节码转换成机器码进而提升效率，机器码可以直接在操作系统上运行）



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

### vue3 细节补充

##### 父子组件间传值

###### 父组件传递给子组件

- 子组件中 props 接收传值的写法汇总：

  - type 类型汇总：String、Number、Boolean、Array、Object、Date、Function、Symbol、自定义类型；

  ![](.\vue3-image\子组件中 props 接收传值的写法汇总：.png)

- 子组件接收 传递的 非 Prop 属性时，会自动添加到子组件的跟节点上

  ![](.\vue3-image\子组件接收 传递的 非 Prop 属性.png)

- 子组件设置不接收 传递的 非 Prop 属性，或者将属性添加到子组件跟元素之外的其他元素上

  ![](.\vue3-image\子组件设置不接收 传递的 非 Prop 属性.png)

- 



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 子组件传递给父组件

- 与 vue2 相比，vue3 的子组件中增加了 emits 属性的配置；

  ![](.\vue3-image\子组件传递给父组件（1）.png)

  ![](.\vue3-image\子组件传递给父组件（2）.png)

  ![子组件传递给父组件（3）](.\vue3-image\子组件传递给父组件（3）.png)

  ![子组件传递给父组件（4）](.\vue3-image\子组件传递给父组件（4）.png)

- 



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### 非父子组件间传值

非父子组件的通信有三种方式可以实现

- Provide / Inject  -- 父组件向子孙组件通信
- Mitt 第三方库 全局事件总线
- vuex



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### Provide / Inject  -- 父组件向子孙组件通信

![Provide Inject父组件向子孙组件通信](.\vue3-image\Provide Inject父组件向子孙组件通信.png)

- 注意：使用时如果父组件中 provide 属性内需要传递的内容来自 data ，需要加上 computed ，否则数据不是响应式的![Provide Inject父组件向子孙组件通信（2）](.\vue3-image\Provide Inject父组件向子孙组件通信（2）.png)![Provide Inject父组件向子孙组件通信（3）](.\vue3-image\Provide Inject父组件向子孙组件通信（3）.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### Mitt 第三方库 全局事件总线

![Mitt 第三方库 全局事件总线（1）](.\vue3-image\Mitt 第三方库 全局事件总线（1）.png)

![Mitt 第三方库 全局事件总线（2）](.\vue3-image\Mitt 第三方库 全局事件总线（2）.png)

![Mitt 第三方库 全局事件总线（3）](.\vue3-image\Mitt 第三方库 全局事件总线（3）.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### 插槽

###### 具名插槽

![](.\vue3-image\具名插槽（1）.png)![具名插槽（2）](.\vue3-image\具名插槽（2）.png)![具名插槽（3）](.\vue3-image\具名插槽（3）.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 作用域插槽

- 作用域插槽和具名插槽可以一起使用

```
# 父组件 ###################
<template>
  <div>
    <ShowNamesVue :names="names">
      <!-- 父组件中填充子组件插槽的元素外包裹一个template，用其 v-slot 来接收子组件传递的参数 -->
      <!-- 作用域插槽 -->
      <!-- <template v-slot="slotProps">
        <button>{{slotProps.item}}--{{slotProps.index}}</button>
      </template> -->

      <!-- 具名插槽 + 作用域插槽 -->
      <template v-slot:wls="slotProps">
        <button>{{slotProps.item}}--{{slotProps.index}}</button>
      </template>
    </ShowNamesVue>
  </div>
</template>

<script>
import ShowNamesVue from './ShowNames.vue'
export default {
  components: {
    ShowNamesVue
  },
  data () {
    return {
      names: ['why', 'koby', 'wls', 'coky']
    }
  }
}
</script>

# 子组件 ###################
<template>
  <div>
    <template
      v-for="(item,index) in names"
      :key="index"
    >
      <!-- 作用域插槽，slot标签内的属性可以传递给父组件，父组件中通过 v-slot=‘参数’ 中的参数接收 -->
      <!-- <slot :item="item" :index="index" ></slot> -->

      <!-- 具名插槽 + 作用域插槽 -->
      <slot
        name="wls"
        :item="item"
        :index="index"
      ></slot>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    names: {
      style: Array,
      default: () => []
    }
  }
}
</script>
```

![作用域插槽（1）](.\vue3-image\作用域插槽（1）.png)![作用域插槽（2）](.\vue3-image\作用域插槽（2）.png)

- 独占默认插槽可以缩写

![作用域插槽（3）](.\vue3-image\作用域插槽（3）.png)![作用域插槽（4）](.\vue3-image\作用域插槽（4）.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### 动态组件

###### 动态组件的基本使用

![动态组件（1）](.\vue3-image\动态组件（1）.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### 组件缓存

![组件缓存](.\vue3-image\组件缓存.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### 异步组件

- 异步组件，webpack 打包时独立打包，进行分包操作（优化首页加载速度）

```
# 引入vue自带的defineAsyncComponent方法，可以返回一个异步组件
import { defineAsyncComponent } from 'vue';
```

- defineAsyncComponent 接收两种类型的参数，返回一个异步组件

  - 类型一：工厂函数，该函数需要返回一个promise对象  正好运用 ` import('./**') ` 这个import方法是webpack引入异步组件的一种方法，返回一个promise（用的比较多）

    ```
    # 父组件 ###################
    <template>
    	<AsyncComponentVue />
    </template>
    
    # 引入异步组件AsyncComponent.vue，然后在 components Api中定义该组件后，即可正常使用
    const AsyncComponentVue = defineAsyncComponent(() => import('./AsyncComponent.vue'));
    components: {
        AsyncComponentVue,
     }
    ```

    - 异步组件 与 suspense 组件的结合使用，可以解决：如果异步组件加载失败，可以显示其他组件

    ```
    # 父组件 ###################
    <template>
    	<suspense>
              <!-- 默认展示的异步组件 -->
              <template #default>
                <AsyncComponentVue />
              </template>
              <!-- 异步组件加载失败时显示的组件 -->
              <template #fallback>
                <LoadingCom />
              </template>
        </suspense>
    </template>
    
    # 引入异步组件AsyncComponent.vue，然后在 components Api中定义该组件后，即可正常使用
    const AsyncComponentVue = defineAsyncComponent(() => import('./AsyncComponent.vue'));
    components: {
        AsyncComponentVue,
     }
    ```

    ![异步组件 与 suspense 组件的结合使用](.\vue3-image\异步组件 与 suspense 组件的结合使用.png)

  - 类型二：接收一个对象类型，对异步函数进行配置（用的少）

  ```
  const AsyncComponentVue = defineAsyncComponent({
    # 加载异步组件，与类型一效果一致
    loader: () => import('./AsyncComponent.vue'),
    # 占位的组件，一闪而过的展示，最终还是展示上面的那个组件
    loadingComponent: LoadingCom,
    # 加载异步组件失败时，展示该组件
    errorComponent: ErrorCom,
    # 在显示 LoadingCom 组件之前，等待多长时间
    delay: 2000,
    /**
     * 监听异步组件加载失败
     * err：错误信息对象
     * retry：函数，调用 retry 尝试重新加载，用于指示当 promise 加载器 reject 时，加载器是否应该重试
     * fail：一个函数，指示加载程序结束退出
     * attempts：记录尝试的次数，允许的最大重试次数
     */
    onError: function (err, retry, fail, attempts) { }
  })
  ```

- 



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### $refs 、\$parent 和 \$root 获取组件实例![获取组件实例](.\vue3-image\获取组件实例.png)

- $el 获取组件的跟元素（所有元素）

  ```
  # 获取子组件 sonCom 内的跟元素（所有元素）
  this.$refs.sonCom.$el
  ```

  

**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### 生命周期

![生命周期](.\vue3-image\生命周期.png)

###### 注意：setup 的执行时机要早于 beforeCreate

![生命周期钩子](.\vue3-image\生命周期钩子.png)

##### vue 生命周期

本节课需要掌握生命周期的整个流程、包括各个生命周期前后各做了什么事情、AST树、虚拟DOM、vue2和vue3分别如何处理响应式数据、异步更新过程和优点；首次可调用data、methods的位置、哪里生成ast树、哪里生成render函数、哪里执行render函数、哪里生成vnode、哪里进行diff算法、首次通过$refs获取模版饮用在哪里、nexttick是什么？

```
创建vue实例: vue2 new Vue（）  vue3 vue.createApp（）
初始化events和生命周期 vue2  ：events包括 $on、$off、$emit、$listener

beforeCreate

初始化注入和响应式 data、ref、reactive响应式处理
vue2: provide、inject、props、data、computed、watch、methods。 vue3：ref、reactive

created

第一次可以使用data、methods数据
判断有没有el选项作为挂载点，没有就使用$mount指定的元素作为挂载点
if（render）｛执行下一个阶段｝
else if（template）｛将template编译成render函数再执行下一阶段｝
else｛将挂载点点内容作为template编译成render函数再执行下一阶段｝
模版语法/template—抽象语法树—render函数

beforeMount

vnode挂载前夕，此时$refs还是个空的
调用render函数，生成虚拟dom，之前的挂载点el元素将被新生成的$el替换掉，$refs就是在这一步背解析出来的
mounted 第一次可以操作dom，获取$refs模板引用

响应式数据发生变化触发beforeupdate
beforeupdate 还可拿到更新前的dom数据，也可以在这里继续对数据修改
重新触发render函数生成新的vnode，与老的vnode进行diff算法比较且更新到真实dom上。vue采用异步更新，开启一个队列，在这个队列里所有数据变更后、再更新dom，从而避免了不必要的dom操作

更新完成触发updated

组件卸载或离开页面触发 beforeUnmount （此时 组件实例的功能完全正常，应当在卸载前移除手动添加的监听器，如clearTimeout 、clearInterval等清除操作）

卸载完成后 data、methods 等都不能再访问了

unMounted
```



##### nextTick

- 官方解释： 将回调推迟到下一个DOM跟新周期之后执行，在更改了一些数据，等待DOM更新之后立即使用它；

- DOM更新后执行，与 updated钩子函数 不同，nextTick 可以是针对性的，而 updated 是对全局的监听，只要DOM刷新就执行；

```
# vue2
this.$nextTick(() =>{});

# vue3
import { nextTick } from 'vue';
nextTick(() => {});
```





**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### v-model 双向绑定***

###### 原生元素上使用 v-model

```
<template>
  <div>
    <h2>Input-com组件</h2>
    <!-- v-model 双向绑定 -->
    <input v-model="message">
    <!-- v-model 双向绑定在元素上这样写的时候，相当于下面哪种写法 -->
    <input
      :value="message"
      @input="message=$event.target.value"
    >
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'hello world'
    }
  }
}
</script>
```



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 组件上使用 v-model  方式一：

```
# 父组件 ###################
<template>
  <div>
    <!-- 组件上使用 v-model -->
    <MyInput v-model="message"></MyInput>
    <!-- 组件上使用 v-model 相当于 同时绑定了 modelValue 属性 以及 update 方法，
    这两个名字是默认的，可以通过配置来修改 -->
    <MyInput
      :modelValue="message"
      @update:model-value="message=$event"
    ></MyInput>
  </div>
</template>

<script>
import MyInput from './MyInput.vue'
export default {
  data () {
    return {
      message: 'hello world'
    }
  },
  components: {
    MyInput
  }
}
</script>

# 子组件 ###################
<template>
  <div>
    <h2>MyInput:{{modelValue}}</h2>
    <input
      :value="modelValue"
      @input="editValue"
    >
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
  methods: {
    editValue (event) {
      // event.target.value 原生input取值方式
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
```



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 组件上使用 v-model  方式二：

- 使用 computed 的 get 和 set 方法实现父子组件数据的双向绑定

```
# 父组件 ###################
<template>
  <div>
    <!-- 组件上使用 v-model 方式二： -->
    <MyInputTwo v-model="message"></MyInputTwo>
    <!-- 组件上使用 v-model 相当于 同时绑定了 modelValue 属性 以及 update 方法，
    这两个名字是默认的，可以通过配置来修改 -->
    <MyInputTwo
      :modelValue="message"
      @update:model-value="message=$event"
    ></MyInputTwo>
  </div>
</template>

<script>
import MyInputTwo from './MyInputTwo.vue'
export default {
  data () {
    return {
      message: 'hello world'
    }
  },
  components: {
    MyInputTwo
  }
}
</script>

# 子组件 ###################
<template>
  <div>
    <h2>MyInput:{{modelValue}}</h2>
    <input v-model="value">
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
  // 使用 computed 的 get 和 set 方法实现父子组件数据的双向绑定
  computed: {
    value: {
      set (val) {
        this.$emit('update:modelValue', val)
      },
      get () {
        return this.modelValue
      }
    }
  }
}
</script>
```



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 组件上使用 v-model 方式三：（绑定两个 v-model，当然也可以绑定多个）***

- **注意写法：` v-model:titleValue="title"  ` 修改默认的属性名以及事件名**

  **属性名：默认为 modelValue  ==》修改为  titleValue**

  **事件名：默认为 update:model-value  ==》修改为  update:title-value**

```
# 父组件 ###################
<template>
  <div>
    <!-- 组件上使用 v-model 方式三： （绑定两个v-model） -->
    <MyInputTwoDouble
      v-model="message"
      v-model:titleValue="title"
    ></MyInputTwoDouble>
    <!-- 
      组件上使用 v-model="message" 相当于 同时绑定了 modelValue 属性 以及 update:model-value 方法，
      这两个名字是默认的，可以通过配置来修改;
      v-model:titleValue="title" 相当于 同时绑定了 titleValue 属性 以及 update:title-value 方法，
      这两个名字是自定义的，相当于对默认的修改；
     -->
    <!-- 组件中使用 v-model 相当于以下写法 -->
    <MyInputTwoDouble
      :modelValue="message"
      @update:model-value="message=$event"
      :titleValue="title"
      @update:title-value="title=$event"
    ></MyInputTwoDouble>
  </div>
</template>

<script>
import MyInputTwoDouble from './MyInputTwoDouble.vue'
export default {
  data () {
    return {
      message: 'hello world',
      title: 'wls'
    }
  },
  components: {
    MyInputTwoDouble,
  }
}
</script>

# 子组件 ###################
<template>
  <div>
    <h2>默认属性名 modelValue:---{{modelValue}}</h2>
    <input v-model="value">

    <h2>自定义属性名 titleValue:---{{titleValue}}</h2>
    <input v-model="title">
  </div>
</template>

<script>
export default {
  props: {
    // 接收v-model默认属性名传值
    modelValue: String,
    // 接收v-model自定义属性名传值
    titleValue: String,
  },
  emits: ['update:modelValue', 'update:titleValue'],
  // 使用 computed 的 get 和 set 方法实现数据的双向绑定
  computed: {
    value: {
      set (val) {
        // update:modelValue 默认事件名
        this.$emit('update:modelValue', val)
      },
      get () {
        return this.modelValue
      }
    },
    title: {
      set (val) {
        // update:titleValue 自定义事件名
        this.$emit('update:titleValue', val)
      },
      get () {
        return this.titleValue
      }
    },
  }
}
</script>
```



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### vue3 过渡动画

###### transition 标签 -- 给单个元素或者单个组件添加过渡动画

- transition 标签 --- vue3 内置组件

![vue3 过渡动画（1）](.\vue3-image\vue3 过渡动画（1）.png)



- v-enter-from 中的 v ：如果在 transition 标签中设置了 name 属性，则 name 属性值会替换这里的 v 变成新的类名 wls-enter-from ，如果不设置name 属性，就默认为 v-enter-from；
- 过渡动画的class也可以自定义，下面有提到；

![vue3 过渡动画（2）](.\vue3-image\vue3 过渡动画（2）.png)



- transition 组件实现动画效果的原理

  自己总结：给 transition 标签包裹的组件或者元素 添加 和 删除 css类名；![vue3 过渡动画（3）](.\vue3-image\vue3 过渡动画（3）.png)

- css 样式 transition 和 animation 两种动画一起使用

  注意：这两个动画一起使用时要在 transition 标签上加个属性 type='transition' 或者 type='animation' ，设置vue以那个动画效果来渲染，因为动画效果的实现依赖 css 类名的删除与添加；type值有两个 animation 和 transition ；一般设置为时间长的；

  - transition标签的属性：

    - type

    ```
    注意：动画效果的实现依赖 css 类名的删除与添加；
    animation 设置vue以 animation 样式中设置的动画效果为主来渲染；
    transition 设置vue以 transition 样式中设置的动画效果为主来渲染；
    ```

    - duration

    ```
    设置过渡的时间，该属性一旦设置，style中的时间就会被覆盖；
    方式一：设置为 数字类型；
    方式二：设置为 对象类型；
    ```

    - mode

    ```
    如果 transition 标签内有 v-if 和 v-else 轮流显示两个组件或者元素时，需要设置该属性，设置显示效果；
    out-in 先完全隐藏 之后 再显示另一个元素或组件；
    in-out 先显示被隐藏的组件或元素 之后 再隐藏当前显示的组件和元素；
    ```

    - appear

    ```
    true 第一次刷新页面时就出现 动画效果；
    false 默认为false；
    ```

    

```
<template>
  <div>
    <button @click="isShow=!isShow">切换</button>
    <!-- transition元素 vue3内置组件，用于实现过度动画效果 -->
    <!-- 1、给单个元素 或者 单个组件 实现过渡动画效果 -->
    <!-- 
      transition标签的属性：
      # type：
      注意：动画效果的实现依赖 css 类名的删除与添加；
      animation 设置vue以 animation 样式中设置的动画效果为主来渲染；
      transition 设置vue以 transition 样式中设置的动画效果为主来渲染；
      # duration：
      设置过渡的时间，该属性一旦设置，style中的时间就会被覆盖；
      方式一：设置为 数字类型；
      方式二：设置为 对象类型；
      # mode：
      如果 transition 标签内有 v-if 和 v-else 轮流显示两个组件或者元素时，需要设置该属性，设置显示效果；
      out-in 先完全隐藏 之后 再显示另一个元素或组件；
      in-out 先显示被隐藏的组件或元素 之后 再隐藏当前显示的组件和元素；
      # appear：
      true 第一次刷新页面时就出现 动画效果；
	  false 默认为false；
     -->
    <!-- <transition name="wls" type="animation" :duration="1000"> -->
    <transition name="wls" type="animation" :duration="{enter:800, leave:1000}" mode="out-in" appear>
      <h2 style="display:inline-block" v-if="isShow">hello world</h2>
      <h2 style="display:inline-block" v-else>你好，李银河</h2>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: true
    }
  }
}
</script>

<style scoped>
/* 设置组件进入前或者离开后 透明度 */
.wls-enter-from,
.wls-leave-to {
  opacity: 0;
}
/* 设置组件进入后或者离开前 透明度 */
.wls-enter-to,
.wls-leave-from {
  opacity: 1;
}
/* 设置组件进入或者离开 过度动画 */
.wls-enter-active,
.wls-leave-active {
  /* transition属性，必须要设置 from to，也可以用 animation 动画，不用设置 from to */
  /* 透明度 时间 运动曲线 */
  transition: opacity 0.5s ease;
}
/* animation 实现动画 */
.wls-enter-active {
  /* 动画名称 时间 运动曲线 */
  animation: bounce 2s ease;
}
.wls-leave-active {
  /* 动画名称 时间 运动曲线 动画反转 */
  animation: bounce 2s ease reverse;
}
/* 定义动画的名字，用 animation 实现动画的效果 */
@keyframes bounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
```



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### transition 组件的生命周期钩子，用于监听动画执行到那个阶段

- 注意：使用JavaScript来执行过渡动画时，需要进行 done 回调，否则它们将会被同步调用，过渡会立即完成；如果和 第三方库gsap 一起使用，一般放在gsap库中的 onComplete 函数中回调；
- 注意：这些钩子函数要放在 methods 方法中调用；
- 这些钩子函数被vue内部回调时会传递两个参数 ` ( el, done) `
  - 参数 el  ===》要做动画的元素对象
  - 回调函数done ===》这个回调函数需要在合适的时机调用，否则会被自动调用，不管动画是否执行结束，一旦执行这个回调函数，就默认动画结束；
- ` :css="false" `  transition 组件中的这个属性设置为false会过滤掉 style内的css动画效果；

![transition 组件的生命周期钩子](.\vue3-image\transition 组件的生命周期钩子.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 使用第三方库实现动画效果 -之- animate.css库 （css库）

[animate.css官网](https://animate.style/)

- animate.css 库的使用

![animate.css 库的使用](.\vue3-image\animate.css 库的使用.png)

```
# 安装
npm install animate.css
# 引入
import 'animate.css'
```

- 使用 方法一：只使用该库中动画的名字

  在style中使用 animation 属性时 调用这个第三方库中的动画的名字，例如flip，然后自己设置时间以及动画其他属性

```
<template>
  <div>
    <button @click="isShow=!isShow">切换</button>
    <transition name="wls">
      <h2
        v-if="isShow"
        style="display:inline-block"
      >hello world</h2>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: true
    }
  }
}
</script>

<style scoped>
.wls-enter-active {
// 在style中使用 animation 属性时 调用这个第三方库中的动画的名字，例如flip，然后自己设置时间以及动画其他属性
  animation: flip 2s ease-in;
}
.wls-leave-active {
  animation: flip 2s ease-in reverse;
}
</style>
```

- 使用 方法二：使用该库中动画的类名

  **注意：每次使用，必须增加基础的类名 .animate__animated**

- **transition 这个标签可以自定义过渡的class**

  <img src=".\vue3-image\transition 这个标签可以自定义过渡的class.png" alt="transition 这个标签可以自定义过渡的class" style="zoom:50%;" />

```
<template>
  <div>
    <button @click="isShow=!isShow">切换</button>
    <!-- 注意：每次使用，必须增加基础的类名 .animate__animated -->
    <transition name="wls"
      enter-active-class="animate__animated animate__slideInLeft"
      leave-active-class="animate__animated animate__rotateInDownRight"
    >
      <h2 v-if="isShow" style="display:inline-block">hello world</h2>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: true
    }
  }
}
</script>
```



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 使用第三方库实现动画效果 -之- gsap库 （js库）

[gsap官网](https://greensock.com/)

- 使用 gsap 库

  - 安装

    ```
    npm install gsap
    ```

  - 引入

    ```
    import gsap from 'gsap'
    ```

    

- 由于通过 css 实现动画效果不是很灵活，因此这种 js 库应运而生；

![使用第三方库实现动画效果 -之- gsap库 （js库）](.\vue3-image\使用第三方库实现动画效果 -之- gsap库 （js库）.png)

- 使用 gsap 库

  ` :css="false" `  transition 组件中的这个属性设置为false会过滤掉 style内的css动画效果

```
<template>
  <div>
    <button @click="isShow=!isShow">切换</button>
    <!-- :css="false" 这个属性设置为false会过滤掉 style内的css动画效果 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
      @enter-cancelled="enterCancelled" @before-leave="beforeLeave" @leave="leave"
      @after-leave="afterLeave" @leave-cancelled="leaveCancelled" :css="false">
      <h2 v-if="isShow" style="display:inline-block">hello world</h2>
    </transition>
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  data () {
    return {
      isShow: true,
      setScale: 2,
    }
  },
  methods: {
    beforeEnter () {
      console.log('beforeEnter')
    },
    enter (el, done) {
      console.log('enter', '一般 js动画在这里加')
      // 执行动画使元素达到一定的状态
      // gsap.to(target, {}); // target: 给谁执行动画； {}：后面执行动画的配置项，达到的动画效果；
      // onComplete: done, 动画完成后，调用回调函数 done
      // 注意：这里的回调函数 done 需要手动调用，否则他会自动被调用，不管动画是否执行结束，一旦执行这个回调函数，就默认动画结束；
      gsap.from(el, {
        x: 200,
        scale: this.setScale,
        onComplete: done,
      })
    },
    leave (el, done) {
      console.log('leave', '一般 js动画在这里加')
      gsap.to(el, {
        x: 200,
        scale: this.setScale,
        onComplete: done,
      })
    },
  }
}
</script>
```



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### transition-group 标签 --- 渲染一个列表（多个组件或元素）的动画效果

- transition-group 标签的属性
  - tag="p" 属性表示 transition-group 这个组件内部的元素最终都会包裹在 p 标签内，即 transition-group 标签被渲染成 p 标签；
- 注：做动画效果一般都会把 transition-group 标签 内部的元素改成 inline-block 行内块元素
- transition-group 标签 也有生命周期钩子函数，与transition标签用法一致

![transition-group 标签](.\vue3-image\transition-group 标签.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 案例1 -- gsap实现数字变化 -- gsap库的使用![案例 -- gsap实现数字变化](.\vue3-image\案例 -- gsap实现数字变化.png)

**v-move**： 这个案例中新增或者删除的节点是有动画的，但是其他移动的节点是没有动画效果的，可以使用 v-move 这个类名来实现其他移动节点的动画效果；

- 注意：如果在style中设置该类名样式后，其他移动节点仍没有动画效果，考虑是新增或者删除的节点位置仍然在 占位，可以先将其脱离标准流，腾出空间占位；![v-move 类名](.\vue3-image\v-move 类名.png)

```
<template>
  <div>
    <button @click="addNumber">添加数字</button>
    <button @click="delNumber">删除数字</button>
    <button @click="shuffleNumber">重新洗牌</button>
    <!-- tag="p" 属性表示 transition-group 这个组件内部的元素最终都会包裹在 p 标签内 -->
    <transition-group name="wls" tag="p">
      <!-- 做动画效果一般都会把 内部的元素改成 inline-block 行内块元素 -->
      <span class="numberTitle" v-for="item in numbers" :key="item">{{item}}</span>
    </transition-group>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  methods: {
    addNumber () {
      this.numbers.splice(this.getRandomNum(), 0, this.numbers.length)
    },
    delNumber () {
      this.numbers.splice(this.getRandomNum(), 1)
    },
    shuffleNumber () {
      this.numbers = _.shuffle(this.numbers)
    },
    getRandomNum () {
      return Math.floor(Math.random() * this.numbers.length);
    }
  }
}
</script>

<style scoped>
.numberTitle {
  display: inline-block;
  margin-left: 15px;
}
.wls-enter-from, .wls-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.wls-enter-active, .wls-leave-active {
  transition: all 1s ease;
}
/* 由于删除某个元素的时候，这个元素的位置并没有被移除，所有右侧的元素没有显示动画效果 */
.wls-leave-active {
  position: absolute;
}
/* wls-move 这个类名是vue自带的动画效果，旨在解决其他被动移动的节点动画效果，如果是位移，动画名称就是transform */
.wls-move {
  transition: transform 1s ease;
}
</style>
```



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 案例2 -- 列表的交替动画

```
<template>
  <div>
    <input v-model="title">
    <!-- :css='false' -->
    <transition-group tag="ul" name="wls" @beforeEnter="beforeEnter" @enter="enter" @leave="leave">
      <li v-for="(item, index) in showTitles" :key="item" :data-index="index">{{item}}</li>
    </transition-group>
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  data () {
    return {
      titles: ['asd', 'sdf', 'dfg', 'fgh', 'ghj', 'afg', 'adg'],
      title: '',
    }
  },
  computed: {
    showTitles () {
      return this.titles.filter(item => item.includes(this.title))
    }
  },
  methods: {
    // beforeEnter 这个回调钩子只有一个参数 el 
    beforeEnter (el) {
      el.style.opacity = 0;
    },
    enter (el, done) {
      gsap.to(el, {
        x: 0,
        opacity: 1,
        height: '1.5em',
        // delay 延时执行，这里实现给每个元素设置不同的延时执行的时间
        // 在元素标签中设置 data-index 属性，可以在 el.dataset.index 中拿到其属性值
        delay: el.dataset.index * 0.5,
        onComplete: done,
      })
    },
    leave (el, done) {
      gsap.to(el, {
        x: 100,
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.5,
        onComplete: done,
      })
    }
  }
}
</script>

<style scoped>
/* css 动画效果，有点僵硬 */
/* .wls-enter-from,
.wls-leave-to {
  opacity: 0;
}
.wls-enter-active,
.wls-leave-active {
  transition: all 1s ease;
} */
</style>
```



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### setup  Api的使用

###### setup的两个参数：props、context

- setup 中不能使用 this
- context 参数的三个属性
  - attrs 父组件传递的所有非 prop 的 attribute；
  - slots 父组件传过来的插槽（这个在以渲染函数返回时会有作用）；
  - emit 当我们组件内部需要发出事件时会用到 emit （因为setup中不能访问this，所以不可以通过 this.$emit 发出事件，只能通过 context.emit 发出事件）；
- 

![](.\vue3-image\setup的两个参数.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### setup 函数的返回值

- setup 的返回值可以在 模板 template 中被使用；
- setup 的返回值会替代 data 选项（即使同时定义了data和setup，有冲突的定义还是以 setup 返回值为准）；

![setup 函数的返回值](.\vue3-image\setup 函数的返回值.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### setup 函数中不能使用 this

![setup 函数中不能使用 this](.\vue3-image\setup 函数中不能使用 this.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### reactive API的使用

- 使用reactive将数据变成响应式的
- **注意：reactive 对传入的类型是有限制的，要求必须传入一个对象或者数组类型；**

![reactive API的使用](.\vue3-image\reactive API的使用.png)

**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### ref API 的使用

- 使用 ref 将数据变成响应式的
- 

![ref API 的使用](.\vue3-image\ref API 的使用.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### readonly 的使用

```
setup (props, context) {
## reactive 和 ref 代码
    // 直接定义的counter 是不具备响应式的
    let counter = 100;
    // 使用 reactive 函数进行包裹，数据会变成响应式的
    // 注意：reactive对于传入的类型是有限制的，必须传入对象或者数组；
    let state = reactive({
      newCounter: 100,
    })
    // 使用 ref 函数进行包裹，将数据变成一个ref的可响应式的引用（一个ref的对象）
    let newRefCounter = ref(100);

    function add () {
      counter++;
      state.newCounter++;
      newRefCounter.value++;
      console.log(counter);
      console.log(state.newCounter);
      console.log(newRefCounter, newRefCounter.value);
    }
## readonly 代码
    // 普通对象 => 只读对象
    const info1 = { name: 'why' };
    const readonlyInfo1 = readonly(info1);

    // 响应式的对象 => 只读的响应式的对象
    const info2 = reactive({
      name: 'why-info2'
    })
    const readonlyInfo2 = readonly(info2);

    function changeState () {
      info1.name = 'wls';
      readonlyInfo1.name = 'wls'; // 修改只读属性，报警告
      info2.name = 'wls-info2';
      readonlyInfo2.name = 'wls-info2'; // 修改只读属性，报警告
    }

    return {
      counter,
      state,
      newRefCounter,
      add,
      info1,
      readonlyInfo1,
      info2,
      readonlyInfo2,
      changeState,
    }
}
```

- readonly 只读属性，原理介绍：

![readonly 的使用](.\vue3-image\readonly 的使用.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### reactive 判断的API

- isProxy
  - 检查对象是否是由 reactive 或 readonly 创建的 proxy；
- isReactive
  - 检查对象是否是由 reactive 创建的响应式代理；
  - 如果该代理是 readonly 创建的，但包裹了由 reactive 创建的另一个代理，他也会返回 true；
- isReadonly
  - 检查对象是否是由 readonly 创建的只读代理；
- toRaw
  - 返回 reactive 或 readonly 代理的原始对象（不建议保留对原始对象的持久引用，请谨慎使用）；
- shallowReactive
  - 创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换（深层还是原生对象）；
- shallowReadonly 
  - 创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换（深层还是可读、可写的）；



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### ref 判断的API

- unref

  - 如果我们想要获取一个 ref 引用中的 value，那么也可以通过 unref 方法；

  - 原理：

    - 如果参数是一个 ref ，则返回其内部 value 值，否则返回参数本身；

    - ```
      # 就是一个语法糖
      val = isRef(val) ? val.value : val
      ```

- isRef
  - 判断值是否是一个 ref 对象；
- shallowRef
  - 创建一个浅层的 ref 对象；
- triggerRef
  - 手动触发和 shallowRef 相关联的副作用；



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### toRefs 和 toRef

- 使用 toRefs 将 reactive 对象解构出来的 属性 转换成 ref 响应式数据对象；
- toRefs 将 reactive 对象中的所有属性都转换成 ref，建立连接；

- toRef 将 reactive 对象中的一个属性转换成 ref，建立连接

```
const info3 = reactive({ name: 'why', age: 18 });
# 将 reactive 对象解构出来的 属性 不是响应式的
let { name, age } = info3;
# 使用 toRefs 将 reactive 对象解构出来的 属性 转换成 ref 响应式数据对象
## 1、toRefs 将 reactive 对象中的所有属性都转换成 ref，建立连接
let { name, age } = toRefs(info3);
## 2、toRef 将 reactive 对象中的一个属性转换成 ref，建立连接
let { name } = info3;
let age = toRef(info3, 'age');
```

![toRefs 和 toRef（1）](.\vue3-image\toRefs 和 toRef（1）.png)

![toRefs 和 toRef（2）](.\vue3-image\toRefs 和 toRef（2）.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### customRef

- 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显示控制；相当于对 ref 的内部实现原理进行再加工封装；
  - 他需要一个工厂函数，该函数接受 track 和 trigger 函数作为参数；
    - track 方法：对依赖项进行跟踪；
    - trigger 方法：触发更新视图；
  - 并且应该返回一个带有 get 和 set 的对象；

- customRef 案例

![customRef 案例](.\vue3-image\customRef 案例.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### computed 计算属性 （使用基本一致，注意 get 的返回值应该是 响应式数据，这样计算属性的结果才是响应式的数据）

```
setup(){
	const count = ref(1);
	// 注意：如果传递给computed的是一个函数，那就是一个getter函数，只能获取它的值，而不能修改它
	const plusOne = computed(()=>count.value + 1);
	// 修改计算属性plusOne的值
	plusOne.value++; // 报错
	
	const newPlusOne = computed({
		get:()=>count.value + 1,
		set:val=>{
			count.value = val - 1;
		},
	});
	// 修改计算属性newPlusOne的值，会连带修改所依赖的count的值；***
	newPlusOne.value = 1;
	console.log(count.value); // 0;
}
```



![computed 计算属性](.\vue3-image\computed 计算属性.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### watch 侦听器 的变化

![watch 侦听器 的变化](.\vue3-image\watch 侦听器 的变化.png)

- watchEffect 用于自动收集响应式数据的依赖

  - **watchEffect 没有 old Value 值；**

  - watchEffect 传入的函数会被立即执行一次，并且在执行的过程中会收集该函数中所用到的依赖；
  - 只有收集的依赖发生变化时，watchEffect 传入的函数才会再次执行；

  ![watchEffect 用于自动收集响应式数据的依赖](.\vue3-image\watchEffect 用于自动收集响应式数据的依赖.png)

  - watchEffect 的停止侦听
    - watchEffect 返回值是一个可以停止侦听的函数，执行该函数便可以停止侦听器的侦听；

  ![watchEffect 的停止侦听](.\vue3-image\watchEffect 的停止侦听.png)

  - watchEffect 的清除副作用

    - 常用于清除 请求；**页面一加载就会触发一次侦听和请求，当再次触发侦听时，如果上次请求未结束，会先关闭上次请求，然后再重新请求；**

    ![watchEffect 的清除副作用](.\vue3-image\watchEffect 的清除副作用.png)

  - watchEffect 第一个参数是回调函数，第二参数是对watchEffect 的配置对象；

    - watchEffect 的配置对象 的属性 flush；
      - flush 有三个属性值：pro、post、sync  ;
        - pro 提前执行，使watchEffect的回调函数在setup执行后直接执行；是默认值；
        - post 等待DOM挂载完成之后再执行；常用于在watchEffect的回调函数中通过ref获取dom元素
        - sync 强制同步执行

    ```
    watchEffect(()=>{},{
    	// flush 有三个属性值，pro、post、sync
    	// pro 提前执行，使watchEffect的回调函数在setup执行后直接执行；
    	// post 等待DOM挂载完成之后再执行；常用于在watchEffect的回调函数中通过ref获取dom元素，或者使用DOM中的一些东西；
    	// sync 强制同步执行
    	flush: 'post'
    })
    ```

  ![watchEffect 的执行时机（1）](.\vue3-image\watchEffect 的执行时机（1）.png)

  ![watchEffect 的执行时机（2）](.\vue3-image\watchEffect 的执行时机（2）.png)

  - 

- watch 需要手动指定侦听的数据源

  - watch 侦听单个数据源

  ![watch 侦听单个数据源](.\vue3-image\watch 侦听单个数据源.png)

  - watch 侦听多个数据源

  ![watch 侦听多个数据源](.\vue3-image\watch 侦听多个数据源.png)

  - watch 侦听响应式对象，可以侦听一个数组或对象

  ![watch 侦听响应式对象](.\vue3-image\watch 侦听响应式对象.png)

  - watch 的选项

  ![watch 的选项](.\vue3-image\watch 的选项.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### setup 中使用 ref 拿到 DOM 元素

![setup 中使用 ref 拿到 DOM 元素（1）](.\vue3-image\setup 中使用 ref 拿到 DOM 元素（1）.png)

![setup 中使用 ref 拿到 DOM 元素（2）](.\vue3-image\setup 中使用 ref 拿到 DOM 元素（2）.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### provide 和 inject 子孙组件间传值

- 注意：不要在子孙组件中修改传递的数据，尽可能保证 单向数据流；

```
# 祖先组件
<template>
  <div>
    <SonComVue />
    <button @click="changeAge">+1</button>
  </div>
</template>
<script>
import { ref, provide, readonly } from 'vue';
import SonComVue from './SonCom.vue';
export default {
  components: {
    SonComVue
  },
  setup () {
    const age = ref(100);
    // readonly包裹 保证在子孙组件中不修改该数据
    provide('age', readonly(age));
    const changeAge = () => age.value++;
    return {
      changeAge
    }
  }
}
</script>

# 子孙组件
<template>
  <div>
    <h2>{{age}}</h2>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup () {
    // inject 第二个参数为 默认值，如果祖先组件没有传递，就取默认值
    const age = inject('age', 18);
    return {
      age
    }
  }
}
</script>
```



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### 自定义指令

###### 使用场景

- 需要对DOM元素进行底层操作的时候

![自定义指令（1）](.\vue3-image\自定义指令（1）.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 指令的生命周期

![自定义指令（2）](.\vue3-image\自定义指令（2）.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 指令的参数以及修饰符

![自定义指令（3）](.\vue3-image\自定义指令（3）.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### teleport 组件

- vue3 的内置组件

![teleport 组件](.\vue3-image\teleport 组件.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### vue 插件的使用

- vue 插件的方法里可以定义全局的属性、指令、组件、mixin等；
- 有两种编写方式



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 对象类型的插件

- 对象类型的插件必须包含一个 install 函数，该函数会在安装插件时执行（app.use(***) 时执行）；

- 对象类型的插件导出一个对象；

- 使用步骤

  ```
  /**
   * 使用步骤：
   * 1、在该文件内导出一个函数；（该函数内部可以定义全局的指令、组件等）
   * 2、在 main.js 文件夹内 引入该文件 取名 *** ，并使用 app.use(***) 注册该插件，此时就相当于调用了该文件内的install函数，并将 app 组件实例作为参数传入；
   * 3、在其他 .vue 文件内使用该文件内定义的指令、组件等；
   */
   
   ##  plugins_object.js 文件内
   // 对象类型的插件，必须有 install 函数
  export default {
    // 这里拿到的就是创建的 全局的app 配置对象
    install (app) {
      console.log(app);
      // 给app组件实例上增加全局属性， 一般以 $ 开头，便于区分
      app.config.globalProperties.$wls = 'wls';
  
      // 在插件里面可以定义全局的 指令、组件等等
      // 例如定义 全局指令
      app.directive('wls_object', {
        mounted (el, bindings, vnode, preVnode) {
          console.log('focus 全局指令 mounted');
          el.focus();
        }
      })
    }
  }
  
  ## main.js 文件内
  import { createApp } from 'vue'
  import pluginObject from './19-plugins/plugins_object';
  // 使用对象类型的插件  ==> 内部原理：调用pluginObject里的 install 方法，并且传入 app 作为参数
  app.use(pluginObject);
  
  ## 然后就可以在普通的 .vue 文件内使用
  ```



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

###### 函数类型的插件

- 函数类型的插件导出一个函数

- 使用步骤：

  ```
  /**
   * 使用步骤：
   * 1、在该文件内导出一个函数；（该函数内部可以定义全局的指令、组件等）
   * 2、在 main.js 文件夹内 引入该文件 取名 *** ，并使用 app.use(***) 注册该插件，此时就相当于调用了该文件内的函数，并将 app 组件实例作为参数传入；
   * 3、在其他 .vue 文件内使用该文件内定义的指令、组件等；
   */
   
   ## plugins_function.js 文件内
   
  // 函数类型的插件
  export default function (app) {
    console.log(app);
    // 在插件里面可以定义全局的 指令、组件等等
    // 例如定义 全局指令
    app.directive('wls_function', {
      mounted (el, bindings, vnode, preVnode) {
        console.log('focus 全局指令 mounted');
        el.focus();
      }
    })
  }
  
  ## main.js 文件内
  import { createApp } from 'vue'
  import pluginFunction from './19-plugins/plugins_function';
  // 使用函数类型的插件  ==> 内部原理：调用pluginFunction里的方法，并且传入 app 作为参数
  app.use(pluginFunction);
  
  ## 然后就可以在普通的 .vue 文件内使用
  ```

![vue 插件的使用](.\vue3-image\vue 插件的使用.png)



**/  -  /  -  /  -  /   -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  -  /  **

##### 组件实例

- 在setup 中没有 this ，可以通过以下方法拿到当前组件的实例对象

  ```
  <script>
  import { getCurrentInstance } from 'vue';
  export default {
    mounted () {
      // 拿到全局的属性（plugins_object.js 插件中定义的）
      console.log(this.$wls, 'mounted中拿到全局属性');
    },
    setup () {
      // 拿到当前的组价实例
      const instance = getCurrentInstance();
      console.log(instance);
      // 拿到全局的属性（plugins_object.js 插件中定义的）
      console.log(instance.appContext.config.globalProperties.$wls, 'setup中拿到全局属性')
    }
  }
  </script>
  ```


##### setup细节补充

- setup 中拿不到 this
  - 如果想拿到路由对象，可以使用 vue-router4.x 中提供的 useRoute 钩子函数，调用返回值即和 this.$route 相同的效果，注意先引入 useRoute 该钩子函数；



##### app.use() 可以传入一个方法，也可以传入一个对象

-  \* 方法：app.use(function(app) {})

-  \* 对象：app.use({install: function(app) {}})

```
# 方法
# aaa.js 文件内
export function aaa(app: App): void {
	// 全局注册组件
   app.component(componentName, component)
}

# main.ts 文件内
import { aaa } from './aaa'
const app = createApp(App)
app.use(aaa)
// 或者直接执行该方法传入app也可以
// aaa(app)
```

```
# 对象格式
# aaa.js 文件内
export function aaa(): void {
	// 全局注册组件
	return {
        install: (app: App) => {
          app.component(componentName, component)
        }
    }
}

# main.ts 文件内
import { aaa } from './aaa'
const app = createApp(App)
app.use(aaa)
```



##### vue3 中使用 props

- 从 vue 中导入 widthDefaults 、defineProps；
  - defineProps：用于定义props，可以用泛型控制props中接收的参数的类型，如果参数的类型不是可选的，这个参数就是必传的；
  - widthDefaults ：接收两个参数，参数一为defineProps，参数二是一个对象，用于定义props接收参数的默认值；

```
# vue 文件内
<template>
	<div>在模板中使用props：{{width}}</div>
</template>

import {defineProps, widthDefaults} from 'vue';
// 定义 props
const props = widthDefaults(
	defineProps<{
		width?: string,
		height?: string
	}>(),
	{
		width: '100px',
		height: '100px'
	}
)

onMounted(() => {
	// 在 setup 中使用props
	console.log(props.width);
})
```





##### vue3 的新特性 -- setup 特性

- 注意：最好更新到最新的 vue 和 @vue/compiler-sfc  （老师更新到了 3.2.4）
- 以后就可以直接在 script 这个标签里面写 setup 中的代码了；

```
# vue 文件内
<template></template>

<script lang='ts' setup>
// 直接写之前在setup中写的代码，省去了defineComponent
</script>
```



- 





### javascript 细节补充

##### 元素

###### 元素属性

- **data-index** 

  给元素添加 ` data-index ` 属性，即可通过 ` el.dataset.index ` 拿到其属性值；



### 虚拟节点、虚拟DOM

- vue会把我们编写的 template 先转成 VNode，再根据 VNode 渲染成真实的元素；

- template 转成 VNode ：template 代码需要通过 编译compile  转成 render 函数，然后再调用 render 函数，render 函数执行的返回值就是 VNode；

- render 函数需要返回 VNode，但是VNode不是手动创建的，这时就需要使用 h 函数， h 函数 就是用来创建 VNode的；因此，可以在 render 函数内部 通过 h 函数，并给其传递参数，来生成 VNode，然后 render 函数再将其返回；

- h 函数的来源是一个工具（hyperscript），这个工具是基于 JavaScript 编写模板的工具；
- render 函数与 h 函数之间的关系：render 函数是组件中编写的一个选项API（与计算属性等类似），它要求返回一个 VNode，因此，render 函数内部利用 h 函数给他返回一个 VNode 对象；![h 函数（1）](.\vue3-image\h 函数（1）.png)![h 函数（2）](.\vue3-image\h 函数（2）.png)

- render函数中插槽的使用

![render函数中插槽的使用](.\vue3-image\render函数中插槽的使用.png)

### JSX 的使用

- jsx 代码 本质上是通过 babel 将其转换成 h 函数![jsx的babel配置](.\vue3-image\jsx的babel配置.png)

### vue 原码

##### 虚拟 DOM 的优势

1. vNode 是一个个的JavaScript对象，便于 diff 算法的比对；
2. element 元素上有很多属性，因此 clone 拷贝 element 元素比较消耗性能；
3. 可以使用 document.createElment() 将 vNode 渲染成DOM元素；

![虚拟 DOM 的优势](.\vue3-image\虚拟 DOM 的优势.png)

##### 普通 html 元素的渲染过程

1. html 元素
2. DOM 树
3. 浏览器渲染

![普通 html 元素的渲染过程](.\vue3-image\普通 html 元素的渲染过程.png)

##### vue 虚拟DOM的渲染过程

1. 通过compiler编译器将template模板编译成render函数；
2. 调用render函数，利用render中的 h 函数生成虚拟节点 vNode；
3. 通过渲染器将 vNode 虚拟节点转成真实的元素；
4. 元素被浏览器解析，在界面展示；

![vue 虚拟DOM的渲染过程](.\vue3-image\vue 虚拟DOM的渲染过程.png)

##### vue 的三大核心系统

1. compiler 模块：编译模板系统；
2. runtime 模块：也可以称之为 renderer 模块，真正渲染的模块；
3. reactivity 模块：响应式系统；

![vue 的三大核心系统](.\vue3-image\vue 的三大核心系统.png)

###### compiler 模块：编译模板系统

- 把template代码转成render函数；有两种转换的方案：compiler + runtime 和 runtime-only ；如果使用 runtime-only 方案，要使用 vue-loader 来帮助编译，vue-loader 又依赖于 @vue/compiler-sfc 这个库，最终由这个库将 template 模板转成 render 函数，调用 render 函数返回 虚拟节点，这些虚拟节点之间可以形成一个树结构，就是 虚拟DOM，虚拟 DOM 经过挂载或者 patch 的过程，最终变成真实DOM ，然后被浏览器渲染出来；

###### runtime 模块：也可以称之为 renderer 模块，真正渲染的模块

- 执行 renderer 函数，拿到 虚拟DOM，然后把虚拟DOM挂载到真实DOM上面；

- 该模块主要包含三个功能
  - 功能一：h 函数，用于返回一个 VNode 对象；
  - 功能二：mount 函数，用于将 VNode 挂载到 DOM 上；
  - 功能三：patch 函数，用于对比两个 VNode，决定如何处理新的 VNode；

###### reactivity 模块：响应式系统

- 组件内部会依赖一些数据，例如 data() 中编写的数据、setup 中通过 ref/reactive 引用的数据；当这些数据发生改变的时候，组件会重新刷新，因此这些template会形成一些新的虚拟节点，把这些新的虚拟节点与旧虚拟节点做一个对比，这个对比的过程就是 diff 算法，diff 算法会在 patch 函数中执行，在 patch 函数中执行 diff 算法，并且把不一样的地方做DOM上的修改；

###### 三大系统协同工作

![三大系统协同工作](.\vue3-image\三大系统协同工作.png)

###### babel 就相当于是个编译器

- 读取代码，然后进行语法分析、词法分析，然后转成 AST 树；

###### vue 中的编译器

- 主要是一些正则表达式对 template 标签做一些转化；







### babel



### vscode 插件

![vscode 插件](.\vue3-image\vscode 插件.png)



### promise

##### 默认为promise

- import('xxxxx') 的返回值是一个 promise



### 增加首屏渲染速度

##### webpack的打包时分包

- 在js文件内使用 import('./xxxx').then(res => { res里面就包含了引入的该js文件内的方法 })；

##### vue自带的异步组件

- vue的异步组件实际上是达到了分包的效果

##### 路由懒加载

- 路由懒加载也达到了分包的效果

```
# router 文件内
// 配置映射关系
const routes = [
	{
		path: '/home',
		// 这里是使用了路由懒加载 以及 webpack的魔法注释（定义打包后的分包名，注意格式）
		component:() => import(/* webpackChunkName: 'home-chunk' */'./home.vue'),
	}
]
```

##### SSR

- SSR 可以做 SEO 的优化



### 浏览器插件与设置

##### chrome浏览器常用前端插件

![chrome浏览器常用前端插件](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\chrome浏览器常用前端插件.png)

##### devtool -- chrome浏览器vue项目调试工具

- 安装

  - 方式一：通过chrome商店安装

  ![chrome浏览器vue项目调试工具（1）](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\chrome浏览器vue项目调试工具（1）.png)

  - 方式二：手动下载原码，编译、安装

  ![chrome浏览器vue项目调试工具（2）](C:\Users\WLS\Desktop\自己练习\vue3\makedown文档\vue3-image\chrome浏览器vue项目调试工具（2）.png)

##### 浏览器设置

###### F12 -- Network网络

- 筛选框中通过  `-aaa bbb ccc`  表示屏蔽  接口连接中带有 `aaa`  、 `bbb`  、 `ccc`  的接口；去掉  `-`  表示搜索筛选；

### vue2 和 vue3 的区别

- vue2 用的是 options API，vue3 用的是 composition API
