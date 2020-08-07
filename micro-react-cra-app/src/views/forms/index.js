import React, { PureComponent } from "react";
// import produce from "immer";
// import PropTypes from 'prop-types';
import { Form, Input, message, Button, Modal } from "antd";
import { clearPending } from '@@api/pendings';
// const { RangePicker } = DatePicker;
// const FormItem = Form.Item;
// const Option = Select.Option;

export default class Forms extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  componentWillUnMount = () => {
    //组件卸载,取消请求
    clearPending()
  }

  add = () => {
    this.setState(prevState => {
      return { index: prevState.index + 1 };
    });
    this.setState(prevState => {
      return { index: prevState.index + 1 };
    });
    console.log("form-index", this.state.index);
  }

  render() {
    return (
      <dl className="page-box">
        <dt>
          <h3 className="page-title">表单提交</h3>
          <Button type="primary" size="small" onClick={this.add}>
            新增
          </Button>
        </dt>
        <dd></dd>
      </dl>
    );
  }
}
