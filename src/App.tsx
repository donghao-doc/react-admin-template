import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import { useInitProfile } from '@/hooks/init-profile'
import router from '@/router'

function AppLoading() {
  return <div>页面加载中...</div>
}

function App() {
  useInitProfile()

  return (
    <Suspense fallback={<AppLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
