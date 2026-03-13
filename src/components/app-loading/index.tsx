import { Flex, Spin } from 'antd'

import './index.scss'

interface AppLoadingProps {
  description?: string
  fullscreen?: boolean
}

function AppLoading({
  description = '页面加载中...',
  fullscreen = false,
}: AppLoadingProps) {
  return (
    <Flex
      align="center"
      className={`app-loading${fullscreen ? ' app-loading--fullscreen' : ''}`}
      justify="center"
    >
      <Spin description={description} size="large" />
    </Flex>
  )
}

export default AppLoading
