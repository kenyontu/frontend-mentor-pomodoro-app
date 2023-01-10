import { useTimeContext } from '~/contexts/TimeContext'
import { Timer } from './Timer'

export function PomodoroTimer() {
  const { timeSettings } = useTimeContext()

  return (
    <Timer
      key={`pomodoro-${timeSettings.pomodoro}`}
      total={timeSettings.pomodoro}
    />
  )
}
