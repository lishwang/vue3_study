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

// 以上为 封装的响应式代码
// //////////////////////////////////////////////////////////////////////////
// 以下为 测试代码

let activeEffect = null;
function watchEffect (effect) {
  activeEffect = effect;
  dep.depend();
  effect();
  activeEffect = null;
}

const info = { counter: 100, name: 'why' };
const foo = { sex: 'man' }
const dep = new Dep();
watchEffect(function () {
  console.log(info.counter * 2, info.name)
})

watchEffect(function () {
  console.log(info.counter * info.counter);
})

watchEffect(function () {
  console.log(foo.sex);
})

info.counter++;
dep.notify();

// info.name = 'wls';
// dep.notify();

// foo.sex = 'woman';
// dep.notify();