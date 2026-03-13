import { Button, Result, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import './index.scss'

function NotFound() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <Result
        status="404"
        title="404"
        subTitle={t('exception.notFound')}
        extra={(
          <Space>
            <Button type="primary" onClick={() => navigate('/dashboard')}>
              {t('common.backHome')}
            </Button>
            <Button onClick={() => navigate('/login')}>
              {t('common.goLogin')}
            </Button>
          </Space>
        )}
      />
    </div>
  )
}

export default NotFound
