import { Suspense, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { useInitProfile } from '@/hooks/init-profile'
import { useProfileStore } from '@/store'
import router, { addMenuRoutes } from '@/router'

function AppLoading() {
  return <div>页面加载中...</div>
}

function App() {
  useInitProfile()
  const menus = useProfileStore((state) => state.menus)

  useEffect(() => {
    addMenuRoutes(menus)
  }, [menus])

  return (
    <Suspense fallback={<AppLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
