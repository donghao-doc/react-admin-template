import { lazy } from 'react'
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'

import type { MenuItem } from '@/types'

import { MenuRouteAccess, ProtectedRoute, PublicRoute } from './guard'
import { routeComponentMap } from './route-map'

const AdminLayout = lazy(() => import('@/layout'))
const Login = lazy(() => import('@/pages/login'))
const NotFound = lazy(() => import('@/pages/404'))
const Dashboard = routeComponentMap['/dashboard']

/**
 * 后台布局根路由 id，用于后续通过 patchRoutes 动态追加子路由
 */
export const ROOT_ROUTE_ID = 'root'

type PatchableRouter = {
  patchRoutes: (routeId: string | null, children: RouteObject[]) => void
}

const registeredPaths = new Set<string>(['/dashboard'])

/**
 * 拍平菜单树中的叶子节点，仅为实际可访问的菜单页面生成路由
 */
function flattenLeafMenus(menus: MenuItem[]): MenuItem[] {
  return menus.flatMap((menu) => {
    if (!menu.children?.length) {
      return [menu]
    }

    return flattenLeafMenus(menu.children)
  })
}

/**
 * 基于菜单数据和本地注册表生成后台子路由
 */
function createMenuRoutes(menus: MenuItem[], seen: Set<string> = registeredPaths) {
  return flattenLeafMenus(menus)
    .filter((menu) => routeComponentMap[menu.path])
    .filter((menu) => !seen.has(menu.path))
    .map((menu) => {
      const Component = routeComponentMap[menu.path]
      seen.add(menu.path)

      return {
        path: menu.path.replace(/^\//, ''),
        element: (
          <MenuRouteAccess path={menu.path}>
            <Component />
          </MenuRouteAccess>
        ),
      } satisfies RouteObject
    })
}

const router = createBrowserRouter([
  {
    id: ROOT_ROUTE_ID,
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate replace to="/dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate replace to="/404" />,
  },
])

/**
 * 基于菜单数据动态追加后台子路由
 */
export function addMenuRoutes(menus: MenuItem[]) {
  const routes = createMenuRoutes(menus)

  if (!routes.length) {
    return
  }

  ;(router as PatchableRouter).patchRoutes(ROOT_ROUTE_ID, routes)
}

export default router
