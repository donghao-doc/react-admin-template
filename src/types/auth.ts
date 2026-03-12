/**
 * 登录表单提交参数
 */
export interface LoginPayload {
  username: string
  password: string
  remember: boolean
}

/**
 * 登录接口返回结果
 */
export interface LoginResult {
  token: string
}
