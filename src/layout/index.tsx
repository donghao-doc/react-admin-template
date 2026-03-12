import {
  DesktopOutlined,
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Dropdown, Layout, Menu, Modal, Space, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAuthStore, useProfileStore } from '@/store'

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
  const clearToken = useAuthStore((state) => state.clearToken)
  const clearProfile = useProfileStore((state) => state.clearProfile)
  const userInfo = useProfileStore((state) => state.userInfo)

  const userDropdownItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ]

  /**
   * 退出登录前进行二次确认，避免误操作
   */
  function handleLogout() {
    Modal.confirm({
      title: '确认退出登录？',
      content: '退出后将返回登录页，需要重新登录才能继续访问后台。',
      okText: '确认退出',
      cancelText: '取消',
      onOk: () => {
        clearToken()
        clearProfile()
        navigate('/login', { replace: true })
      },
    })
  }

  /**
   * Header 区域用户下拉菜单点击
   */
  function handleUserMenuClick({ key }: { key: string }) {
    if (key === 'logout') {
      handleLogout()
    }
  }

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

          <Dropdown
            menu={{
              items: userDropdownItems,
              onClick: handleUserMenuClick,
            }}
            trigger={['click']}
          >
            <Space className="admin-layout__user" size={8}>
              <Avatar icon={<UserOutlined />} />
              <Typography.Text>{userInfo?.nickname ?? '未登录'}</Typography.Text>
              <DownOutlined />
            </Space>
          </Dropdown>
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
