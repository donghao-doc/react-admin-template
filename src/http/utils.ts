import router from '@/router'
import { useAuthStore, useProfileStore } from '@/store'

import type { RequestConfig } from './types'

let isRedirectingToLogin = false

/**
 * 判断当前请求失败时是否需要弹出错误提示
 */
export function shouldShowErrMsg(config?: RequestConfig) {
  return config?.showErrMsg !== false
}

/**
 * 401 时统一清空 token 并跳回登录页
 */
export function handleUnauthorized() {
  useAuthStore.getState().clearToken()
  useProfileStore.getState().clearProfile()

  if (isRedirectingToLogin) {
    return
  }

  if (router.state.location.pathname === '/login') {
    return
  }

  isRedirectingToLogin = true

  router.navigate('/login', {
    replace: true,
  }).finally(() => {
    isRedirectingToLogin = false
  })
}
