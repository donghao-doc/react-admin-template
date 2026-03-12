import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuthStore, useProfileStore } from '@/store'

interface RouteGuardProps {
  children: ReactNode
}

/**
 * 用户数据初始化期间的加载态
 */
function GuardLoading() {
  return <div>页面加载中...</div>
}

/**
 * 受保护路由守卫：
 * 1. 未登录时跳转登录页
 * 2. 已登录但 profile 还未完成初始化时显示加载态
 */
export function ProtectedRoute({ children }: RouteGuardProps) {
  const location = useLocation()
  const token = useAuthStore((state) => state.token)
  const profileStatus = useProfileStore((state) => state.profileStatus)

  if (!token) {
    return (
      <Navigate replace state={{ from: location }} to="/login" />
    )
  }

  if (profileStatus === 'idle' || profileStatus === 'loading') {
    return <GuardLoading />
  }

  return <>{children}</>
}

/**
 * 公共路由守卫：
 * 已登录用户不应继续停留在登录页
 */
export function PublicRoute({ children }: RouteGuardProps) {
  const token = useAuthStore((state) => state.token)
  const profileStatus = useProfileStore((state) => state.profileStatus)

  if (token && profileStatus === 'loaded') {
    return <Navigate replace to="/dashboard" />
  }

  if (token && (profileStatus === 'idle' || profileStatus === 'loading')) {
    return <GuardLoading />
  }

  return <>{children}</>
}
