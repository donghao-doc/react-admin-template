import { get, post } from '@/http'
import type {
  ApiResponse,
  LoginPayload,
  LoginResult,
  MenuItem,
  PermissionCode,
  UserInfo,
} from '@/types'

/**
 * 登录
 */
export function loginApi(data: LoginPayload): Promise<ApiResponse<LoginResult>> {
  return post<LoginResult, LoginPayload>('/api/auth/login', data)
}

/**
 * 获取用户信息
 */
export function getUserInfoApi(): Promise<ApiResponse<UserInfo>> {
  return get<UserInfo>('/api/auth/user-info')
}

/**
 * 获取用户菜单树
 */
export function getMenusApi(): Promise<ApiResponse<MenuItem[]>> {
  return get<MenuItem[]>('/api/auth/menus')
}

/**
 * 获取用户按钮权限
 */
export function getPermissionsApi(): Promise<ApiResponse<PermissionCode[]>> {
  return get<PermissionCode[]>('/api/auth/permissions')
}
