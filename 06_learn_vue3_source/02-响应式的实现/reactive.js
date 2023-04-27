// 缺点：会监听所有的依赖
class Dep {
  constructor () {
    this.subscribers = new Set();
  }

  // 搜集依赖 --- 不区分
  depend () {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  // 通知，执行
  notify () {
    this.subscribers.forEach(effect => {
      effect();
    })
  }
}

let activeEffect = null;
function watchEffect (effect) {
  activeEffect = effect;
  debugger;
  effect();
  activeEffect = null;
}

// Map({key: value}) : key 是一个字符串
// weakMap({key: value}) : key 是一个对象，弱引用
const targetMap = new WeakMap();
function getDep (target, key) {
  // 1、根据对象 target 取出对应的 Map 对象
  let depsMap = targetMap.get(target);
  // debugger;
  if (depsMap == null) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  // 2、取出具体的 dep 对象
  let dep = depsMap.get(key);
  if (dep == null) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep;
}

// 实现数据响应式
// 一、vue2 的Object.defineProperty对数据进行劫持实现数据响应式
// reactive 处理 raw 数据后 返回 raw 本身；
// function reactive (raw) {
//   Object.keys(raw).forEach(key => {
//     const dep = getDep(raw, key);
//     let value = raw[key];
//     Object.defineProperty(raw, key, {
//       get () {
//         debugger;
//         dep.depend();
//         return value;
//       },
//       set (newValue) {
//         if (newValue !== value) {
//           debugger;
//           value = newValue;
//           dep.notify();
//         }
//       }
//     })
//   })
//   return raw;
// }

// 二、vue3 的 proxy 对数据进行劫持实现数据响应式
// reactive 处理 raw 数据后 返回 proxy 的代理对象；
function reactive (raw) {
  debugger;
  return new Proxy(raw, {
    get (target, key) {
      const dep = getDep(target, key);
      debugger;
      dep.depend();
      return target[key];
    },
    set (target, key, newValue) {
      const dep = getDep(target, key);
      target[key] = newValue;
      dep.notify();
    }
  })
}

// 以上为 封装的响应式代码
// //////////////////////////////////////////////////////////////////////////
// 以下为 测试代码


const info = reactive({ counter: 100, name: 'why' });
const foo = reactive({ sex: 'man' });
debugger;
watchEffect(function () {
  debugger;
  console.log('watchEffect1', info.counter * 3, info.name)
})

watchEffect(function () {
  console.log('watchEffect2', info.counter * info.counter);
})

watchEffect(function () {
  console.log('watchEffect3', foo.sex);
})

// info.counter++;

// info.name = 'wls';

foo.sex = 'woman';