import { createContext, useContext, useMemo } from 'react'
import { AppFontFamily } from '~/config'
import { useLocalStorage } from '~/hooks/useLocalStorage'

type ContextValue = {
  fontFamily: AppFontFamily
  setFontFamily: (fontFamily: AppFontFamily) => void
}

const AppFontContext = createContext<ContextValue | null>(null)

type ProviderProps = {
  children: React.ReactNode
}

export function AppFontProvider({ children }: ProviderProps) {
  const [fontFamily, setFontFamily] = useLocalStorage<
    AppFontFamily
  >('app-font', 'kumbhSans')

  const value = useMemo(() => {
    return { fontFamily, setFontFamily }
  }, [fontFamily, setFontFamily])

  return (
    <AppFontContext.Provider
      value={value}
    >
      {children}
    </AppFontContext.Provider>
  )
}

export function useAppFontContext() {
  const value = useContext(AppFontContext)

  if (!value) {
    throw new Error('useAppFontContext must be used within AppFontProvider')
  }

  return value
}
