import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

type RouteComponent = LazyExoticComponent<ComponentType>

/**
 * 本地路由组件注册表
 * 菜单数据只决定路由是否启用，具体渲染哪个组件仍由前端维护
 */
export const routeComponentMap: Record<string, RouteComponent> = {
  '/dashboard': lazy(() => import('@/pages/dashboard')),
  '/system/user': lazy(() => import('@/pages/system/user')),
  '/content': lazy(() => import('@/pages/content')),
}
