import { Suspense, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { App as AntdApp, ConfigProvider, theme as antdTheme } from 'antd'
import { useTranslation } from 'react-i18next'

import AppLoading from '@/components/app-loading'
import { useInitProfile, useInitTheme } from '@/hooks'
import { getAntdLocale } from '@/i18n'
import { useAuthStore, useProfileStore } from '@/store'
import router, { addMenuRoutes } from '@/router'

function App() {
  useInitProfile()
  const themeMode = useInitTheme()
  const { i18n } = useTranslation()
  const token = useAuthStore((state) => state.token)
  const menus = useProfileStore((state) => state.menus)
  const profileStatus = useProfileStore((state) => state.profileStatus)
  const isRoutesReady = useProfileStore((state) => state.isRoutesReady)
  const setRoutesReady = useProfileStore((state) => state.setRoutesReady)
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language

  useEffect(() => {
    if (token && profileStatus !== 'loaded') {
      setRoutesReady(false)
      return
    }

    addMenuRoutes(menus)
    setRoutesReady(true)
  }, [menus, profileStatus, setRoutesReady, token])

  /**
   * 已登录时，先等待 profile 初始化并同步完动态路由，再渲染 RouterProvider
   * 这样刷新页面或直接输入动态路由地址时，不会走到 404
   */
  const appContent = token && !isRoutesReady
    ? <AppLoading fullscreen />
    : (
        <Suspense fallback={<AppLoading fullscreen />}>
          <RouterProvider router={router} />
        </Suspense>
      )

  return (
    <ConfigProvider
      locale={getAntdLocale(currentLanguage)}
      theme={{
        algorithm:
          themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <AntdApp>
        {appContent}
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
