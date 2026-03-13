import { Flex, Spin } from 'antd'
import { useTranslation } from 'react-i18next'

import './index.scss'

interface AppLoadingProps {
  description?: string
  fullscreen?: boolean
}

function AppLoading({
  description,
  fullscreen = false,
}: AppLoadingProps) {
  const { t } = useTranslation()

  return (
    <Flex
      align="center"
      className={`app-loading${fullscreen ? ' app-loading--fullscreen' : ''}`}
      justify="center"
    >
      <Spin description={description ?? t('common.loading')} size="large" />
    </Flex>
  )
}

export default AppLoading
