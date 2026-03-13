import { useEffect } from 'react'

import { useThemeStore } from '@/store'

/**
 * 将当前主题模式同步到根节点，供全局样式变量和浏览器原生控件共同响应
 */
export function useInitTheme() {
  const themeMode = useThemeStore((state) => state.themeMode)

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode
    document.documentElement.style.colorScheme = themeMode
  }, [themeMode])

  return themeMode
}
