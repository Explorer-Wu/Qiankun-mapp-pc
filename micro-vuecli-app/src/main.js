import Vue from 'vue'
import VuexRouterSync from 'vuex-router-sync'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './router'
import store from './store'
import "view-design/dist/styles/iview.css"
import "@/assets/styles/main/base.scss"
import "@/assets/styles/components/general.scss"
import UseGenerals from './plugins/initgeneral'
import './public-path';

// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

UseGenerals(Vue)

let router = null;
let instance = null;

function QRender(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/vueclimicro' : '/',
    mode: 'history',
    linkActiveClass: 'active',
    routes
  });

  VuexRouterSync.sync(store, router);
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  QRender();
}

function storeTest(props) {
  // props.onGlobalStateChange &&
  //   props.onGlobalStateChange(
  //     (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
  //     true,
  //   );
  // props.setGlobalState &&
  //   props.setGlobalState({
  //     ignore: props.name,
  //     user: {
  //       name: props.name,
  //     },
  //   });

  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(`[onGlobalStateChange - ${props.name}]:`, state, prev);
  });
  props.setGlobalState({
    ignore: props.name,
    user: {
      name: props.name
    }
  });
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  storeTest(props);
  QRender(props);
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
// export async function update(props) {
//   console.log('update props', props);
// }