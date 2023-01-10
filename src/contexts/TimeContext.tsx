import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '~/hooks/useLocalStorage'

export type TimeSettings = {
  pomodoro: number
  shortBreak: number
  longBreak: number
}

type ContextValue = {
  timeSettings: TimeSettings
  setTimeSettings: (timeSettings: TimeSettings) => void
}

const TimeContext = createContext<ContextValue | null>(null)

type ProviderProps = {
  children: React.ReactNode
}

export function TimeProvider({ children }: ProviderProps) {
  const [timeSettings, setTimeSettings] = useLocalStorage(
    'time-settings',
    { pomodoro: 25, shortBreak: 5, longBreak: 15 },
  )

  const value = useMemo(
    () => ({ timeSettings: timeSettings, setTimeSettings }),
    [timeSettings, setTimeSettings],
  )

  return (
    <TimeContext.Provider value={value}>
      {children}
    </TimeContext.Provider>
  )
}

export function useTimeContext() {
  const value = useContext(TimeContext)

  if (!value) {
    throw new Error('useTimeContext must be used within TimeProvider')
  }

  return value
}
