### [TypeScript官网](https://www.typescriptlang.org/)

### 前言

##### JavaScript是一门优秀的语言)Script的特点

##### JavaScript的痛点

![JavaScript的痛点](.\TypeScript\JavaScript的痛点.png)

##### JavaScript类型约束上的缺陷

![JavaScript类型约束上的缺陷](.\TypeScript\JavaScript类型约束上的缺陷.png)

##### 认识TypeScript![认识TypeScript](.\TypeScript\认识TypeScript.png)

##### TypeScript的特点![TypeScript的特点](.\TypeScript\TypeScript的特点.png)

##### 采用TypeScript的优秀项目********************************************![采用TypeScript的优秀项目](.\TypeScript\采用TypeScript的优秀项目.png)

##### 大前端的发展趋势

![](.\TypeScript\大前端的发展趋势.png)



### 学习TypeScript

##### [TypeScript官网](https://www.typescriptlang.org/)

##### TypeScript 的编译环境![TypeScript 的编译环境](.\TypeScript\TypeScript 的编译环境.png)

- 全局安装 tslint

```
# 全局安装 tslint 作用与 eslint 相同，用于检查 ts 代码是否规范
npm install tslint -g

# 在项目中 执行 tslint --init 可以自动生成 tslint.json 文件，用于配置代码规范的校验
```

- 全局安装 TypeScript （TS解析器）

```
# 安装命令 - 全局安装
npm install typescript -g

# 查看版本
tsc --version

# TypeScript 编译成 JavaScript
在控制台直接运行 'tsc + 文件' 即可直接编译； 例如: tsc 01_hello_world.ts

# 监听 ts 文件的变化 自动编译更新 js 文件（只监听当前 ts 文件的变化）
控制台执行 'tsc + 文件 -w'

# 初始化一个 tsconfig.json 文件后，可直接执行 'tsc' 命令编辑所有 ts 文件；或者直接执行 'tsc -w' 命令编译并监听所有 ts 文件 
```

##### 通过 tsc + 文件 只能进行单个文件的编译 ，通过以下两个方法可以优化这一操作；

- 方法一：安装 ts-node ，然后直接在控制台执行 ` 'ts-node + 文件名' ` 可以直接运行在 node 环境上（编译 + 运行 ts代码）

  ```
  # 全局安装 ts-node
  npm install ts-node -g
  # 还需要安装两个依赖包
  npm install tslib @types/node -g
  ```

<img src=".\TypeScript\使用ts-node.png" alt="使用ts-node" style="zoom:50%;" />

- 方法二： 通过 webpack 搭建一个环境，可以自动在浏览器上运行，并且支持热替换（HMR ： hot module replace）

  ```
  # 局部安装 webpack 和 webpack-cli （webpack4 开始，都需要安装 webpack-cli）
  npm install webpack webpack-cli -D
  
  # 新建webpack配置文件webpack.config.js，并增加webpack配置
  ## 安装 ts-loader typescript 用于解析 .ts 文件
  
  # npm init -y 初始化 包管理文件 package.json
  
  # 在 package.json 文件内配置 打包命令 "build": "webpack"，然后执行 npm run build 即可打包文件；
  "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack"
  }
  
  ## error while parsing tsconfig.json 配置完 loader 后，编译时会报这个错误，要求配置 tsconfig.json 这个文件，这个文件是ts的配置文件；可以自动生成该文件；
  # 运行 tsc --init 自动生成 tsconfig.json 这个ts的配置文件；
  
  # 在webpack.config.js文件中，配置模块引入时默认匹配的后缀名，因为webpack默认不支持解析 .ts 文件
  
  # 新建一个 index.html 文件，引入 打包后的文件，即可实现手动编译、打包、运行；
  
  # 安装 webpack-dev-server 用于搭建一个本地服务，修改代码后自动打包运行
  npm install webpack-dev-server -D
  
  # 在 package.json 文件内配置 开启本地服务的命令 "serve": "webpack serve"，然后执行 npm run serve 即可开启本地，修改代码后自动打包运行；
  "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack"
  }
  
  # 配置模板
  npm install html-webpack-plugin -D
  在 webpack.config.js 文件内引入 html-webpack-plugin
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  // 配置插件
  plugins: [
      new HtmlWebpackPlugin({
          // 配置使用的模板
          template: './index.html'
      })
  ]
  
  # 执行 npm run serve ,再次修改 ts 文件内容时，就会自动重新编译并运行
  ```


<img src=".\TypeScript\TypeScript的运行环境.png" alt="TypeScript的运行环境" style="zoom: 67%;" />

##### TypeScript 语法（变量、类型）

###### 变量的声明

```
const message: string = 'hello world';
// const 关键字
// message 标识符
// string 类型注解
# 类型注解 中 string 和 String 的区别
// string：JavaScript 中的字符串类型
// String：JavaScript 中的字符串包装类的类型；类似的有 Boolean 和 boolean、Number 和 number；

const name = 'wls';
// 声明变量时不写类型注解，默认情况下会将赋值的值的类型作为前面标识符的类型，这个过程称为 类型推导/类型推断；
// 如果变量的声明和赋值是同时进行的，TS可以自动对变量进行类型检测；
```

###### TypeScript 与 JavaScript 的 包含关系 

<img src=".\TypeScript\TypeScript 与 JavaScript 的 包含关系.png" alt="TypeScript 与 JavaScript 的 包含关系" style="zoom: 50%;" />

###### TypeScript 类型 - number类型

- TypeScript 和 JavaScript 一样不区分整数类型（int）和浮点型（double），统一为 number 类型；

- ES6 新增了二进制和八进制的表示方法，TypeScript 也支持 二进制、八进制、十进制、十六进制的表示

  ```
  const num1: number = 0b100; // 二进制
  const num1: number = 0o100; // 八进制
  const num1: number = 100; // 十进制
  const num1: number = 0x100; // 十六进制
  ```

- 

###### TypeScript 类型 - Array类型

- 数组类型有两种写法，推荐写法二，写法一在 jsx 代码中会有冲突

  ```
  # 写法一：
  const names1: Array<string> = [];  // 不推荐，在 jsx 代码中会有冲突
  
  # 写法二：
  const names2: string[] = []; // 推荐
  
  # 例如
  // 定义一个 无参且返回值任意的函数类型 的别名
  type Method = () => void
  // 函数 aaa 要求接收的入参类型是 内部是 Method 类型的数组
  function aaa(aa: Method[]) {
  	aaa.forEach( item => item() )
  }
  ```
  
  

###### TypeScript 类型 - null 和 undefined

- null 类型只有一个值 null 

  ```
  const n1: null = null;
  ```

  

- undefined 类型也只有一个值 undefined

  ```
  const n2: undefined = undefined;
  ```

  

###### TypeScript 类型 - Symbol

- 应用场景一：

  ```
  const title1 = Symbol("title");
  const title2 = Symbol("title");
  
  const info = {
  	[title1]: 'wls',
  	[title2]: 'why'
  }
  ```

  

- 

###### TypeScript 类型 - any

- 如果无法确定一个变量的类型，或者可能它会发生一些变化，就可以使用 any 类型（类似于 Dart 语言中的 dynamic 类型）；

- 对于某些情况的处理过于繁琐不希望添加规定的类型注解，或者在引入一些第三方库时缺失了类型注解，可以用 any ；

- 可以对 any 类型的变量进行任何的操作，包括获取不存在的属性、方法；

- 可以给 any 类型的变量赋值任何的值；

  ```
  let a: any = 'why';
  a = 123;
  a = true;
  
  const b: any[] = ['why', 18, true];  // 不推荐，数组中最好存放 统一且确定的类型
  ```

  

- any 类型的使用场景

  - 当进行一些类型断言时，某些类型断言不能直接通过 as 进行转化，可以先把这个变量转成 any 类型，再转化为其他类型，避免报错；
  - 在不想给某些变量添加具体的数据类型时，可以给它定义为 any 类型，此时 TypeScript 和 JavaScript 代码一样了；

- 

###### TypeScript 类型 - unKnown

- unKnown 用于描述 类型不确定的变量；

- any 类型 和 unKnown 类型 的区别：

  - unKnown 类型只能赋值给 any 和 unKnown 类型；

  - any 类型可以赋值给任意类型；

    ```
    # any 类型可以赋值给任意类型
    let result: any;
    let message: string = result;
    let num: number = result;
    
    # unKnown 类型只能赋值给 any 和 unKnown 类型
    let result1: unKnown;
    let message: string = result1;  // 报错 编译不通过
    ```

    

- 

###### TypeScript 类型 - void

- void 类型用来指定 如果一个函数没有返回值，那么它的返回值就是 void 类型；

- 可以将 null 和 undefined 赋值给 void 类型，也就是函数可以返回 null 和 undefined

  ```
  # 这个函数返回值没有任何类型，那么默认它返回值的类型就是 void 的，可以写上 void ，也可以不写；
  function sum(num1: number, num2: number): void {
  	console.log(num1 + num2)
  }
  ```

  

###### TypeScript 类型 - never

- never 表示永远不会发生值的类型，例如一个函数中是一个死循环或者抛出一个异常，它就不会返回任何东西，就可以使用 never 类型；

  ```
  # 死循环
  function loopFun(): never {
  	while(true) {
  		console.log('死循环');
  	}
  }
  
  # 抛异常
  function loopErr(): never {
  	throw new Error();
  }
  ```

- never 类型的使用场景：

  ```
  function handMessage(message: string | number) {
  	switch (typeof message) {
  		case 'string':
  			console.log('string')
  			break
  		case 'number':
  			console.log('number')
  			break
  		default:
  			const check: never = message
  	}
  }
  handMessage('abc') // 正常执行
  handMessage(123)   // 正常执行
  handMessage(true)  // 编译错误
  
  原因分析：
  1、第一层拦截：handMessage 方法允许接收 string 和 number 类型的参数，传一个 boolean 类型会报错；
  2、第二层拦截：如果手动在 handMessage 后面加上 boolean 类型，执行 default 语句中的 const check: never = message 会报错，因为 never 类型是永远不能执行的，这样可以避免在修改原方法时，修改不完整的问题；
  ```

  

- 

###### TypeScript 类型 - tuple （元组）

- tuple 元组类型，多种元素的组合，元组类型可以确定其内部每个元素都是什么类型，而且以比较简洁的形式呈现；

  ```
  const myInfo: [string, number, number] = ['wls', 18, 188];
  const item = myInfo[0];  // 'wls' 字符串类型 
  ```

- 使用场景

  - tuple 通常作为函数的返回值；

  ```
  # 定义一个方法，返回 初始值 以及 改变这个初始值的方法（返回一个 元组类型）
  function useState(state: any) {
  	let currentState = state;
  	const changeState = (newState: any) =>{
  		currentState = newState;
  	}
  	// any 是 currentState 的类型，(newState: any) => void 是 changeState 这个方法的类型；
  	const tuple: [any, (newState: any) => void] = [currentState, changeState];
  	return tuple;
  }
  
  // 从元组中取出 初始值 以及 改变初始值的方法；此时 counter 的数据类型是 any ；
  const [counter, setCounter] = useState(10);
  setCounter(100);  // 调用返回的方法，修改初始值 10 ；
  
  # 优化 用 泛型 优化该方法
  // <T> 泛型
  // [T, (newState: T) => void] 返回值类型
  function useState<T>(state: T): [T, (newState: T) => void] {
  	let currentState = state;
  	const changeState = (newState: T) =>{
  		currentState = newState;
  	}
  	// T 是 泛型，(newState: T) => void 是 changeState 这个方法的类型；
  	const tuple: [T, (newState: T) => void] = [currentState, changeState];
  	return tuple;
  }
  // 从元组中取出 初始值 以及 改变初始值的方法；此时 counter 的类型是 number ；
  const [counter, setCounter] = useState(10);
  setCounter(100);  // 调用返回的方法，修改初始值 10 ；
  ```

  

- 

###### TypeScript 类型 - 函数的参数 以及 返回值类型

- 参数添加注解后，会限制传参的类型以及数量；

- 返回值的注解可以不写，会默认按照返回值进行推导；

  ```
  function sum(num1: number, num2: number): number {
  	return num1 + num2;
  }
  sum(1, 2);
  ```

- 

###### TypeScript 类型 - object

- 对象类型，属性之间可以用 分号 或者 逗号 分隔，最后一个分隔符是可选的（可以省略）

  ```
  // {x: number, y: number} 对象类型，中间可以用 分号 或者 逗号 分隔；
  function printPoint(point: {x: number, y: number}) {
  	console.log(point.x);
  }
  printPoint({x: 123, y: 456});
  ```

- 对象类型可以指定那些是可选的，可以在属性的后面添加一个   `  ?:  `    ;

- 每个属性的类型部分也是可选的，如果不指定就是 any 类型；

###### TypeScript 类型 - 可选类型

- 可选类型的参数必须放在最后面；

- 可选类型，可以有也可以没有该参数，如果没有传，就为 undefined ；

- **可选类型就是 undefined 和 当前类型 的联合类型；**

  ```
  // {x: number, y: number, z?: number} 对象类型，第三个参数 z 为可选类型
  function printPoint(point: {x: number, y: number, z?: number}) {
  	console.log(point.x);
  	console.log(point.y);
  	console.log(point.z);  // undefined;
  }
  printPoint({x: 123, y: 456});
  ```

  

###### TypeScript 类型 - 联合类型

- TypeScript 的类型系统允许我们使用多种运算符，从现有类型中构建新类型；

- 联合类型：

  - 联合类型是由两个或多个其他类型组成的类型；
  - 表示可以是这些类型中的任意一个值；
  - 联合类型中的每一个类型被称之为联合成员；

  ```
  // number | string 联合类型
  function printID(id: number | string) {
  	console.log(id);
  }
  printID(123);
  printID('456');
  ```

  

###### TypeScript 类型 - 类型别名（一般大驼峰）

- type 用于定义类型别名（type alias）

  ```
  type IdType = string | number | boolean;
  type PointType = {
  	x: number,
  	y: number,
  	z?:number,
  }
  
  function printId(id: IdType) {
  	xxx
  }
  function printPoint(point: PointType) {
  	xxx
  }
  ```

  

###### TypeScript 类型 - 类型断言 as 

- 通过类型断言，把一个相对来说比较宽泛的类型，转成一个比较具体的类型，或者转化成更加宽泛的类型（any 和 unKnown）；

  ```
  // 实例一：
  # 元素类型默认是 HTMLElement ，是一个宽泛的元素类型，其下没有 src 属性，需要用断言将其转换成 HTMLImageElement 类型；
  const el = document.getElementById('wls') as HTMLImageElement;
  el.src = 'www.baidu.com';
  ```

  ```
  // 实例二：
  # 定义一个 Person 类 -- es6
  calss Person {
  	eat() {},
  }
  
  # 定义一个 Student 类 继承自 Person 类
  class Student extends Person {
  	studying() {},
  }
  
  # 定义一个方法，要求接收一个为 Person类 的类型的参数
  function sayHello(p: Person) {
  	# p 是 Student 的实例，同时也属于 Person类 ，但是这里默认p是Person类，不可以直接调用 Student 类 中的方法，如果想调用，需要做一次 断言，具体 p 的类型；
  	(p as Student).studying();
  }
  
  # new 一个 Student 的实例
  const stu = new Student();
  # 将 Student 的实例传入 sayHello 方法
  sayHello(stu);
  ```

  ```
  // 实例三：
  # 这种确定是什么类型的可以不加 数据类型，系统会默认进行类型推导；（一般在开发中都不加）
  const message = 'Hello World';
  # 如果想把一个 string 类型赋值给一个 number 类型的变量，可以做两次断言，先转化成 any 或者 unKnown 类型，在转化成number类型；（但是开发中不建议这么做）
  const num: number = (message as unKnow) as number;
  
  const num: number = (message as any) as number;
  ```

  

###### TypeScript 类型 - 非空类型断言 ！

- 在可能为空的变量后面加 ！ ，就表示该变量肯定有值；避免编译不通过；**（实际上如果变量没有值，会通过编译阶段，但是在运行时还是会报错）**

  ```
  # message?: string  ===  undefined | string
  function printMessageLength(message?: string) {
  	// 方法一：
  	if (message) {
  		console.log(message.length);
  	}
  	// 方法二：
  	# message! 中的 ！ 能保证 message 肯定有值；
  	console.log(message!.length);
  }
  printMessageLength();
  printMessageLength('aaa');
  ```

  

###### ECMA2020（ES11）中的特性：可选链  ?.  

- 作用：当对象的属性不存在时，会短路，直接返回 undefined ，后面不执行，如果存在，才会继续执行；

- ECMA2020（ES11）中的特性：??  和  !!   

  - !!  操作符：将一个其他类型转换成 boolean 类型，类似于 Boolean(变量)；
  - ??  操作符：空值合并操作符，是一个逻辑操作符，当操作符的左侧是 null 或者 undefined 时，返回其右侧操作值，否则返回左侧操作值（与 || 相似，但是 ?? 更专业，|| 只是恰巧可以使用）
  - 

###### TypeScript 类型 - 字面量类型

- 字符串、数字等都可以作为数据类型，叫做字面量类型，但是**字面量类型的变量的值必须和字面量保持一致**；

  ```
  # 'wls' 也是可以作为数据类型的，叫做字面量类型；
  let message: 'wls' = 'wls';
  message = 'why';  // 编译不通过，字面量类型的变量的值必须和字面量保持一致；
  ```

- 字面量类型的意义，就是必须结合联合类型使用

  ```
  let align: 'left' | 'right' | 'center' = 'left';
  align = 'right';
  align = 'hhhh';  // 编译不通过
  ```

  

- 

###### TypeScript 类型 - 字面量推理  as const

- 给变量或者对象加上字面量推理 `  as const  ` 后，该变量或者对象中的属性就会变成只读的  ` readonly ` 类，是不能修改的；

  ```
  # 定义类型别名
  type Method = 'GET' | 'POST';
  function request(url: string, method: Method) {
  	xxx
  }
  const options = {
  	url: 'xxxx',
  	method: 'POST',
  }
  # request 的第二个参数要求是一个 Method 类型，但是 options.method 目前是一个 string 类型（可以修改为其他字符串），因此编译不通过；
  request(options.url, options.method);
  
  # 解决方法一： 在 options 对象后面加上 字面量推理 as const，然后 options 里面的属性就变成了 readonly 只读的属性了；
  const options = {
  	url: 'xxxx',
  	method: 'POST',
  } as const
  
  # 解决方法二： 在 options.method 后面加上断言 as Method，自己确定它就是 Method 类型的变量，编译就可以通过了，但是是否能运行成功，还是在于 options.method 是不是 Method 类型的变量；
  
  request(options.url, options.method as Method);
  
  # 解决方法三： 给 options 限制对象类型
  type Request = {
  	url: string,
  	method: Method,
  }
  const options: Reauest = {
  	url: 'xxxx',
  	method: 'POST',
  }
  ```
  
  

###### TypeScript 类型 - 类型缩小

- 常见的有四种：typeof、 平等缩小（===、==、!==、!=、switch  case）、instanceof 、in ；

  ```
  # 1、 typeof 、 ===
  type IDType = number | string
  function printID(id: IDType) {
  	if (typeof id === 'string') { xxx }
  }
  
  # 2、 instanceof 判断一个变量是不是另一个变量的实例
  class Student() {}
  class Teacher() {}
  function work(person: Student | Teacher) {
  	if (person instanceof Student) {}
  }
  
  # 3、 in 判断对象中是否有某个属性，如果指定的属性在指定的对象或其原型链中，则 in 运算符返回 true
  // 定义一个对象的类型别名
  type Fish = {
  	// () => void 是一个函数的类型别名，表示一个 无参数、无返回值的函数类型
  	swimming: () => void
  }
  type Dog = {
  	Running: () => void
  }
  function walk(animal: Fish | Dog) {
  	if ('swimming' in animal) {}
  }
  ```

  

###### TypeScript 类型 - 函数类型

- **返回值类型如果写成 void ，表示可以返回任意数据类型的值；**

- 无参数、返回值任意类型（默认返回 undefined）

  ```
  # 函数调用时
  function foo() { xxx };
  type FooFnType = () => void;
  function bar(fn: FooFnType) {
  	fn();
  }
  bar(foo);
  ```

- 有参数、返回 number 类型的值；

  ```
  # 函数声明时
  type AddFnType = (n1: number, n2: number) => number; // 返回值类型也可以写成 void
  const add: AddFnType = (a1: number, a2: number) => {
  	return a1 + a2;
  }
  ```

  

- 

###### TypeScript 类型 - 函数的剩余参数

- 如果一个方法想要接收 任意多个 类型相同的值，可以使用 函数的剩余参数；

  ```
  # sum 方法可以接收任意多个数字
  function sum(...nums: number[]) {
  	
  }
  ```

  

###### TypeScript 类型 - 函数的重载

- 函数的名称相同，但是参数不同的几个函数，就是函数的重载；

- 如果**写了函数的重载，该函数被调用时就必须匹配上面定义的重载函数**，否则编译不通过；

  ```
  # 函数类型的声明和函数类型的实现（函数体）分开了，
  # 只定义函数名及参数，不定义函数体；
  function add(num1: number, num2: number): number; // 定义函数名、参数及参数类型、返回值类型，不定义函数体；
  function add(num1: string, num2: string): string;
  
  # 定义完整实现函数（这个函数只是为了上面的重载函数提供 函数体，这个函数不能被调用）
  function add(num1: any, num2: any): any {
  	return num1 + num2;
  }
  
  # 调用函数，调用函数时会从上到下依次去匹配add函数，如果匹配到了，就执行相同名字的完整实现函数的函数体；
  add(1 + 2);  // 3
  add('a' + 'b'); // 'ab'
  add(1 + 'a'); // 编译不通过，没有匹配的重载函数
  ```

  

TypeScript 类型 - 类 与 类型

- 类的实例  的  类型  就是  这个类

  ```
  class Person {
  	name: string = 'wls'
  }
  
  const wls = new Person();  // 此时 wls 这个变量的类型默认就是 Person类；
  ```

  

###### TypeScript 类型 - 类的类型

- 类也可以当做一种类型（相当于一个对象），比如，某些方法要求传递一个 类型为类 的一个参数，这时可以传递一个类，也可以传递一个与类相似的对象；

  ```
  class Person {
    name: string = '123'
    eating() {}
  }
  
  // 要求传入一个 Person类 的类型的参数
  function printPerson(p: Person) {
    console.log(p.name)
  }
  
  // 正常传参
  printPerson(new Person());  // '123
  // 也可以传入一个与Person类相似的对象
  printPerson({name: 'kobe', eating: function() {}});  // 'kobe
  ```


###### Promise 也有类型

```
# 泛型
new Promise<string>((resolve, reject) => {
	// resolve 和 reject 接收一个string类型；
	resolve('str')
}).then(res => {
	// res 的类型跟 resolve 接收的类型一致；
	console.log(res.length)
})
```

##### TypeScript 类型转换 keyof 和 typeof 

- keyof 见名知其意，就是获取对象所有的key，然后返回一个新的联合类型；**作用：** 获取类，对象，接口的所有属性名组成的 **联合类型**

```
# 举例1：
type Point = { x: number; y: number };
type P = keyof Point;
type SPoint = {[K in P]:string}; // type SPoint = { x: string; y: string }

# 举例2：
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // type A = number;

# 举例3：
type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // type M = string | number

# 举例4：
const a = {
    a: 1,
    b: 2,
};
keyof typeof a; // 'a' | 'b'

# 举例5：
class A {
    c: number;
    d: number;
}
keyof A; // 'c' | 'd'
复制代码
```

- typeof可以获取对象类型；

  - JS中的typeof：在运行时判断类型

  - TS中的typeof：在编译时获取类型



##### TypeScript 语法（ class 类 ）

- 类的使用

  - 编程范式：面向对象编程 和 函数式编程；
  - 类的四大特性：抽象、封装、继承、多态

  ![类的使用](.\TypeScript\类的使用.png)

  - 

###### 类里面的属性需要做初始化

- 1、在类里面给属性做初始化；

  ```
  class Person {
    name: string = 'wls'
    age: number = 20
  
    eating() {
      console.log(this.name + 'eating')
    }
  }
  
  const p = new Person();
  console.log(p.name);
  console.log(p.age);
  p.eating();
  ```

  

- 2、在constructor构造器里面要求传递对应的属性

  ```
  class Student {
    name: string
    age: number
  
    constructor(name: string, age: number) {
      this.name = name
      this.age = age
    }
  
    eating() {
      console.log(this.name + 'eating')
    }
  }
  
  const s = new Student('why', 18);
  console.log(s.name);
  console.log(s.age);
  s.eating();
  ```

  

###### 类的继承

- 写法一：直接在定义类时给属性赋值

  ```
  class Person {
    name: string = ''
    age: number = 10
  
    eating() {
      console.log('eating')
    }
  }
  
  class Student extends Person {
    sno: number = 101
  
    studying() {
      console.log('studying')
    }
  }
  
  class Teacher extends Person {
    title: string = ''
  
    teaching() {
      console.log('teaching')
    }
  }
  
  const stu = new Student()
  stu.name = 'wls'
  console.log(stu.name)  // wls
  console.log(stu.age)  // 10
  stu.eating()  // eating
  
  export {}
  ```

  

- 写法二：通过 构造器 constructor 和 super 给 父类 和 子类 赋值

  ```
  class Person {
    name: string
    age: number
  
    constructor(name: string, age: number) {
      this.name = name
      this.age = age
    }
  
    eating() {
      console.log('person eating')
    }
  }
  
  class Student extends Person {
    // 类里面的属性的类型也可以是 可选的（表示赋值为 number | undefined 类型的值均可）
    sno?: number
  
    constructor(name: string, age: number, sno?: number) {
      // 利用 super 调用父类的 constructor 构造器，给父类里面的属性赋值
      super(name, age)
      this.sno = sno
    }
  
    eating() {
      // 利用 super 调用父类中的方法
      super.eating()
      console.log('student eating')
    }
  }
  
  const stu = new Student('wls', 10)
  stu.name = 'wls'
  console.log(stu.name)  // wls
  console.log(stu.age)  // 10
  console.log(stu.sno)  // undefined
  stu.eating()  // eating
  
  export {}
  ```

  

###### 类的多态

- 多态的目的是为了写出更加具备通用性的代码

  ```
  class Animal {
    action() {
      console.log('animal running')
    }
  }
  
  class Dog extends Animal {
    action() {
      console.log('dog running')
    }
  }
  
  class Fish extends Animal {
    action() {
      console.log('fish swimming')
    }
  }
  
  // animals: Animal[]  内部属性类型为 Animal 的数组
  // 多态的目的是为了写出更加具备通用性的代码
  function makeActions(animals: Animal[]) {
    animals.forEach(animal => {
      animal.action()
    })
  }
  // new Dog() 的类型 是 Dog类， 同时也是 Animal类
  makeActions([new Dog(), new Fish()])
  ```




###### 类 的成员修饰符

- 在 TypeScript 中，类的属性和方法支持三种修饰符： public 、 private 、 protected  ；

  - public 修饰是在任何地方可见、公有的属性或方法，默认编写的属性就是 public 的；

  - private 修饰的属性和方法，只能在这个类的内部才能访问，其 实例 和 子类 中均不能访问，但是可以通过 这个类 内部封装的方法来获取或改变该属性；

    ```
    class Person {
    	private name: string = ''
    	
    	// 封装方法来访问 name
    	getName() {
    		return this.name
    	}
    	// 封装方法来修改 name
    	setName(newName) {
    		this.name = newName
    	}
    }
    const p = new Person()
    p.setName('why')
    p.name;   // 编译不通过
    ```

    

  - protected 修饰的属性或方法，只能在这个类和其子类内部访问，也是只能通过其内部或其子类内部内部封装的方法来获取或改变该属性；

    ```
    # 利用构造器给属性赋值
    class Person {
    	protected name: string
    	constructor(name: string) {
    		this.name = name;
    	}
    }
    
    class Student extends Person {
    	constructor(name: string) {
    		super(name)
    	}
    	
    	getName() {
    		return this.name
    	}
    }
    
    const stu = new Student('wls');
    console.log(stu.getName());
    ```

    ```
    # 给类中的属性直接赋初始值
    class Person {
    	protected name: string = 'wls'
    }
    
    class Student extends Person {
    	getName() {
    		return this.name
    	}
    }
    
    const stu = new Student();
    console.log(stu.getName());
    ```

    

###### 类的只读属性 readonly

- 只读属性是可以在构造器或者直接赋初始值的，但是赋值之后不可以再次修改；

- 只读属性本身不能被修改，但是，如果它是引用类型，其内部的属性是可以被修改的；（类似于 const 定义引用类型）

  ```
  class Person {
  	readonly name: string
  	age?: number
  	readonly friend?: Person
  	 
  	constructor(name: string, friend?: Person) {
  		this.name = name
  		this.friend = friend
  	}
  }
  
  const p = new Person('wls', new Person('why'));
  console.log(p.name);  // 'wls'
  console.log(p.friend);  // { name: 'why', friend: undefined }
  
  // 不可以直接修改 p.friend ,因为是 只读 属性
  p.friend = new Person('james');
  // 但是可以修改只读属性内部的属性
  if (p.friend) {
  	p.friend.age = 18
  }
  
  // 类似于 const 
  const obj = { name: 'www', age: 18 };
  obj.age = 20
  ```



###### 访问器 setter / getter

- 修改或访问类内部的 private  修饰的属性时，一般不用自定义的方法，一般用访问器 getter /  setter，通过其实例可以直接访问和修改

  ```
  class Person {
  	private _name: string
  	constructor(name: string) {
  		this._name = name
  	}
  	
  	set name(newName) {
  		this._name = newName
  		
  	}
  	get name() {
  		return this._name
  	}
  }
  
  const p = new Person('wls');
  // 通过访问器 setter 可以直接修改类内部通过 private 修饰的属性
  p.name = 'why';
  // 通过访问器 getter 可以直接访问类内部通过 private 修饰的属性
  console.log(p.name);
  
  ```

  

- 

###### 类的静态成员  static 

- 类的静态成员：一般是不用通过 new 一个实例，而是直接通过 类名 直接访问到的属性或方法；

  ```
  class Student {
  	static time: string = '08:00'
  	
  	static attend() {
  		console.log('study~')
  	}
  }
  
  console.log(Student.time);  // '08:00'
  Student.attend();  // 'study~'
  ```

  

- 

###### 抽象类 abstract

- 继承是多态的前提，所以在定义很多通用的调用接口时，我们通常会让调用者传入父类，通过多态来实现更加灵活的调用方式，但是，父类本身可能并不需要对某些方法进行具体的实现，所以父类中定义的方法，我们可以定义为抽象方法；

- 自己理解：**对于有些父类中的需要定义的函数，但是不能有实现体的函数，我们一般把这种函数定义为抽象函数，抽象函数是可以没有函数体的，同时，抽象函数必须写在抽象类里面，抽象类不能被实例化，抽象类中的抽象方法必须被子类实现（重写）**；

- **继承时，子类的constructor构造器中必须要调用 super() ，无论父类中有没有属性；**

- 抽象类中可以定义抽象方法和抽象属性；

- 在 TypeScript 中没有具体实现的方法（没有方法体），就是抽象方法，抽象方法必须存在于抽象类中，抽象类是使用 abstract 声明的类；

  ```
  // 定义抽象类，抽象类不能被实例化
  abstract class Shape {
    // 对于有些父类中的需要定义的函数，但是又不能有实现体的函数，我们一般把这种函数定义为抽象函数
    // 定义抽象函数，抽象函数只能定义在抽象类，抽象函数是可以没有函数体的
    abstract getArea(): number;
  }
  
  class Rectangle extends Shape {
    private width: number
    private height: number
  
    constructor(width: number, height: number) {
      // 继承时，子类的constructor构造器中必须要调用 super() ，无论父类中有没有属性
      super()
      this.width = width
      this.height = height
    }
  
    // 抽象类中的抽象方法必须被子类实现（重写）
    getArea() {
      return this.width * this.height
    }
  }
  
  class Circle extends Shape {
    private r: number
  
    constructor(r: number) {
      super()
      this.r = r
    }
  
    getArea () {
      return this.r * this.r * 3.14
    }
  }
  
  const rectangle = new Rectangle(20, 30);
  const circle = new Circle(10);
  
  function makeArea(shape: Shape) {
    return shape.getArea();
  }
  
  console.log(makeArea(rectangle))
  console.log(makeArea(circle))
  // makeArea(new Shape()); // 编译报错，抽象类不能被实例化
  ```

  

##### TypeScript 语法（接口 interface）

- 接口可以作为一种类型来定义变量；

###### 接口 用于声明对象类型

- 声明一个对象类型可以用 type 别名 ，也可以用 接口，接口声明中也可以定义可选类型、只读属性等；

- 类似于 class 定义类名；

  ```
  // 方法一：type 定义别名
  // type InfoType = {
  //   readonly name: string,
  //   age: number,
  //   friend?: {
  //     name: string
  //   }
  // }
  
  // 方法二：接口 声明对象类型（类似于 class 创建类，类也是一种类型）
  interface InfoType {
    readonly name: string
    age: number
    friend?: {
      name: string
    }
  }
  
  const info: InfoType = {
    name: 'wls',
    age: 20,
    friend: {
      name: 'kobe'
    }
  }
  
  // info.name = '999';  // 只读属性不能被修改，注意与类中的只读属性做区分
  info.age = 30;
  console.log(info.friend?.name);  // 'kobe'
  ```

  

###### 接口 用于定义索引类型

- 可以用接口来定义 对象的 **属性以及属性值** 的类型

  ```
  // 通过 interface 接口来定义索引类型
  interface IndexLanguage {
    [index: number]: string
  }
  
  // 对象指定索引类型之后，对象的 属性及属性值 的类型就必须统一
  const frontLanguage: IndexLanguage = {
    0: 'HTML',
    1: 'css',
    2: 'JavaScript',
    3: 'vue',
    // 'aa': 'aa', // 编译报错
  }
  ```




###### 接口 函数的类型

- 用接口定义函数类型

  ```
  interface IFly {
    flying: () => void
  }
  ```

  



###### 接口的继承

- 接口可以实现多继承，相当于把多个接口合并在一起；**使用多继承的接口作为类型时，需要实现每个接口中定义的属性和方法；**

  ```
  interface ISwim {
    swimmin: () => void
  }
  
  interface IFly {
    flying: () => void
  }
  
  // 接口可以实现多继承，相当于把多个接口合并到一起
  interface IAction extends ISwim, IFly {
  
  }
  
  // 使用多继承的接口作为类型时，需要实现每个接口中的属性和方法
  const action: IAction = {
    swimmin () {
      
    },
    flying () {
      
    },
  }
  ```

  

- 



###### 接口 交叉类型

- 交叉类型也属于组合类型的一种，联合类型也属于组合类型；

  ```
  // 交叉类型
  type WType = number & string  // 这样定义接口是有问题的，这样定义的是一个 never 类型，永远不会用到
  
  // const str1: WType = 123;  // 编译报错，因为 WType 是 never 类型
  // const str2: WType = '456';  // 编译报错，因为 WType 是 never 类型
  
  // 交叉类型  正确示范
  interface ISwim {
    swimming: () => void
  }
  
  interface IFly {
    flying: () => void
  }
  
  type MyType1 = ISwim | IFly
  type MyType2 = ISwim & IFly
  
  const obj1: MyType1 = {
    flying() {}
  }
  
  const obj2: MyType2 = {
    swimming () {},
    flying () {}
  }
  
  export {}
  ```

  

###### 接口的实现 implements 

- implements：由类实现接口，一个类可以实现多个接口；extends: 类的继承，只能是单继承；

- 注：**接口可以继承接口，类可以实现接口，而且可以同时实现多个接口；**

  ```
  // 定义 ISwim 接口
  interface ISwim {
    swimming: () => void
  }
  // 定义 IEat 接口
  interface IEat {
    eating: () => void
  }
  
  class Animal {
  
  }
  
  /**
   * extends: 类的继承，只能是单继承；（这个例子中只是用于对比，没有实际意义）
   * implements：由类实现接口，一个类可以实现多个接口；
   */
  class Fish extends Animal implements ISwim, IEat {
    // 实现 ISwim 接口
    swimming() {
      console.log('swim')
    }
  
    // 实现 IEat 接口
    eating() {
      console.log('eat')
    }
  }
  
  // 定义一个类似于 ISwim接口 的 类
  class Person {
    swimming() {
      console.log('person')
    }
  }
  
  // swimActions 方法接收一个类型为 ISwim接口 的参数，同样也可以接收一个 相似于 ISwim接口 的 类或对象 ；
  // 所有实现了接口的类对应的对象，都是可以传入的；
  // 面向接口编程（使用场景：可以编写一些公共的API）；
  function swimActions(swimAble: ISwim) {
    swimAble.swimming()
  }
  
  swimActions(new Fish());  // 'swim'
  swimActions(new Person());  // 'person'
  swimActions({ swimming: () => { console.log(1) } });  // 1
  ```

  

- 面向接口开发：如果一个类实现了这个接口，那么以后要求需要传入这个接口的地方（比如函数的形参），都可以将这个类传入；



###### interface 和 type 的区别

- 如果定义对象类型，interface 可以重复定义，如果名字相同就合并为一个接口；而type定义的是别名，别名是不能重复的；官方推荐用 interface 定义对象类型；
- 如果定义非对象类型，推荐使用 type；



###### 字面量赋值  （注意：字面量推导出的类型与定义的类型不一致时的处理方法）

- 初始化一个变量时，可以通过属性值（字面量）来直接推导出该变量的类型，如果定义该变量的类型与系统默认推导出的类型不一致，就会出现编译不通过；

- 解决方案：给该变量赋值前，可以先给定义一个常量，把值先赋值给这个常量，然后把这个常量的引用再赋值给该变量；

- 原理：把常量的引用赋值给该变量后，系统会默认做一个 **freshness 擦除** 的操作，就是，当把常量的引用赋值给该变量后，它会跟定义该变量的类型做一个对比，然后去除掉多余的属性，如果满足当前定义的类型，就编译通过；

- 使用场景：

  ```
  # 场景一
  interface IPerson {
    name: string
    age: number
  }
  
  // 编译正常
  // const p: IPerson = {
  //   name: 'wls',
  //   age: 18,
  // }
  
  // 编译失败
  // 原因：初始化变量p时，可以通过p的属性值（字面量）来直接推导出p的类型，
  //       如果定义该变量的类型IPerson与系统默认推导出的类型不一致，就会出现编译不通过；
  // const p: IPerson = {
  //   name: 'wls',
  //   age: 18,
  //   friend: 'kobe',
  // }
  
  
  // 编译正常
  // 解决方案：给p变量赋值前，可以先给定义一个常量Pinfo，把值先赋值给Pinfo，然后把Pinfo的引用Pinfo再赋值给p；
  // 原理：把常量Pinfo的引用Pinfo赋值给p后，系统会默认做一个 freshness 擦除 的操作，
  //      就是，当把常量的引用Pinfo赋值给p后，它会跟定义p的类型IPerson做一个对比，
  //      然后去除掉多余的属性 friend: 'kobe'(不是真正的去掉，不修改原对象中的值)，
  //      如果满足当前定义的类型IPerson，就编译通过；
  const Pinfo = {
    name: 'wls',
    age: 18,
    friend: 'kobe',
  }
  const p: IPerson = Pinfo;
  ```

  ```
  # 场景二：方法接收一个对象的参数，但是该方法只处理这个对象中的一部分属性；
  interface IPerson {
    name: string
    age: number
  }
  
  function printInfo(person: IPerson) {
    console.log(person.name);
    // console.log(person.friend); // 永远都是 编译不通过，因为在类型检测的时候，默认只有 IPerson 类型中的属性可以通过编译
  }
  
  // 编译失败
  // printInfo({
  //   name: 'wls',
  //   age: 18,
  //   friend: 'kobe',
  // })
  
  // 编译成功
  const Pinfo2 = {
    name: 'wls',
    age: 18,
    friend: 'kobe',
  }
  printInfo(Pinfo2)
  ```

  

##### TypeScript（枚举类型）

- 枚举就是将一组可能出现的值，一个个列举出来，定义在一个类型中，这个类型就是枚举类型；

- 枚举允许开发者定义一组命名常量，常量可以是数字、字符串类型；

- 枚举也可以作为一种数据类型;

  ```
  // 枚举类型的值一般用大写
  // 看起来这些属性是一些标识的常量，但本质上他们是一些数字常量，默认从 0 开始；也可以给他们设置值，后面的默认依次加一；当然也可以赋值为字符串；
  enum Direction {
    LEFT = 100,
    RIGHT,
  }
  
  function turnDirection(direction: Direction) {
    switch(direction) {
      case Direction.LEFT:
        console.log('Direction.LEFT: ' + Direction.LEFT);  // Direction.LEFT: 100
        break;
      case Direction.RIGHT:
        console.log('Direction.RIGHT: ' + Direction.RIGHT);  // Direction.RIGHT: 101
        break;
      default:
        // never 类型永远不会执行，可以防止代码出错
        const foo: never = direction;
        break;
    }
  }
  
  turnDirection(Direction.LEFT);
  turnDirection(Direction.RIGHT);
  ```

  

##### TypeScript（泛型）

###### 类型的参数化

- 在定义某些函数时，我们不决定这些参数的类型，而是让调用者以参数的形式告知该函数参数应该是什么类型；

- 类型变量，作用于类型，而不是值，可以通过两种方式调用它：

  - 方式一：通过  ` <类型> `  的方式将类型传递给函数；
  - 方式二：通过类型推导，自动推导出我们传入的变量的类型（默认推导出字面量类型）；

  ```
  function sum<Type>(num: Type): Type {
    return num
  }
  
  // 方式一：<类型> 明确的传入类型
  sum<number>(20);
  sum<{name: string}>({name: 'wls'});
  sum<string[]>(['abc']);
  
  // 方式二：类型推导（默认推导出字面量类型）
  sum(60);
  ```

  

- 

###### 泛型可以接收多个类型参数

- 在开发中常用的一些名称（可以自己起名，比如）：

  - T：Type 的缩写，类型；
  - K、V：key 和 value 的缩写，键值对；
  - E：Element 的缩写，元素；
  - O：Object 的缩写，对象；

  ```
  // ...arg 剩余参数
  function foo<T, E>(arg1: T, arg2: E, ...arg: T[]) {
  
  }
  
  foo<number, string>(10, 'abc', 1, 60,);
  ```

  

###### 泛型接口的使用

- 在 接口 后面 加上 <string,  number> 给接口设置传递或接收的参数类型

  ```
  // 写法一：
  // <T1, T2> 接口 IPerson 接收类型参数
  interface IPerson<T1, T2> {
    name: T1,
    age: T2
  }
  
  // <string, number> 给接口 IPerson 传递类型参数
  const p: IPerson<string, number> = {
    name: 'wls',
    age: 18
  }
  
  // 写法二：
  // 也可以给 接口 IPerson 设置默认接收类型参数
  interface IPerson2<T1 = string, T2 = number> {
    name: T1,
    age: T2
  }
  
  // 接口 IPerson 的参数设置了默认接收类型，就不需要传递参数类型
  const p2: IPerson2 = {
    name: 'wls',
    age: 18
  }
  ```

  

###### 泛型类的使用

- 泛型类的三种使用方式：

  - 方法一：不写类型，默认类型推导；
  - 方法二：new 一个类的实例的时候在类后面加上泛型；  new 相当于 调用了 这个类的 constructor构造器方法；
  - 方法三：声明变量时直接用泛型指定 变量的类型；

  ```
  class Point<T> {
    x: T
    y: T
    z: T
  
    constructor(x:T, y: T, z: T) {
      this.x = x
      this.y = y
      this.z = z
    }
  }
  
  // 方法一：不写类型，默认类型推导；
  const p1 = new Point('1.1', '2.3', '5.5');
  
  // 方法二：new 一个类的实例的时候在类后面加上泛型；  new 相当于 调用了 Point 这个类的 constructor构造器方法；
  const p2 = new Point<string>('1.1', '2.3', '5.5');
  
  // 方法三：声明变量时直接用泛型指定 变量的类型；
  const p3: Point<string> = new Point('1.1', '2.3', '5.5');
  
  export {}
  ```

  

###### 泛型的类型约束

- 类型约束，一般是用 extends 继承某个接口或者类，在这个接口或类中定义约束的变量和变量的类型；

  ```
  // 定义约束的变量及变量的类型
  interface ILength {
    length: number
  }
  
  // <T extends ILength> 类型约束，一般是用 extends 继承某个接口或者类，在这个接口或类中定义约束的变量和变量的类型；
  // <T extends ILength> 要求有 length 属性，且属性值为数字
  function getLength<T extends ILength>(arg: T) {
    return arg.length
  }
  
  // getLength(123);  // 编译不通过
  getLength('456');
  getLength([1,2,3]);
  getLength({length: 100});
  ```
  
  

##### TypeScript 的模块化开发

###### TypeScript支持两种方式来控制我们的作用域：

- 模块化：每个文件是一个独立的模块，支持 ES Module，也支持 CommonJS；

- 命名空间：通过 namespace 来声明一个命名空间；命名空间在 TypeScript 早期时，称之为内部模块，主要目的是将一个模块内部再进行作用域的划分，防止一些命名冲突的问题；不同的区域也可以定义相同的方法名，命名空间也需要做 export 导出操作，在其他文件内引用后，通过 time.format() 调用；命名空间内也可以定义其他属性或方法，如果这些属性和方法没有进行 export 导出，则这些属性和方法只能在这个命名空间内部使用；

  ```
  // 单独的模块内（模块化开发）
  // 模块内也可以利用命名空间来划分区域；
  // 不同的区域也可以定义重名的方法名；
  // 命名空间也需要做 export 导出操作，在其他文件内引用后，通过 time.format() 调用；
  export namespace time {
    export function format(time: string) {
      return '2022-02-22'
    }
  
    // 命名空间内也可以定义其他属性或方法，如果这些属性和方法没有进行 export ，
    // 则这些属性和方法只能在这个命名空间内部使用；
    function foo() {}
  
    let name: string = 'abc'
  }
  
  // 同一个模块内定义另一个命名空间
  export namespace price {
    export function format(price: number) {
      return '￥99.99'
    }
  }
  ```

  

- 

###### 类型的查找

-  `  .ts  `  文件最终会被编译成  `  .js  `   文件；

-   `  .d.ts  `   文件是用来做类型声明的，用来做类型检测，告知 TypeScript 有哪些类型；很多库的类型声明文件 不在他本身的库内，而是统一放在GitHub中统一维护，因此安装某些包时，不仅要安装本身的包，还要安装 GitHub中的类型声明文件；

- 类型声明文件有三种：

  - 内置类型声明；
  - 外部定义类型声明；（第三方库）
  - 自己定义类型声明；

  ![类型的查找](.\TypeScript\类型的查找.png)

- 内置类型声明

  - 内置类型声明是 TypeScript 自带的，帮助我们内置了 JavaScript 运行时的一些标准化 API 的声明文件；包括 Math、 Date 等内置数据类型，也包括 DOM API，比如 window 、 document 等；
  - 内置类型声明文件通常在我们安装 TypeScript 的环境中会带有；
  - [内置类型声明文件链接](https://github.com/microsoft/TypeScript/tree/main/lib)：https://github.com/microsoft/TypeScript/tree/main/lib

  ![内置类型声明](.\TypeScript\内置类型声明.png)

- 外部定义类型声明文件

  - 外部类型声明通常是我们使用一些库（比如第三方库）时，需要的一些类型声明；

  - 这些库通常有两种类型声明方式：

    - 方式一：在自己库中进行类型声明（安装包内自带  ` .d.ts `  文件），比如 axios，因此安装 axios 时只需要安装 axios 一个库即可，不需要再额外安装 类型声明文件；
    - 方式二：通过GitHub社区的一个公有库 DefinitelyTyped 存放类型声明文件；这个是一些包的类型声明文件都放在这个库（[地址](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types)）中；如果安装这些包的类型声明文件，可以通过（这个地址）搜索，然后查找到安装所需的文件；
      - 公有库 DefinitelyTyped（只用于存放文件，一般用下面的查找链接找自己所需的库的类型声明文件）：https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types
      - 查找链接（一般用这个查找自己所需的库的类型声明文件）：https://www.typescriptlang.org/dt/search?search=

    ![外部定义类型声明和自定义声明](.\TypeScript\外部定义类型声明和自定义声明.png)

- 自定义类型声明文件

  - 类型声明文件 中不需要对声明的变量进行赋值，不会转成 js 代码运行的，这个文件只是类型声明文件，只是告诉 TypeScript 有这些类型而已；

  - 以下两种情况需要我们自己来自定义类型声明文件

    - 情况一：如果使用的第三方库是一个纯的 JavaScript 库，而且没有对应的类型声明文件；
    - 情况二：我们给自己的代码中声明一些类型，方便在其他地方直接进行使用；

  - 自定义一个类型声明文件***

    - 自定义的类型声明文件可以放在本项目下的任意位置，不需要在任何文件中引入，都会自动被扫描到；这个文件只需要以  ` .d.ts  `  为后缀即可；

    - declare 声明模块的关键字；

    - 声明模块  --  以 lodash 库为例

      - 以 lodash 库为例（lodash库在 公有库 DefinitelyTyped 中存放有对应的类型声明文件，在此我们自己实现这个 lodash 库的 类型声明文件）；

      - 先安装 lodash 库

        ```
        # 安装 lodash 库
        npm i lodash
        # 安装 lodash 的类型声明文件（这个文件本次先不安装，我们自己实现 声明本次所用到的lodash中的方法）
        npm i @types/lodash --save-dev
        ```

      - 实现 lodash 库的类型声明文件（实现 lodash 中的部分方法）

      ```
      # 以 lodash 库为例（lodash库在 公有库 DefinitelyTyped 中存放有对应的类型声明文件，在此我们自己实现这个 lodash 库的 类型声明文件）
      
      # 类型声明文件 内（wls.d.ts文件）
      // declare module 'lodash' 给 'lodash' 这个库声明一个模块空间
      declare module 'lodash' {
      	// 声明 lodash 库中的 join 方法； （这个文件里面只做类型声明，不用实现具体的方法）
        // 声明 join 方法，要求传入一个任意类型的数组，返回值任意
      	export function join(arr: any[]): void
      }
      
      # 其他 .ts 文件内
      // 自己实现 lodash 库的类型声明文件（实现 lodash 中的部分方法）
      import lodash from 'lodash';
      console.log(lodash.join(['aaa', 'bbb']));  // aaa,bbb
      ```

    - 声明变量、函数、类

      - 对于  ` index.html `  文件中 `script ` 标签里初始化的变量，如果不在 类型声明文件 中进行变量声明，在其他 ` .ts ` 文件中将无法获取；

        ```
        # index.html 文件内
        <script>
            let wlsName = 'wls';
            let wlsAge = 18;
        
            function wlsFoo () {
              console.log('wls-foo')
            }
        
            // es5 声明一个类
            function Person (name, age) {
              this.name = name
              this.age = age
            }
        </script>
        
        # 类型声明文件 内（wls.d.ts文件）
        // 声明 wlsName变量，字符串类型
        declare let wlsName: string
        
        // 声明 wlsFoo函数，没有参数，返回值任意类型
        declare function wlsFoo(): void
        
        // 声明 Person类  -- es6
        declare class Person {
          name: string
          age: number
          constructor(name: string, age: number)
        }
        
        # .ts 文件内
        // .d.ts 文件内 声明变量 后 使用
        // 对于  index.html  文件中 script 标签里初始化的变量，如果不在 类型声明文件 中进行变量声明，在 .ts 文件中将无法获取；
        console.log(wlsName);  // 'wls'  // 已声明  编译成功
        // console.log(wlsAge);  // 未声明  编译失败
        
        // .d.ts 文件内 声明函数 后 使用
        wlsFoo();
        
        // .d.ts 文件内 声明类 后 使用
        const p = new Person('wls', 18);
        console.log(p)
        ```

        

    - 声明文件

      ```
      # 类型声明文件 内（wls.d.ts文件）
      // 把以 .jpg 结尾的文件当成一个模块进行声明，之后在本项目中的 .ts 文件内就可以直接导入使用了
      declare module '*.jpg'
      declare module '*.jpeg'
      declare module '*.png'
      declare module '*.svg'
      declare module '*.gif'
      
      # .ts 文件内
      // .d.ts 文件内 声明文件 后 使用
      import xhy from '../public/小黄鸭.jpg'
      ```

      

    - 声明命名空间

      - 使用场景：比如我们在 index.html 文件内 通过 CDN 的方式引入了 jQuery ；如果不在 类型声明文件 内进行声明，则在 .ts 文件内就无法使用 jQuery 中的属性和方法；

        ```
        # index.html 文件内
        <!-- 通过 CDN 的方式引入 jQuery -->
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.2/dist/jquery.min.js"></script>
        
        # 类型声明文件 内（wls.d.ts文件内）
        // 声明命名空间，命名空间名字为 $ 
        declare namespace $ {
          export function ajax(settings: any): any
        }
        
        # .ts 文件内
        // .d.ts 文件内 声明命名空间 $  后 使用
        $.ajax({
          url: '',
          success: (res: any) => {
            console.log(res);
          }
        });
        ```

        

    - 



##### InstanceType 构造一个类型

-  `  InstanceType<Type>  `  : Type 可以是 一个类型的实例、any、never 等；不可以是 string 和 Function ；具体原因见[官网](https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype)；

```
// <InstanceType<typeof C>> 根据 C 类型的实例构造一个类型
class C {
  x = 0;
  y = 0;
}
const a = ref<InstanceType<typeof C>>(xxx)
```





### 遇到的问题

##### 练习

- 定义变量名报错

  - 环境：单独 ts 文件内

  - 原因：默认情况下，所有 ts 文件都是在同一个作用域下进行编译的，如果 在其他文件中或者在浏览器的整个dom环境下 有与本文件内相同的变量名，这个变量名就会冲突报错；

  - 解决方案：

    - 方案1、将该 ts 文件作为一个单独的作用域，即可解决；

      ```
      # .ts 文件内
      xxx逻辑；
      // 导出一个空对象，即可实现把该 ts 文件模块化，作为一个单独的作用域存在（模块里面有自己的作用域）
      export {}
      ```

      

    - 

- webpack 执行 npm run serve 开启本地服务时报错

  - 环境：webpack 配置项目

  - 原因：加载 文件 不成功，需要检查 webpack.config.json 文件内的配置项 extensions 是否有漏配 后缀文件；

  - 解决方案：

    ```
    # webpack.config.js 文件内
    resolve: {
    	extensions: ['.ts', '.js', '.cjs', '.json']
    }
    ```

    

  - 报错内容如下：

![webpack 执行 npm run serve 开启本地服务时报错（1）](.\TypeScript\webpack 执行 npm run serve 开启本地服务时报错（1）.png)

- webpack 打包项目报警告

  - 环境：webpack 配置项目

  - 原因：webpakc.config.js 文件内没有配置 mode 模式

  - 解决方案：

    ```
    # webpack.config.js 文件内
    // 配置为开发模式
    mode: 'development',
    // 入口
    entry: './src/main.ts',
    ```

  - 报错内容如下

  ![webpack 打包项目报警告（1）](.\TypeScript\webpack 打包项目报警告（1）.png)



