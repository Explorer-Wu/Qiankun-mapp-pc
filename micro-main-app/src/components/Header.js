import React, { PureComponent } from 'react'
// import History from '../router/history';
import { Layout, Menu, Avatar, Dropdown } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import SignOut from './SignOut'
import logo from '../static/images/logo.svg'
// import {$Api} from "../api";
const { Header } = Layout

export class HeadTop extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedKeys: [],
      userinfo: {
        username: 'explorer wu'
      }
    }
  }

  componentDidMount() {
    console.log('props.location:', this.props)
    this.setState({ selectedKeys: [this.props.location.pathname] })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ selectedKeys: [this.props.location.pathname] })
    }
  }

  linkTo = link => {
    // console.log("linkTo:", link.key, this.props.history)
    this.props.history.push(link.key)
  }

  dropMenu = role => (
    <Menu>
      <Menu.Item key="down0">
        <a rel="noopener noreferrer" disabled>
          {' '}
          {role === 'admin' ? 'Administrator' : 'User'}{' '}
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="down1">
        <SignOut />
      </Menu.Item>
    </Menu>
  )

  render() {
    return (
      <Header className="header header-top">
        <div className="head-logo">
          <img src={logo} alt="logo" />
          <span className="title">
            <em>Qiankun</em> Explore
          </span>
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['/cramicro']}
          selectedKeys={this.state.selectedKeys}
          onClick={this.linkTo}
          className="fl mar-r10"
        >
          <Menu.Item key="/cramicro">CRAMicroApp</Menu.Item>
          <Menu.Item key="/reactmicro">ReactMicroApp</Menu.Item>
          <Menu.Item key="/vueclimicro">VueCliMicroApp</Menu.Item>
          {/* <Menu.Item key="/staticmicro">StaticMicroApp</Menu.Item> */}
        </Menu>

        <Dropdown
          overlay={this.dropMenu(this.state.userinfo.role)}
          trigger={['click']}
          className="fr mar-r15"
        >
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />{' '}
            {this.state.userinfo.username}
            <DownOutlined />
          </a>
        </Dropdown>
      </Header>
    )
  }
}

export default HeadTop
