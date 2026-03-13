import { Space, Typography } from 'antd'

import PermissionButton from '@/components/permission-button'

function SystemUser() {
  return (
    <div>
      <Typography.Title level={3}>用户管理</Typography.Title>
      <Typography.Text type="secondary">
        当前页面用于承载用户管理相关的列表、筛选和编辑能力，后续可在此基础上继续补充业务功能。
      </Typography.Text>

      <div style={{ marginTop: 24 }}>
        <Space>
          <PermissionButton permissionCode="system:user:view">
            查看用户
          </PermissionButton>
          <PermissionButton permissionCode="system:user:create" type="primary">
            新增用户
          </PermissionButton>
          <PermissionButton permissionCode="system:user:edit">
            编辑用户
          </PermissionButton>
          <PermissionButton danger permissionCode="system:user:delete">
            删除用户
          </PermissionButton>
        </Space>
      </div>
    </div>
  )
}

export default SystemUser
