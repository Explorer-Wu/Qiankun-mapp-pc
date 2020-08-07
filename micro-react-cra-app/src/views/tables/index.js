import React, { useState, useEffect, useRef } from "react";
import { Breadcrumb, Modal, Button, message } from "antd";
// import { RocketOutlined } from "@ant-design/icons";
import { $Api } from "@@api";
import { ArticleTablesRule } from "@@components/TablePaginations/UseTablePagingRule";
import WithTablePagingHOC from "@@components/TablePaginations/WithTablePaging";
// import PureTablePaging from "@@components/TablePaginations/PureTablePaging";
import PureTable from "@@components/TablePaginations/PureTable";
import { clearPending } from '@@api/pendings';

export default function Tables(props) {
  const {initPropsData, initStatesVal, getTableDataFn, delArticleFn} = ArticleTablesRule();
//   const ArticleTablePaging = TablePagingHOC(
//     PureTable,
//     getTableDataFn,
//     delArticleFn
//   );
  const ArticleTablePaging = WithTablePagingHOC(getTableDataFn, delArticleFn)(PureTable)

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
          <Breadcrumb.Item>表格展示</Breadcrumb.Item>
          <Breadcrumb.Item>新闻列表</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <dl className="page-box">
        <dt>
          <h3 className="page-title">新闻列表</h3>
          <Button type="primary" size="small">
            新增文章
          </Button>
        </dt>
        <dd>
          <ArticleTablePaging
            tablePagProps={initPropsData}
            initStateProps={initStatesVal}
          />
        </dd>
      </dl>
    </>
  );
}
