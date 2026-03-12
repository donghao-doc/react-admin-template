import { get, post } from '@/http'
import type {
  ApiResponse,
  AuthProfile,
  LoginPayload,
  LoginResult,
} from '@/types'

/**
 * 登录
 */
export function loginApi(data: LoginPayload): Promise<ApiResponse<LoginResult>> {
  return post<LoginResult, LoginPayload>('/api/auth/login', data)
}

/**
 * 获取登录后初始化数据
 */
export function getProfileApi(): Promise<ApiResponse<AuthProfile>> {
  return get<AuthProfile>('/api/auth/profile')
}
