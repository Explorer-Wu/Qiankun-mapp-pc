import React, { PureComponent } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { Menu } from 'antd'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'

const { SubMenu } = Menu

class NavMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedKeys: []
    }
    this.menuLis = [
      {
        type: <AppstoreOutlined />,
        title: '统计概览',
        path: '/home'
      }
    ]
  }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //     // Capture the current height of the list so we can adjust scroll later.
  //     if (prevProps.location.pathname !== this.props.location.pathname) {
  //         this.setState({ selectedKeys: [this.props.location.pathname]});
  //     }
  //     return null;
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ selectedKeys: [this.props.location.pathname] })
    }
  }

  componentDidMount() {
    console.log('props.location1:', this.props)
    this.setState({ selectedKeys: [this.props.location.pathname] })
  }

  linkTo = link => {
    console.log('linkTo:', link.key, this.props.history)
    this.props.history.push(link.key)
  }

  render() {
    console.log('menuLis:', this.state)

    let MenuList = this.menuLis.map((item, index) =>
      item.children ? (
        <SubMenu key={'sub' + index + 1} icon={item.type} title={item.title}>
          {item.children.map(chd => (
            <Menu.Item key={chd.path}>{chd.title}</Menu.Item>
          ))}
        </SubMenu>
      ) : (
        <Menu.Item key={item.path} icon={item.type}>
          {item.title}
        </Menu.Item>
      )
    )

    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={['/app/home']}
        selectedKeys={this.state.selectedKeys}
        onClick={this.linkTo}
        mode="inline"
      >
        {/* <Menu theme="dark" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline"> */}
        {MenuList}
      </Menu>
    )
  }
}

export default withRouter(NavMenu)
