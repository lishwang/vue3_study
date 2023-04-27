function createApp (rootComponent) {
  return {
    // 返回新的mount函数
    mount (selector) {
      const container = document.querySelector(selector);
      let isMounted = false; // 是否已挂载
      let oldVnode = null; // 保存旧节点

      // 调用 响应式系统中的 watchEffect 方法
      watchEffect(function () {
        if (!isMounted) {
          // 未挂载
          // 保存到旧节点，并调用render方法拿到旧节点
          oldVnode = rootComponent.render();
          // 调用 渲染器中的 mount 方法
          mount(oldVnode, container);
          isMounted = true;
        } else {
          // 已挂载，更新时
          // 拿到新节点
          const newVnode = rootComponent.render();
          // 调用 渲染器中的 patch 方法
          patch(oldVnode, newVnode);
          // 更新 旧节点
          oldVnode = newVnode;
        }
      })
    }
  }
}