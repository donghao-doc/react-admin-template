import { create } from 'zustand'

import type { MenuItem, PermissionCode, UserInfo } from '@/types'

type ProfileStatus = 'idle' | 'loading' | 'loaded'

interface ProfileStore {
  userInfo: UserInfo | null
  menus: MenuItem[]
  permissions: PermissionCode[]
  profileStatus: ProfileStatus
  isRoutesReady: boolean
  startLoadingProfile: () => void
  setProfile: (payload: {
    userInfo: UserInfo
    menus: MenuItem[]
    permissions: PermissionCode[]
  }) => void
  setRoutesReady: (value: boolean) => void
  clearProfile: () => void
}

export const useProfileStore = create<ProfileStore>((set) => ({
  userInfo: null,
  menus: [],
  permissions: [],
  profileStatus: 'idle',
  isRoutesReady: false,

  /**
   * 初始化 profile 前进入 loading 状态
   */
  startLoadingProfile() {
    set({
      profileStatus: 'loading',
      isRoutesReady: false,
    })
  },

  setProfile(payload) {
    set({
      userInfo: payload.userInfo,
      menus: payload.menus,
      permissions: payload.permissions,
      profileStatus: 'loaded',
      isRoutesReady: false,
    })
  },

  setRoutesReady(value) {
    set({
      isRoutesReady: value,
    })
  },

  clearProfile() {
    set({
      userInfo: null,
      menus: [],
      permissions: [],
      profileStatus: 'idle',
      isRoutesReady: false,
    })
  },
}))
