import {
  DownOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { App as AntdApp, Avatar, Breadcrumb, Dropdown, Layout, Menu, Space, Switch, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAuthStore, useProfileStore, useThemeStore } from '@/store'
import type { MenuItem } from '@/types'

import { menuIconMap } from './menu-icons'
import './index.scss'

const { Header, Sider, Content } = Layout

/**
 * 将后端返回的菜单树转换为 antd Menu 的数据结构
 */
function transformMenuItems(menus: MenuItem[]): MenuProps['items'] {
  return menus.map((menu) => ({
    key: menu.path,
    icon: menu.meta.icon ? menuIconMap[menu.meta.icon] : undefined,
    label: menu.meta.title,
    children: menu.children?.length ? transformMenuItems(menu.children) : undefined,
  }))
}

/**
 * 递归拍平菜单树，便于根据当前路由匹配菜单节点
 */
function flattenMenus(menus: MenuItem[]): MenuItem[] {
  return menus.flatMap((menu) => {
    if (!menu.children?.length) {
      return [menu]
    }

    return [menu, ...flattenMenus(menu.children)]
  })
}

/**
 * 查找与当前 pathname 最匹配的菜单节点，优先使用更长的路径
 */
function findMatchedMenu(pathname: string, menus: MenuItem[]) {
  return flattenMenus(menus)
    .filter((menu) => pathname === menu.path || pathname.startsWith(`${menu.path}/`))
    .sort((prev, next) => next.path.length - prev.path.length)[0]
}

/**
 * 根据当前路由查找需要展开的父级菜单路径
 */
function findOpenKeys(pathname: string, menus: MenuItem[], parentPaths: string[] = []): string[] {
  for (const menu of menus) {
    const currentPaths = [...parentPaths, menu.path]

    if (pathname === menu.path || pathname.startsWith(`${menu.path}/`)) {
      if (!menu.children?.length) {
        return parentPaths
      }

      const childOpenKeys = findOpenKeys(pathname, menu.children, currentPaths)

      return childOpenKeys.length ? childOpenKeys : parentPaths
    }

    if (menu.children?.length) {
      const childOpenKeys = findOpenKeys(pathname, menu.children, currentPaths)

      if (childOpenKeys.length) {
        return childOpenKeys
      }
    }
  }

  return []
}

/**
 * 根据当前路由生成面包屑
 */
function findBreadcrumbTrail(
  pathname: string,
  menus: MenuItem[],
  parentMenus: MenuItem[] = [],
): MenuItem[] {
  for (const menu of menus) {
    const currentTrail = [...parentMenus, menu]

    if (pathname === menu.path) {
      return currentTrail
    }

    if (menu.children?.length) {
      const childTrail = findBreadcrumbTrail(pathname, menu.children, currentTrail)

      if (childTrail.length) {
        return childTrail
      }
    }
  }

  return []
}

function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { modal } = AntdApp.useApp()
  const clearToken = useAuthStore((state) => state.clearToken)
  const clearProfile = useProfileStore((state) => state.clearProfile)
  const userInfo = useProfileStore((state) => state.userInfo)
  const menus = useProfileStore((state) => state.menus)
  const themeMode = useThemeStore((state) => state.themeMode)
  const setThemeMode = useThemeStore((state) => state.setThemeMode)
  const matchedMenu = findMatchedMenu(location.pathname, menus)
  const openKeys = findOpenKeys(location.pathname, menus)
  const breadcrumbTrail = findBreadcrumbTrail(location.pathname, menus)
  const menuItems = transformMenuItems(menus)

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
    modal.confirm({
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
          defaultOpenKeys={openKeys}
          mode="inline"
          selectedKeys={matchedMenu ? [matchedMenu.path] : []}
          theme={themeMode}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      <Layout>
        <Header className="admin-layout__header">
          {breadcrumbTrail.length > 0 && (
            <Breadcrumb
              className="admin-layout__breadcrumb"
              items={breadcrumbTrail.map((menu) => ({
                title: menu.meta.title,
              }))}
            />
          )}

          <Space className="admin-layout__header-actions" size={16}>
            <Space size={8}>
              <Typography.Text>深色模式</Typography.Text>
              <Switch
                checked={themeMode === 'dark'}
                checkedChildren="开"
                unCheckedChildren="关"
                onChange={(checked) => setThemeMode(checked ? 'dark' : 'light')}
              />
            </Space>

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
