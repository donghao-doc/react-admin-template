import type {
  LoginPayload,
  LoginResult,
  MenuItem,
  PermissionCode,
  UserInfo,
  UserRole,
} from '../src/types'

interface MockAccount extends LoginPayload {
  token: string
  userId: string
  role: UserRole
}

/**
 * 演示账号列表
 */
export const mockAccounts: MockAccount[] = [
  {
    username: 'admin',
    password: '123456',
    remember: false,
    token: 'token_admin',
    userId: 'u_admin',
    role: 'admin',
  },
  {
    username: 'editor',
    password: '123456',
    remember: false,
    token: 'token_editor',
    userId: 'u_editor',
    role: 'editor',
  },
  {
    username: 'visitor',
    password: '123456',
    remember: false,
    token: 'token_visitor',
    userId: 'u_visitor',
    role: 'visitor',
  },
]

/**
 * token 到登录结果的映射
 */
export const mockLoginResults: Record<string, LoginResult> = {
  token_admin: {
    token: 'token_admin',
  },
  token_editor: {
    token: 'token_editor',
  },
  token_visitor: {
    token: 'token_visitor',
  },
}

/**
 * 用户信息映射
 */
export const mockUsers: Record<string, UserInfo> = {
  token_admin: {
    id: 'u_admin',
    username: 'admin',
    nickname: '超级管理员',
    avatar: '',
    role: 'admin',
    permissions: [
      'dashboard:view',
      'system:user:view',
      'system:user:create',
      'system:user:edit',
      'system:user:delete',
      'content:view',
      'content:publish',
    ],
  },
  token_editor: {
    id: 'u_editor',
    username: 'editor',
    nickname: '内容运营',
    avatar: '',
    role: 'editor',
    permissions: [
      'dashboard:view',
      'system:user:view',
      'content:view',
      'content:publish',
    ],
  },
  token_visitor: {
    id: 'u_visitor',
    username: 'visitor',
    nickname: '只读访客',
    avatar: '',
    role: 'visitor',
    permissions: ['dashboard:view', 'system:user:view', 'content:view'],
  },
}

/**
 * 按角色区分的菜单树
 */
export const mockMenusByRole: Record<UserRole, MenuItem[]> = {
  admin: [
    {
      key: 'dashboard',
      path: '/dashboard',
      name: 'Dashboard',
      meta: {
        title: '工作台',
        icon: 'DashboardOutlined',
      },
    },
    {
      key: 'system',
      path: '/system',
      name: 'System',
      meta: {
        title: '系统管理',
        icon: 'SettingOutlined',
      },
      children: [
        {
          key: 'system-user',
          path: '/system/user',
          name: 'SystemUser',
          meta: {
            title: '用户管理',
            icon: 'TeamOutlined',
          },
        },
      ],
    },
    {
      key: 'content',
      path: '/content',
      name: 'Content',
      meta: {
        title: '内容管理',
        icon: 'ReadOutlined',
      },
    },
  ],
  editor: [
    {
      key: 'dashboard',
      path: '/dashboard',
      name: 'Dashboard',
      meta: {
        title: '工作台',
        icon: 'DashboardOutlined',
      },
    },
    {
      key: 'content',
      path: '/content',
      name: 'Content',
      meta: {
        title: '内容管理',
        icon: 'ReadOutlined',
      },
    },
  ],
  visitor: [
    {
      key: 'dashboard',
      path: '/dashboard',
      name: 'Dashboard',
      meta: {
        title: '工作台',
        icon: 'DashboardOutlined',
      },
    },
  ],
}

/**
 * 按 token 提供按钮权限列表
 */
export const mockPermissionsByToken: Record<string, PermissionCode[]> = {
  token_admin: mockUsers.token_admin.permissions,
  token_editor: mockUsers.token_editor.permissions,
  token_visitor: mockUsers.token_visitor.permissions,
}
