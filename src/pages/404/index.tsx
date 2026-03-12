import { Button, Result, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

import './index.scss'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <Result
        status="404"
        title="404"
        subTitle="抱歉，你访问的页面不存在或已被移除。"
        extra={(
          <Space>
            <Button type="primary" onClick={() => navigate('/dashboard')}>
              返回首页
            </Button>
            <Button onClick={() => navigate('/login')}>
              去登录页
            </Button>
          </Space>
        )}
      />
    </div>
  )
}

export default NotFound
