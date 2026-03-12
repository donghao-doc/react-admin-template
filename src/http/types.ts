import type { AxiosRequestConfig } from 'axios'

/**
 * 对业务侧暴露的请求配置类型
 * 复用 axios 配置，并透出 showErrMsg 扩展字段
 */
export interface RequestConfig<D = unknown> extends AxiosRequestConfig<D> {
  showErrMsg?: boolean
}
