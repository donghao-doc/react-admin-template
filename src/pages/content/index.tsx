import { Typography } from 'antd'

function Content() {
  return (
    <div>
      <Typography.Title level={3}>内容管理</Typography.Title>
      <Typography.Text type="secondary">
        当前页面用于承载内容管理相关的业务模块，后续可继续扩展列表、发布和审核等能力。
      </Typography.Text>
    </div>
  )
}

export default Content
