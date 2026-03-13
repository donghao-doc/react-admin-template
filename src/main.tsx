import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/i18n'
import 'normalize.css'
import '@/assets/styles/theme.scss'
import './index.scss'

import App from './App.tsx'

async function enableProdMock() {
  /**
   * GitHub Pages 是纯静态托管，这里在生产环境注入浏览器端 mock，
   * 让登录和 profile 初始化在 Pages 演示站点里仍然可用
   */
  if (!(import.meta.env.PROD && import.meta.env.VITE_DEPLOY_TARGET === 'github-pages')) {
    return
  }

  const { createProdMockServer } = await import('vite-plugin-mock/client')
  const { default: mockList } = await import('../mock/index')

  await createProdMockServer(mockList)
}

async function bootstrap() {
  await enableProdMock()

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void bootstrap()
