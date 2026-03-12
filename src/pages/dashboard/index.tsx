import { Typography } from 'antd'

function Dashboard() {
  return (
    <div>
      <Typography.Title level={3}>Dashboard</Typography.Title>
      <Typography.Text type="secondary">
        当前页面用于承载管理后台首页内容，后续可继续补充统计卡片、快捷入口和数据概览。
      </Typography.Text>
    </div>
  )
}

export default Dashboard
