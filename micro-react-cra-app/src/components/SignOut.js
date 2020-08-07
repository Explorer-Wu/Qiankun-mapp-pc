import React from "react";
import { withRouter } from "react-router-dom";
import { message, Popconfirm } from "antd";
// import cookies from "@@utils/cookiestorage";
import { $Api } from "@@api";

function SignOut(props) {

  const confirm = () => {
    const { from } = this.props.location.pathname || { from: { pathname: "/login" }, };
    
    // window.location.href = "/login";
    $Api.logout()
    .then((res) => {
        console.log("logoutRes:", res);
        this.props.history.replace(from);
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  const cancel = () => {
    message.error("取消退出！");
  };

  return (
    <>
      <Popconfirm
        title="确定要退出登录吗?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="退出"
        cancelText="取消"
      >
        <span>注销</span>
      </Popconfirm>
    </>
  );
}

export default SignOut;
