import type { ApiResponse } from '@/types'

import http from './http'
import type { RequestConfig } from './types'

/**
 * GET 请求
 * 在这里统一取出 response.data，业务侧直接拿到后端返回的业务响应对象
 */
export function get<T = unknown, P = Record<string, unknown>>(
  url: string,
  params?: P,
  config?: RequestConfig,
): Promise<ApiResponse<T>> {
  return http
    .get<ApiResponse<T>>(url, {
      ...config,
      params,
    })
    .then((response) => response.data)
}

/**
 * POST 请求
 * 在这里统一取出 response.data，业务侧直接拿到后端返回的业务响应对象
 */
export function post<T = unknown, D = unknown>(
  url: string,
  data?: D,
  config?: RequestConfig<D>,
): Promise<ApiResponse<T>> {
  return http.post<ApiResponse<T>>(url, data, config).then((response) => response.data)
}

export { http }
