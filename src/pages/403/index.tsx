import { Button, Result, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

function Forbidden() {
  const navigate = useNavigate()

  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，你当前没有权限访问这个页面。"
      extra={(
        <Space>
          <Button type="primary" onClick={() => navigate('/dashboard')}>
            返回首页
          </Button>
          <Button onClick={() => navigate(-1)}>
            返回上一页
          </Button>
        </Space>
      )}
    />
  )
}

export default Forbidden
