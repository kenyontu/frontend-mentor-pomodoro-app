import { createContext, useContext } from 'react'
import { AppColor } from '~/config'
import { useLocalStorage } from '~/hooks/useLocalStorage'

type ContextValue = {
  color: AppColor
  setColor: (color: AppColor) => void
}

const AppColorContext = createContext<ContextValue | null>(null)

type ProviderProps = {
  children: React.ReactNode
}

export function AppColorProvider({ children }: ProviderProps) {
  const [color, setColor] = useLocalStorage<AppColor>('app-color', 'orange')

  return (
    <AppColorContext.Provider
      value={{ color, setColor }}
    >
      {children}
    </AppColorContext.Provider>
  )
}

export function useAppColorContext() {
  const value = useContext(AppColorContext)

  if (!value) {
    throw new Error('useAppColorContext must be used within AppColorProvider')
  }

  return value
}
