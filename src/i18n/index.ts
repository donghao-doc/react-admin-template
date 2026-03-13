import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enUSMessages from './locales/en-US'
import zhCNMessages from './locales/zh-CN'

const LANGUAGE_STORAGE_KEY = 'locale'

export const LANGUAGE_OPTIONS = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
] as const

const resources = {
  'zh-CN': {
    translation: zhCNMessages,
  },
  'en-US': {
    translation: enUSMessages,
  },
} as const

function getInitialLanguage() {
  const cachedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)

  if (cachedLanguage === 'zh-CN' || cachedLanguage === 'en-US') {
    return cachedLanguage
  }

  return 'zh-CN'
}

export function getAntdLocale(language: string) {
  return language === 'en-US' ? enUS : zhCN
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'zh-CN',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (language) => {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  document.documentElement.lang = language
})

document.documentElement.lang = i18n.language

export default i18n
