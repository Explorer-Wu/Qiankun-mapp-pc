import React from 'react';
import { Spin } from 'antd';
/**
 * 渲染子应用
 */
function Loader(props) {
  const { loading } = props;

  return (
    <>
      {loading && <Spin size="large" tip="Loading..."></Spin>}
      {/* <h4 className="subapp-loading">Loading...</h4> */}
      <div id="subapp"/>
    </>
  );
}

export default Loader;