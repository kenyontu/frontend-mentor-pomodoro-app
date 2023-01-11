import { useEffect, useRef, useState } from 'react'

import styles from './Timer.module.scss'

type TimerState = 'ready' | 'running' | 'paused' | 'finished'

type Props = {
  total: number
}

export function Timer({ total }: Props) {
  const totalTime = total * 60
  const { timeLeft, ...timer } = useTimer(totalTime)

  const actionByState: Record<TimerState, { name: string; fn: () => void }> = {
    'ready': { name: 'Start', fn: timer.start },
    'running': { name: 'Pause', fn: timer.pause },
    'paused': { name: 'Resume', fn: timer.start },
    'finished': { name: 'Restart', fn: timer.restart },
  }

  const radius = 45
  const totalProgressLength = 2 * Math.PI * radius
  const progressLengthPerSecond = totalProgressLength / totalTime
  const progressLength = Math.min(
    (totalTime - timeLeft + 1) * progressLengthPerSecond,
    totalProgressLength,
  )

  const strTime = formatTime(Math.min(timeLeft, totalTime))

  return (
    <button
      className={styles.container}
      onClick={() => actionByState[timer.state].fn()}
    >
      <span className={styles.inner}>
        <span className='sr-only'>{strTime}</span>
        <span className={styles.time} aria-hidden>
          <span className={styles.digit}>{strTime.charAt(0)}</span>
          <span className={styles.digit}>{strTime.charAt(1)}</span>
          {':'}
          <span className={styles.digit}>{strTime.charAt(3)}</span>
          <span className={styles.digit}>{strTime.charAt(4)}</span>
        </span>
        <span className={styles.action}>{actionByState[timer.state].name}</span>
      </span>

      <svg
        viewBox='0 0 100 100'
        className={styles.circularProgressBar}
        aria-hidden
      >
        <circle
          cx='50'
          cy='50'
          r={radius}
          strokeDasharray={totalProgressLength}
          strokeDashoffset={progressLength}
        >
        </circle>
      </svg>
    </button>
  )
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds - mins * 60

  return `${padZeros(mins.toString())}:${padZeros(secs.toString())}`
}

function padZeros(strNumber: string) {
  return '00'.slice(0, 2 - strNumber.length) + strNumber
}

function useTimer(totalTime: number) {
  const [timerState, setTimerState] = useState<TimerState>('ready')
  const [timeLeft, setTimeLeft] = useState(totalTime + 1)

  // Instead of having time updates each millisecond, this timer updates on each second and calculates the elapsed milliseconds based on when the the user starts and pauses it.
  const lastStarted = useRef(Date.now())

  // Starts with 1000 because we want our timer to
  const elapsedMillis = useRef(1000)

  // Holds the identifier of the interval which decreases the remaining seconds by 1
  const interval = useRef<number | null>(null)

  // Holds the indentifer of the timeout used to defer the start of [interval]
  const timeout = useRef<number | null>(null)

  // Utility function to clear the current interval if any
  const stopInterval = () => {
    if (interval.current !== null) {
      clearInterval(interval.current)
      interval.current = null
    }
  }

  // Utility function to clear the current timeout if any
  const stopTimeout = () => {
    if (typeof timeout.current === 'number') {
      clearTimeout(timeout.current)
      timeout.current = null
    }
  }

  useEffect(() => {
    if (timeLeft === 0) {
      setTimerState('finished')
      stopInterval()
    }
  }, [timeLeft])

  useEffect(() => {
    return () => {
      stopInterval()
      stopTimeout()
    }
  }, [])

  const start = () => {
    setTimerState('running')
    lastStarted.current = Date.now()

    timeout.current = setTimeout(() => {
      elapsedMillis.current = 0
      setTimeLeft(left => left - 1)
      interval.current = setInterval(
        () => {
          elapsedMillis.current = 0
          lastStarted.current = Date.now()
          setTimeLeft(left => left - 1)
        },
        1000,
      )

      timeout.current = null
    }, 1000 - elapsedMillis.current)
  }

  const pause = () => {
    setTimerState('paused')
    stopInterval()
    stopTimeout()
    const timeDiff = Date.now() - lastStarted.current
      + elapsedMillis.current

    if (timeDiff < 1000) {
      elapsedMillis.current = timeDiff
    }
  }

  const restart = () => {
    setTimerState('ready')
    setTimeLeft(totalTime + 1)
    elapsedMillis.current = 1000
  }

  return {
    state: timerState,
    start,
    pause,
    restart,
    timeLeft,
  }
}
