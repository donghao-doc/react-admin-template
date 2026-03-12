/**
 * 通用接口响应结构
 */
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}
