import React, { useState } from "react";

// import { useImmer } from "use-immer";
import { Divider, Popconfirm, Button } from "antd";
// import PropTypes from "prop-types";
import { $Api } from "@@api";

function ArticleTablesRule(props) {
  // const [delKey, setDelKey] = useState(null);

  const getTableDataFn = async (current, pageSize) => {
    return await $Api.getArticleList(current, pageSize);
  };
  const delArticleFn = async (key) => {
    return await $Api.delArticle(key);
  };

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      minWidth: 160,
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
      minWidth: 80,
    },
    {
      title: "导语",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "发布时间",
      dataIndex: "publish_date",
      key: "publish_date",
      minWidth: 160,
    },
    // {
    //   title: "操作",
    //   key: "action",
    //   render: (text, record) => {
    //     return record.id ? (
    //       <span>
    //         {/* <Button type="link" className="pd0" onClick={() => this.showEFieldModal(record)}>编辑</Button> */}
    //         {/* <Link to={`/tables/articles/${record.id}`}>详情</Link>
    //         <Divider type="vertical" /> */}
    //         <Popconfirm
    //           title="确认删除该新闻?"
    //           onConfirm={() => delRowFn(record.id)}
    //           okText="Yes"
    //           cancelText="No"
    //         >
    //           <a>删除</a>
    //         </Popconfirm>
    //       </span>
    //     ) : null
    //   }
    // },
  ];

  const initPropsData = {
    columns,
    actions: {
      selKey: (record) => record.id,
      delTitle: "确认删除该新闻?",
      linkurl: '/tables/articles/',
    },
    rowKeyFn: (record) => record.id,
    isborder: true,
    // isPaging: false,
    // scrollProp: { y: 500 },
    getErrMsg: "获取新闻列表相关数据请求失败！",
    delErrMsg: "删除新闻相关数据请求失败！",
    size: "small",
    isJumper: true,
    isSizeChanger: true,
  };

  const initStatesVal = {
    datas: {
      dataSrc: [],
      total: 0,
    },
    pages: {
      pageCur: 1,
      pageSize: 10,
    },
  };

  // const actionStatesVal = {
  //   delKey,
  // };

  //   const getTableDataFn = async (current, pageSize) => {
  //     try {
  //       const resData = await $Api.getArticleList(current, pageSize);
  //       console.log("table-res:", resData);
  //         setArticleData((draft) => {
  //           draft.dataSrc = resData.data.data;
  //           draft.total = resData.data.total;
  //         });
  //     } catch (error) {
  //       message.error(error.message + ", 获取新闻列表相关数据请求失败！", 5);
  //     }
  //   };

  return {
    initPropsData,
    initStatesVal,
    getTableDataFn,
    delArticleFn,
  };
}

export { ArticleTablesRule };
