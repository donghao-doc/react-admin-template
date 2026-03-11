import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from '@/router'

function AppLoading() {
  return <div>页面加载中...</div>
}

function App() {
  return (
    <Suspense fallback={<AppLoading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
