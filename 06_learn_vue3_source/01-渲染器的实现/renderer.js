/**
 * 1、实现 h 函数
 * 作用：生成并返回vnode
 * @param {*} tag 生成vnode的标签
 * @param {*} props 生成vnode的属性
 * @param {*} children 生成vnode的内容或子元素
 * @returns 
 */
const h = (tag, props, children) => {
  // h 函数需要返回一个 vNode，本质上就是一个 JavaScript 对象
  return {
    tag,
    props,
    children
  }
}

/**
 * 2、实现 mount 函数
 * 作用：将vnode挂载到真实DOM上
 * @param {*} vnode 生成的虚拟节点
 * @param {*} container 真实DOM元素
 */
const mount = (vnode, container) => {
  // vnode => element
  // 2.1、根据 vnode 创建出真实的元素，并在 vnode 上加上 el
  const el = vnode.el = document.createElement(vnode.tag);

  // 2.2、处理 props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];
      if (key.startsWith('on')) {
        // 判断是不是事件，如果是事件，监听事件处理
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        // 如果是普通的属性，就直接挂载到el上
        el.setAttribute(key, value);
      }
    }
  }

  // 2.3、处理 children
  // children 可以是 字符串、数组、对象、插槽 四种类型，这里只处理 字符串 和 数组；
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children;
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(item => {
        mount(item, el);
      })
    }
  }

  // 2.4、将 el 挂载到 container 上
  container.appendChild(el);
}

/**
 * 3、实现 patch 函数
 * 作用：当页面更新时，用于对比新旧vnode 的不同，并根据不同点修改挂载在DOM上的旧vnode
 * @param {*} n1 旧vnode
 * @param {*} n2 新vnode
 */
const patch = (n1, n2) => {
  // 首先判断新旧vnode的最外层标签tag是否相同
  if (n1.tag !== n2.tag) {
    // 新旧vnode的最外层标签不同，直接删除旧vnode，重新挂载新vnode
    const n1ELememtParent = n1.el.parentElement;
    n1ELememtParent.removeChild(n1.el);
    mount(n2, n1ELememtParent);
  } else {
    // 新旧vnode的最外层标签相同
    // 3.1、取出 mount 中 根据 vnode 创建出真实的元素，在 mount 该元素创建后被挂载在 n1 上
    const el = n2.el = n1.el;

    // 3.2、处理 props
    const oldProps = n1.props || {};
    const newProps = n2.props || {};

    // 3.2.1、将所有的 newProps 挂载到 el 上
    for (const key in newProps) {
      // 遍历 newProps ，并与 oldProps 做对比；
      const oldValue = oldProps[key];
      const newValue = newProps[key];
      // 如果新旧属性及属性值相同，不做处理
      // 如果新旧属性值不同，修改 el 上挂载的属性值
      if (oldValue !== newValue) {
        // newProps 的属性为 监听事件
        if (key.startsWith('on')) {
          el.addEventListener(key.slice(2).toLowerCase(), newValue);
        } else {
          // newProps 的属性为 普通属性
          el.setAttribute(key, newValue);
        }
      }
    }

    // 3.2.2、删除挂载在 el 上的旧的 oldProps
    for (const key in oldProps) {
      if (!(key in newProps)) {
        if (key.startsWith('on')) {
          // 移除对事件的监听
          el.removeEventListener(key.slice(2).toLowerCase(), oldProps[key]);
        } else {
          // 移除属性
          el.removeAttribute(key);
        }
      }
    }


    // 3.3、处理 children 
    // 只考虑 children 为字符串或者数组的情况，如果是 对象，一般情况下是在写 插槽
    const oldChildren = n1.children || [];
    const newChildren = n2.children || [];

    if (typeof newChildren === 'string') {
      // 3.3.1、newChildren 是字符串
      if (typeof oldChildren === 'string') {
        // 情况一：oldChildren 是字符串
        el.textContent = newChildren;
      } else {
        // 情况二：oldChildren 不是字符串
        el.innerHTML = newChildren;
      }
    } else {
      // 3.3.2、newChildren 是数组
      if (typeof oldChildren === 'string') {
        // 情况一：oldChildren 是字符串
        el.innerHTML = '';
        newChildren.forEach(item => {
          mount(item, el);
        })
      } else {
        // 情况二：oldChildren 是数组
        // oldChildren: [ v1, v2, v3 ]
        // newChildren: [ v1, v6, v7, v8, v9 ]
        // 3.3.2.1、取oldChildren和newChildren两者中较短的一个进行遍历，然后 patch
        const commonLength = Math.min(oldChildren.length, newChildren.length);
        for (let i = 0; i < commonLength; i++) {
          // 前面相同节点，对比修改
          patch(oldChildren[i], newChildren[i]);
        }

        // 3.3.2.2、oldChildren.length < newChildren.length
        if (oldChildren.length < newChildren.length) {
          newChildren.slice(oldChildren.length).forEach(item => {
            // newChildren多出的部分 重新挂载
            mount(item, el);
          })
        }

        // 3.3.2.3、oldChildren.length > newChildren.length
        if (oldChildren.length > newChildren.length) {
          oldChildren.slice(newChildren.length).forEach(item => {
            // oldChildren多出的部分 从 el 上卸载
            el.removeChild(item);
          })
        }
      }
    }
  }
}

