import { sum } from './math';
import {time,price} from './format'

const message: string = 'Hello TypeScript';

console.log(sum(9,5));
console.log(message);

// time 和 price 是命名空间；
console.log(time.format('123'))
console.log(price.format(123))


// --------------------------------------------------------
// 自己实现 lodash 库的类型声明文件（实现 lodash 中的部分方法）
import lodash from 'lodash';
console.log(lodash.join(['aaa', 'bbb']));  // aaa,bbb

// .d.ts 文件内 声明变量 后 使用
// 对于  index.html  文件中 script 标签里初始化的变量，如果不在 类型声明文件 中进行变量声明，在 .ts 文件中将无法获取；
console.log(wlsName);  // 'wls'  // 已声明  编译成功
// console.log(wlsAge);  // 未声明  编译失败

// .d.ts 文件内 声明函数 后 使用
wlsFoo();

// .d.ts 文件内 声明类 后 使用
const p = new Person('wls', 18);
console.log(p)

// .d.ts 文件内 声明文件 后 使用
import xhy from '../public/小黄鸭.jpg'

// .d.ts 文件内 声明命名空间 $  后 使用
$.ajax({
  url: '',
  success: (res: any) => {
    console.log(res);
  }
});