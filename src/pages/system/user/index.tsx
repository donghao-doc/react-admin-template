import { Button, Space, Typography } from 'antd'

function SystemUser() {
  return (
    <div>
      <Typography.Title level={3}>用户管理</Typography.Title>
      <Typography.Text type="secondary">
        当前页面用于承载用户管理相关的列表、筛选和编辑能力，后续可在此基础上继续补充业务功能。
      </Typography.Text>

      <div style={{ marginTop: 24 }}>
        <Space>
          <Button type="primary">新增用户</Button>
          <Button>编辑用户</Button>
          <Button danger>删除用户</Button>
        </Space>
      </div>
    </div>
  )
}

export default SystemUser
