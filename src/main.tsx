import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/i18n'
import 'normalize.css'
import '@/assets/styles/theme.scss'
import './index.scss'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
