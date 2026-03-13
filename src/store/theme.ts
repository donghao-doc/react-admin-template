import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeMode = 'light' | 'dark'

interface ThemeStore {
  themeMode: ThemeMode
  setThemeMode: (themeMode: ThemeMode) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      themeMode: 'light',

      /**
       * 切换全局主题模式
       */
      setThemeMode(themeMode) {
        set({ themeMode })
      },
    }),
    {
      name: 'theme',
      partialize: (state) => ({
        themeMode: state.themeMode,
      }),
    },
  ),
)
