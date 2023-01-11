import { useState } from 'react'
import styles from './App.module.scss'
import { SettingsButton } from './components/settings'
import { SlidingOption, SlidingSelector } from './components/SlidingSelector'
import { LongBreakTimer } from './components/timer/LongBreakTimer'
import { PomodoroTimer } from './components/timer/PomodoroTimer'
import { ShortBreakTimer } from './components/timer/ShortBreakTimer'

const timers: SlidingOption[] = [
  { id: 'pomodoro', name: 'pomodoro' },
  { id: 'shortBreak', name: 'short break' },
  { id: 'longBreak', name: 'long break' },
]

function App() {
  const [timer, setTimer] = useState<SlidingOption>(timers[0])

  return (
    <main className={styles.container}>
      <h1 className={styles.appName}>pomodoro</h1>
      <SlidingSelector
        className={styles.timerSelector}
        name='timer-selector'
        options={timers}
        selectedOption={timer.id}
        onChange={timer => setTimer(timer)}
      />
      {timer.id === 'pomodoro' && <PomodoroTimer />}
      {timer.id === 'shortBreak' && <ShortBreakTimer />}
      {timer.id === 'longBreak' && <LongBreakTimer />}
      <SettingsButton className={styles.settingsBtn} />
    </main>
  )
}

export default App
