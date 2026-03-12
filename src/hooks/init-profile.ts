import { useEffect } from 'react'

import { getProfileApi } from '@/api'
import { useAuthStore, useProfileStore } from '@/store'

/**
 * 基于 token 初始化用户信息、菜单树、权限等数据，并在刷新页面时重新初始化
 */
export function useInitProfile() {
  const token = useAuthStore((state) => state.token)
  const profileStatus = useProfileStore((state) => state.profileStatus)
  const clearProfile = useProfileStore((state) => state.clearProfile)
  const setProfile = useProfileStore((state) => state.setProfile)
  const startLoadingProfile = useProfileStore((state) => state.startLoadingProfile)

  useEffect(() => {
    // 没有 token，这里不用跳转登录页，跳转登录页由路由守卫控制
    if (!token) {
      clearProfile()
      return
    }

    // 非空闲状态
    if (profileStatus !== 'idle') {
      return
    }

    startLoadingProfile()

    getProfileApi()
      .then((res) => {
        setProfile(res.data)
      })
      .catch(() => {
        clearProfile()
      })
  }, [clearProfile, profileStatus, setProfile, startLoadingProfile, token])
}
