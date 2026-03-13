import { Button, Result, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

function Forbidden() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Result
      status="403"
      title="403"
      subTitle={t('exception.forbidden')}
      extra={(
        <Space>
          <Button type="primary" onClick={() => navigate('/dashboard')}>
            {t('common.backHome')}
          </Button>
          <Button onClick={() => navigate(-1)}>
            {t('common.backPrevious')}
          </Button>
        </Space>
      )}
    />
  )
}

export default Forbidden
