import * as Mock from 'mockjs'
import type { MockMethod, Recordable } from 'vite-plugin-mock'

import { mockAccounts, mockMenusByRole, mockPermissionsByToken, mockUsers } from './data'

interface MockRequestOptions {
  url: Recordable
  body: Recordable
  query: Recordable
  headers: Recordable
}

/**
 * 成功响应体
 */
function createSuccessResponse<T>(data: T, message = '请求成功') {
  return Mock.mock({
    code: 0,
    message,
    data,
  })
}

/**
 * 失败响应体
 */
function createErrorResponse(message: string, code = 1) {
  return Mock.mock({
    code,
    message,
    data: null,
  })
}

/**
 * 从请求头中提取 token
 */
function getToken(headers: Record<string, unknown>) {
  const authorization = headers.authorization ?? headers.Authorization

  if (typeof authorization !== 'string') {
    return ''
  }

  return authorization.replace(/^Bearer\s+/i, '').trim()
}

/**
 * 根据 token 获取用户信息
 */
function getUserByToken(token: string) {
  if (!token) {
    return undefined
  }

  return mockUsers[token]
}

const mockList: MockMethod[] = [
  {
    url: '/api/auth/login',
    method: 'post',
    timeout: 500,
    response: ({ body }: MockRequestOptions) => {
      const username = String(body.username ?? '')
      const password = String(body.password ?? '')

      const matchedAccount = mockAccounts.find((account) => {
        return account.username === username && account.password === password
      })

      if (!matchedAccount) {
        return createErrorResponse('账号或密码错误', 10001)
      }

      return createSuccessResponse(
        {
          token: matchedAccount.token,
        },
        '登录成功',
      )
    },
  },
  {
    url: '/api/auth/user-info',
    method: 'get',
    timeout: 300,
    response: ({ headers }: MockRequestOptions) => {
      const token = getToken(headers)
      const user = getUserByToken(token)

      if (!user) {
        return createErrorResponse('登录状态无效，请重新登录', 401)
      }

      return createSuccessResponse(user)
    },
  },
  {
    url: '/api/auth/menus',
    method: 'get',
    timeout: 300,
    response: ({ headers }: MockRequestOptions) => {
      const token = getToken(headers)
      const user = getUserByToken(token)

      if (!user) {
        return createErrorResponse('登录状态无效，请重新登录', 401)
      }

      return createSuccessResponse(mockMenusByRole[user.role])
    },
  },
  {
    url: '/api/auth/permissions',
    method: 'get',
    timeout: 300,
    response: ({ headers }: MockRequestOptions) => {
      const token = getToken(headers)
      const permissions = mockPermissionsByToken[token]

      if (!permissions) {
        return createErrorResponse('登录状态无效，请重新登录', 401)
      }

      return createSuccessResponse(permissions)
    },
  },
]

export default mockList
