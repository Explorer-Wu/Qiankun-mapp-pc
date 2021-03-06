// 导入乾坤函数
import {
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  addGlobalUncaughtErrorHandler,
  start,
  initGlobalState
  // MicroAppStateActions
} from 'qiankun'
import { message } from 'antd'

/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
// import render from './components/ReactRender';
// import render from './render/VueRender';

/**
 * Step1 初始化应用（可选）
 */
// render({ loading: true });

// const loader = loading => render({ loading });

// 子应用注册信息
const apps = [
  /**
   * name: 微应用名称 - 具有唯一性
   * entry: 微应用入口 - 通过该地址加载微应用
   * container: 微应用挂载节点 - 微应用加载完成后将挂载在该节点上
   * activeRule: 微应用触发的路由规则 - 触发路由规则后将加载该微应用
   */
  // {
  //   name: "mainmicroapp",
  //   entry: '//localhost:3600',
  //   container: "#subapp",
  //   activeRule: "/mainmicro"
  // },
  {
    name: 'reactmicroapp',
    entry: '//localhost:3601',
    container: '#subapp',
    // loader,
    activeRule: '/reactmicro'
  },
  {
    name: 'cramicroapp',
    entry: '//localhost:3603',
    container: '#subapp',
    activeRule: '/cramicro'
  },
  // {
  //   name: 'vuemicroapp',
  //   entry: '//localhost:3606',
  //   container: '#subapp',
  //   activeRule: '/vuemicro'
  // },
  {
    name: 'vueclimicroapp',
    entry: '//localhost:3608',
    container: '#subapp',
    activeRule: '/vueclimicro'
  }
]

/**
 * Step2 注册子应用, registerMicroApps(apps, lifeCycles?)
 * 第一个参数 - 子应用的注册信息
 * 第二个参数 - 全局生命周期钩子
 */
registerMicroApps(apps, {
  // qiankun 生命周期钩子 - 加载前
  beforeLoad: [
    app => {
      console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
      // 加载子应用前，加载进度条
      // NProgress.start();
      // return Promise.resolve();
    }
  ],
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
    }
  ],
  // qiankun 生命周期钩子 - 挂载后
  afterMount: [
    app => {
      // 加载子应用前，进度条加载完成
      // NProgress.done();
      console.log('after mount:', app.name)
      // return Promise.resolve();
    }
  ],
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
    }
  ]
})

/**
 * initGlobalState(state), tate - Record<string, any> - 必选
 * 定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 props 获取通信方法。
 * 返回 MicroAppStateActions
 */
const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun'
})

/**
 * onGlobalStateChange: (callback: OnGlobalStateChangeCallback, fireImmediately?: boolean) => void，
 * 在当前应用监听全局状态，有变更触发 callback，fireImmediately = true 立即触发 callback
 * offGlobalStateChange: () => boolean，移除当前应用的状态监听，微应用 umount 时会默认调用
 * */
onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev))

/**
 * setGlobalState: (state: Record<string, any>) => boolean，
 * 按一级属性设置全局状态，微应用中只能修改已存在的一级属性
 */
setGlobalState({
  ignore: 'master',
  user: {
    name: 'Explorer wu'
  }
})

/**
 * Step3 设置默认进入的子应用
 */
// setDefaultMountApp(defaultApp);
setDefaultMountApp('/cramicro')

/**
 * runAfterFirstMounted(effect), effect - () => void - 必选
 * 第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本
 */
runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted')
})

/**
 * 添加全局的未捕获异常处理器
 */
addGlobalUncaughtErrorHandler(event => {
  console.error(event)
  const msg = event.message
  // 加载失败时提示
  if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
    message.error('子应用加载失败，请检查应用是否可运行')
  }
})

// Step4 导出 qiankun 的启动函数，准备启动
export default start
