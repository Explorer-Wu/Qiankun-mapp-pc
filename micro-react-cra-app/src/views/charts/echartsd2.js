import React, { useState, useEffect, useRef } from "react";
import { renderRoutes, matchRoutes } from "react-router-config";
import { useImmer } from "use-immer";
import { Row, Col, Button } from "antd";
// import { RocketOutlined } from "@ant-design/icons";
// import { $Api } from "@@api";
import {
  FetchVisitsRule,
  FetchCapacityRule,
} from "@@components/Charts/UseFetchsRule";
import DashTypeChart from "@@components/Charts/DashTypeChart";
import ComChart from "@@components/Charts/ComChart";

export default function Charts(props) {
  const VisitorsOptions = {
    title: "访问量统计",
    field: "visitors",
    defaultPeriod: 1 * 24 * 60 * 60,
  };

  const CapacityOptions = {
    title: "源码容量占比",
    field: "capacity",
  };

  const { visitsData } = FetchVisitsRule(VisitorsOptions);
  const { capacityData } = FetchCapacityRule(CapacityOptions);

  const exOptsLine = {
    type: "line",
    // periodOpts: [{name:"1天", value:1*24*60*60}, {name:"7天", value:7*24*60*60}, {name:"30天", value:30*24*60*60}],
    //  dateFormatter: function (value) {
    //    return $Moment(value).format('YYYY/MM/DD')
    //  },
    otherChartOpts: {
      isUpdate: true,
      isMerge: false,
      legendEvent: false,
    },
  };

  const exOptsRing = {
    type: "semiring",
    //  periodOpts: [{
    //    name: "1天",
    //    value: 1 * 24 * 60 * 60
    //  }, {
    //    name: "7天",
    //    value: 7 * 24 * 60 * 60
    //  }, {
    //    name: "30天",
    //    value: 30 * 24 * 60 * 60
    //  }],
    otherChartOpts: {
      isUpdate: true,
      isMerge: false,
      legendEvent: false,
    },
  };
  //  useEffect(() => {
  //    console.log("VisitsData:", visitsData)
  //    return () => {
  //     //  cleanup
  //    }
  //  }, [visitsData])s

  // const { route, match, location } = props
  return (
    <dl className="page-box">
      <dt>
        <h3 className="page-title">2D图表类</h3>
        <Button type="primary" size="small">
          新增图表
        </Button>
      </dt>
      <dd>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={14} lg={16} xl={18}>
            <DashTypeChart
              render={(chartOpt) => <ComChart propChartOpt={chartOpt} />}
              propData={visitsData}
              exOption={exOptsLine}
            />
          </Col>
          <Col xs={24} sm={12} md={10} lg={8} xl={6}>
            <DashTypeChart
              render={(chartOpt) => <ComChart propChartOpt={chartOpt} />}
              propData={capacityData}
              exOption={exOptsRing}
            />
          </Col>
        </Row>
      </dd>
    </dl>
  );
}
