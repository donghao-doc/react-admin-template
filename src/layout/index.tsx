import { DesktopOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Layout, Menu, Space, Typography } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import './index.scss'

const { Header, Sider, Content } = Layout

/**
 * 当前阶段先使用静态菜单结构，后续再接入菜单权限和动态路由
 */
const menuItems = [
  {
    key: '/dashboard',
    icon: <DesktopOutlined />,
    label: '工作台',
  },
]

function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Layout className="admin-layout">
      <Sider className="admin-layout__sider" width={220}>
        <div className="admin-layout__brand">
          <Typography.Title className="admin-layout__brand-title" level={4}>
            Admin Template
          </Typography.Title>
          <Typography.Text className="admin-layout__brand-text" type="secondary">
            React 管理后台模板
          </Typography.Text>
        </div>

        <Menu
          className="admin-layout__menu"
          items={menuItems}
          mode="inline"
          selectedKeys={[location.pathname]}
          theme="dark"
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      <Layout>
        <Header className="admin-layout__header">
          <Typography.Title className="admin-layout__header-title" level={5}>
            工作台
          </Typography.Title>

          <Space size={12}>
            <Space size={8}>
              <Avatar icon={<UserOutlined />} />
              <Typography.Text>演示账号</Typography.Text>
            </Space>
            <Button icon={<LogoutOutlined />} type="text">
              退出登录
            </Button>
          </Space>
        </Header>

        <Content className="admin-layout__content">
          <div className="admin-layout__content-inner">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
