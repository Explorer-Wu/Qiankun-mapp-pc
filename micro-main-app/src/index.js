// React 16 使用 core-js 支持老版本浏览器
import 'core-js/es';
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/promise';
//使用 raf 的 package 增添 requestAnimationFrame 的 shim
import 'raf/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import QiankunStart from './QiankunMicro';
import * as serviceWorker from './serviceWorker';

// 主应用渲染
ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
  document.getElementById('main-app')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/**
 * 启动微服务应用
 */
QiankunStart({ 
  sandbox: {strictStyleIsolation: true}   //开启严格的样式隔离模式
});