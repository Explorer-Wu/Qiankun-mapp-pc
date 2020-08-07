import React, { useState, useEffect, useRef } from "react";
import { renderRoutes, matchRoutes } from "react-router-config";
import { useImmer } from "use-immer";
import { Breadcrumb } from "antd";
import { clearPending } from '@@api/pendings';

export default function Charts(props) {
  const { route, match, location } = props;
  // console.log("charts-props:", route, match, location)
  useEffect(() => {
    return () => {
     //  cleanup
     clearPending()
    }
  }, [])
  return (
    <>
      <div className="page-tip-bar">
        <Breadcrumb>
          <Breadcrumb.Item>图表展示</Breadcrumb.Item>
          {location.pathname === "/views/charts/index" ? (
            <Breadcrumb.Item>2D图表类</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>3D图表类</Breadcrumb.Item>
          )}
        </Breadcrumb>
      </div>
      <dl className="page-box">{renderRoutes(route.routes, match)}</dl>
    </>
  );
}
