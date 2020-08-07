function emptyAction() {
  console.warn("Current execute action is empty!");
}

class Actions {
  // 从生命周期 mount 中获取通信方法，使用方式和 master 一致
  // props.onGlobalStateChange((value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev), true);

  // props.onGlobalStateChange((state, prev) => {
  //   // state: 变更后的状态; prev 变更前的状态
  //   console.log(`[onGlobalStateChange - ${props.name}]:`, state, prev);
  // });
  // // props.setGlobalState(state);
  // props.setGlobalState({
  //   ignore: props.name,
  //   user: {
  //     name: props.name,
  //   },
  // });
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction,
  };

  setActions(actions) {
    this.actions = actions;
  }

  onGlobalStateChange(...args) {
    return this.actions.onGlobalStateChange(...args);
  }

  setGlobalState(...args) {
    return this.actions.setGlobalState(...args);
  }
}

const actions = new Actions();
export default actions;
