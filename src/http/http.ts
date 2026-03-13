import { message } from 'antd'
import axios, {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
} from 'axios'
import i18n from '@/i18n'

import { useAuthStore } from '@/store'
import type { ApiResponse } from '@/types'
import type { RequestConfig } from './types'
import { handleUnauthorized, shouldShowErrMsg } from './utils'

/**
 * 统一 axios 实例
 */
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/**
 * 请求拦截器
 * 如果本地存在 token，则自动注入到 Authorization 请求头中
 */
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token
    if (!token) {
      return config
    }

    const headers = AxiosHeaders.from(config.headers)
    headers.set('Authorization', `Bearer ${token}`)
    config.headers = headers

    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

/**
 * 响应拦截器
 * 统一处理错误提示
 */
http.interceptors.response.use(
  // HTTP 请求成功的回调（状态码 2xx）
  (response) => {
    const responseData = response.data

    // 业务成功
    // 这里保持 axios 默认返回值不变，继续返回完整的 response
    // 这样 get / post 封装就可以按需决定是否向业务侧暴露 response.data
    if (responseData.code === 0) {
      return response
    }

    // 业务失败
    // 如果当前请求没有关闭错误提示，就弹出后端 message
    if (responseData.message && shouldShowErrMsg(response.config as RequestConfig | undefined)) {
      message.error(responseData.message)
    }

    // 登录态已失效
    if (responseData.code === 401) {
      handleUnauthorized()
    }

    // reject 的是后端返回的业务响应对象
    // 业务侧可以在 catch 中直接拿到 {code/message/data}
    return Promise.reject(responseData)
  },
  // HTTP 请求异常的回调（状态码非 2xx）
  (error: AxiosError<ApiResponse<null>>) => {
    if (!shouldShowErrMsg(error.config as RequestConfig | undefined)) {
      return Promise.reject(error)
    }

    // 有 response，说明请求已经到达服务端，服务端也返回了响应
    // 但 HTTP 状态码不是 2xx，所以 axios 仍然把它当作错误
    // 优先使用后端返回的 message，其次才回退到 axios 自带的错误信息
    if (error.response) {
      // 服务端直接返回了 HTTP 401，说明当前请求已被鉴权层拦截，登录态已失效
      if (error.response.status === 401) {
        handleUnauthorized()
      }

      const responseData = error.response.data
      const errorMessage = responseData?.message || error.message || i18n.t('http.requestFailed')
      message.error(errorMessage)
      return Promise.reject(error)
    }

    // 有 request 但没有 response，说明请求已经发出，但没有收到任何响应
    // 常见于断网、超时、跨域拦截等网络层问题
    if (error.request) {
      message.error(i18n.t('http.networkError'))
      return Promise.reject(error)
    }

    // 既没有 response，也没有 request
    // 通常说明错误发生在“请求真正发出之前”，例如配置错误、参数处理异常等
    message.error(error.message || i18n.t('http.unknownError'))
    return Promise.reject(error)
  },
)

export default http
