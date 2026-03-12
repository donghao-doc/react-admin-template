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
