# Qiankun-mapp-pc
Qiankun微前端搭建PC端应用模版（主应用和微应用）

主应用由 [Create React App](https://github.com/facebook/create-react-app) 搭建

## Available Scripts
In the project directory, you can run:

### 开发坏境
* 安装 
```sh
    npm install / yarn install
``` 

* 开发环境服务启动
```sh
    npm run start / yarn start
``` 

* 测试
```sh
    npm run test / yarn test
```

### 生产坏境打包

```sh
    npm run build / yarn build
``` 

Runs the app in the development mode.<br />
Open [http://localhost:3000] to view it in the browser.

在微前端架构中，我们应该按业务划分出对应的子应用，而不是通过功能模块划分子应用。这么做的原因有两个：

1. 在微前端架构中，子应用并不是一个模块，而是一个独立的应用，我们将子应用按业务划分可以拥有更好的可维护性和解耦性。
2. 子应用应该具备独立运行的能力，应用间频繁的通信会增加应用的复杂度和耦合度。

综上所述，我们应该从业务的角度出发划分各个子应用，尽可能减少应用间的通信，从而简化整个应用，使得我们的微前端架构可以更加灵活可控。

qiankun通信方式主要有两种：
1. qiankun 官方提供的通信方式 - Actions 通信，适合业务划分清晰，比较简单的微前端应用，一般来说使用第一种方案就可以满足大部分的应用场景需求。
2. 基于 redux 实现的通信方式 - Shared 通信，适合需要跟踪通信状态，子应用具备独立运行能力，较为复杂的微前端应用。

## Actions 通信
这种通信方式比较适合业务划分清晰，应用间通信较少的微前端应用场景。
### Actions 通信原理
qiankun 内部提供了 initGlobalState 方法用于注册 MicroAppStateActions 实例用于通信，该实例有三个方法，分别是：
1. setGlobalState：设置 globalState - 设置新的值时，内部将执行 浅检查，如果检查到 globalState 发生改变则触发通知，通知到所有的 观察者 函数。
2. onGlobalStateChange：注册 观察者 函数 - 响应 globalState 变化，在 globalState 发生改变时触发该 观察者 函数。
3. offGlobalStateChange：取消 观察者 函数 - 该实例不再响应 globalState 变化。
![avatar](/micro-main-app/public/actions_tx.jpg)
从上图可以看出，我们可以先注册 观察者 到观察者池中，然后通过修改 globalState 可以触发所有的 观察者 函数，从而达到组件间通信的效果。

Actions 通信方案也存在一些优缺点.
优点如下：
- 使用简单；
- 官方支持性高；
- 适合通信较少的业务场景；

缺点如下：
- 子应用独立运行时，需要额外配置无 Actions 时的逻辑；
- 子应用需要先了解状态池的细节，再进行通信；
- 由于状态池无法跟踪，通信场景较多时，容易出现状态混乱、维护困难等问题；

## Shared 通信
> 由于 Shared 方案实现起来会较为复杂，所以当 Actions 通信方案满足需求时，使用 Actions 通信方案可以得到更好的官方支持。

如果你的应用通信场景较多，希望子应用具备完全独立运行能力，希望主应用能够更好的管理子应用，那么可以考虑 Shared 通信方案。

### Shared 通信原理
Shared 通信方案的原理就是，主应用基于 redux 维护一个状态池，通过 shared 实例暴露一些方法给子应用使用。同时，子应用需要单独维护一份 shared 实例，在独立运行时使用自身的 shared 实例，在嵌入主应用时使用主应用的 shared 实例，这样就可以保证在使用和表现上的一致性。

Shared 通信方案需要自行维护状态池，这样会增加项目的复杂度。好处是可以使用市面上比较成熟的状态管理工具，如 redux、mobx，可以有更好的状态管理追踪和一些工具集。

Shared 通信方案要求父子应用都各自维护一份属于自己的 shared 实例，同样会增加项目的复杂度。好处是子应用可以完全独立于父应用运行（不依赖状态池），子应用也能以最小的改动被嵌入到其他 第三方应用 中。

Shared 通信方案也可以帮助主应用更好的管控子应用。子应用只可以通过 shared 实例来操作状态池，可以避免子应用对状态池随意操作引发的一系列问题。主应用的 Shared 相对于子应用来说是一个黑箱，子应用只需要了解 Shared 所暴露的 API 而无需关心实现细节。
![avatar](/micro-main-app/public/shared_tx.jpg)
以上shared 通信的原理和流程进行解析图

### Shared 通信方案优缺点
优点有这些：
- 可以自由选择状态管理库，更好的开发体验。 - 比如 redux 有专门配套的开发工具可以跟踪状态的变化。
- 子应用无需了解主应用的状态池实现细节，只需要了解 shared 的函数抽象，实现一套自身的 shared 甚至空 shared 即可，可以更好的规范子应用开发。
- 子应用无法随意污染主应用的状态池，只能通过主应用暴露的 shared 实例的特定方法操作状态池，从而避免状态池污染产生的问题。
- 子应用将具备独立运行的能力，Shared 通信使得父子应用有了更好的解耦性。

缺点也有两个：
- 主应用需要单独维护一套状态池，会增加维护成本和项目复杂度；
- 子应用需要单独维护一份 shared 实例，会增加维护成本；

Shared 通信方式也是有利有弊，更高的维护成本带来的是应用的健壮性和可维护性。

## 微应用
微应用不需要额外安装任何其他依赖即可接入 qiankun 主应用。
### 配置微应用的打包工具
除了代码中暴露出相应的生命周期钩子之外，为了让主应用能正确识别微应用暴露出来的一些信息，微应用的打包工具需要增加如下配置：
react中webpack:
```
  const packageName = require('./package.json').name;
  module.exports = {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`,
      globalObject: 'window'
    },
    devServer: {
      hot: true,
      port: 3000,
      historyApiFallback: true,
      watchContentBase: false,
      liveReload: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  };
```
vue中vue.config.js:
```
  const packageName = require('./package.json').name;
  module.exports = {
    configureWebpack: {
      output: {
        library: `${packageName}-[name]`,
        libraryTarget: 'umd',
        jsonpFunction: `webpackJsonp_${packageName}`,
      },
    },
    devServer: {
      hot: true,
      disableHostCheck: true,
      port: 8080,
      overlay: {
        warnings: false,
        errors: true,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  };
```
注意： package.json中的name和主应用中注册的必须保持一致。

### 导出相应的生命周期钩子
微应用需要在自己的入口 js (通常就是你配置的 webpack 的 entry js) 导出 bootstrap、mount、unmount 三个生命周期钩子，以供主应用在适当的时机调用。
```
  /**
  * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
  * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
  */
  export async function bootstrap() {
    console.log('react app bootstraped');
  }
  /**
  * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
  */
  export async function mount(props) {
    console.log(props);
    ReactDOM.render(<App />, document.getElementById('react15Root'));
  }
  /**
  * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
  */
  export async function unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('react15Root'));
  }
  /**
  * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
  */
  export async function update(props) {
    console.log('update props', props);
  }
```