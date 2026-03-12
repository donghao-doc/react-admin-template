import type { PermissionCode, UserRole } from './permission'

/**
 * 用户信息
 */
export interface UserInfo {
  id: string
  username: string
  nickname: string
  avatar: string
  role: UserRole
  permissions: PermissionCode[]
}
