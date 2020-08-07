import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom'
// import renderRoutes from '../router/index';
import { ConfigProvider, Layout, Spin } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import HeadTop from './components/Header'
import Loader from './components/LoadRender'
import NoMatch from './components/Error/NoMatch'

// import '~antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件
import 'antd/dist/antd.css'
import './static/css/base.css'
import './static/css/main.css'

const Header = withRouter(HeadTop)
const supportsHistory = 'pushState' in window.history

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ minHeight: '100vh' }}>
        <Router forceRefresh={!supportsHistory}>
          <Header />

          {/* 子应用 */}
          <Layout id="subapp-container">
            {/* 
              path：指定路由跳转路径
              exact: 精确匹配路由
              component：路由对应的组件 
            */}
            <Suspense fallback={<Spin size="large"></Spin>}>
              <Switch>
                <Route path="/reactmicro" component={Loader} />
                <Route exact path="/nextmicro" component={Loader} />
                <Route path="/vueclimicro" component={Loader} />
                {/* <Route exact path="/staticmicro" component={Loader} /> */}
                {/* <Route exact path="/" children={<Home />} /> */}
                <Route component={NoMatch} />
                <Redirect to="/reactmicro" />
              </Switch>
            </Suspense>
          </Layout>
        </Router>
      </Layout>
    </ConfigProvider>
  )
}

export default App
