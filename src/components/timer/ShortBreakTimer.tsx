import { useTimeContext } from '~/contexts/TimeContext'
import { Timer } from './Timer'

export function ShortBreakTimer() {
  const { timeSettings } = useTimeContext()

  return (
    <Timer
      key={`shortBreak-${timeSettings.shortBreak}`}
      total={timeSettings.shortBreak}
    />
  )
}
