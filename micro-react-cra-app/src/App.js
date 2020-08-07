import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import History from '@@router/history';
import MainLayout from "@@components/LayoutTemp";

import "@@assets/styles/antd-custom.less";
import "@@assets/styles/main/base.scss";
import "@@assets/styles/components/general.scss";

const supportsHistory = "pushState" in window.history;
// BrowserRouter as Router用 forceRefresh={!supportsHistory}  history={History}
function App() {
  return (
    <Router
      basename={window.__POWERED_BY_QIANKUN__ ? "/reactmicro" : "/"}
      forceRefresh={!supportsHistory}
    >
      <Switch>
        <Route path="/views" component={MainLayout} />
        <Redirect to="/views/home" />
      </Switch>
    </Router>
  );
}

export default App;
