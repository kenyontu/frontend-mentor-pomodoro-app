import { useTimeContext } from '~/contexts/TimeContext'
import { Timer } from './Timer'

export function LongBreakTimer() {
  const { timeSettings } = useTimeContext()

  return (
    <Timer
      key={`longBreak-${timeSettings.longBreak}`}
      total={timeSettings.longBreak}
    />
  )
}
