import React, { Suspense, useState } from "react";
import { ConfigProvider, Layout } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { renderRoutes } from "react-router-config";
// import renderRoutes from "@@router/index";
import routes from "@@router/routesConfig";

import Header from "./Header";
import MenuNav from "./Nav";
import Loading from "./Loading";
// import Footer from './Footer';

const { Content, Sider } = Layout;

function MainLayout(props) {
  const { match } = props;
  const [collapsed, setCollapsed] = useState(false);
  const toggleMenu = (bool) => {
    setCollapsed(bool);
  };
  console.log("lay-router:", props);
  return (
    <ConfigProvider locale={zhCN}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <MenuNav />
        </Sider>
        <Layout>
          <Header propCollapsed={collapsed} onToggleMenu={toggleMenu} />
          <Content
            style={{
              height: "calc(100vh - 50px)",
              overflow: "auto",
              padding: 16,
            }}
          >
            <Suspense fallback={<Loading isLoad="Loading..." />}>
              {/* {renderRoutes(routes, match)} */}
              {renderRoutes(routes, match)}
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default MainLayout;
