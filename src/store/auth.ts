import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  token: string
  setToken: (token: string) => void
  clearToken: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: '',

      setToken(token) {
        set({ token })
      },

      clearToken() {
        set({ token: '' })
      },
    }),
    {
      name: 'token',
      partialize: (state) => ({
        token: state.token,
      }),
    },
  ),
)
