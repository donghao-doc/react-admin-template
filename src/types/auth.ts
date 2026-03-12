/**
 * 角色编码
 */
export type UserRole = 'admin' | 'editor' | 'visitor'

/**
 * 按钮权限编码
 */
export type PermissionCode =
  | 'dashboard:view'
  | 'system:user:view'
  | 'system:user:create'
  | 'system:user:edit'
  | 'system:user:delete'
  | 'content:view'
  | 'content:publish'

/**
 * 菜单项元信息
 */
export interface MenuMeta {
  title: string
  icon?: string
}

/**
 * 后台菜单树节点
 */
export interface MenuItem {
  key: string
  path: string
  name: string
  meta: MenuMeta
  children?: MenuItem[]
}

/**
 * 用户信息
 */
export interface UserInfo {
  id: string
  username: string
  nickname: string
  avatar: string
  role: UserRole
}

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

/**
 * 登录后初始化上下文数据
 */
export interface AuthProfile {
  userInfo: UserInfo
  menus: MenuItem[]
  permissions: PermissionCode[]
}
