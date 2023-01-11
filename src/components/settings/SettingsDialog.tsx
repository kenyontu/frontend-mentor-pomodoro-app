import { useEffect, useRef, useState } from 'react'
import { AppColor, AppFontFamily } from '~/config'
import { TimeSettings } from '~/contexts/TimeContext'
import { ColorSelector } from './ColorSelector'
import { FontFamilySelector } from './FontFamilySelector'

import styles from './SettingsDialog.module.scss'
import { TimeInput } from './TimeInput'

type Props = {
  open: boolean
  onClose: () => void
  initialFontFamily: AppFontFamily
  initialColor: AppColor
  initialTimeSettings: TimeSettings
  onApply: (
    color: AppColor,
    fontFamily: AppFontFamily,
    timeSettings: TimeSettings,
  ) => void
}

export function SettingsDialog(
  {
    open,
    onClose,
    initialFontFamily,
    initialColor,
    initialTimeSettings,
    onApply,
  }: Props,
) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const [pomodoroTime, setPomodoroTime] = useState(initialTimeSettings.pomodoro)
  const [shortBreakTime, setShortBreakTime] = useState(
    initialTimeSettings.shortBreak,
  )
  const [longBreakTime, setLongBreakTime] = useState(
    initialTimeSettings.longBreak,
  )
  const [fontFamily, setFontFamily] = useState<AppFontFamily>(initialFontFamily)
  const [color, setColor] = useState<AppColor>(initialColor)

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }

    return () => {
      if (dialogRef.current?.open) {
        dialogRef.current.close()
      }
    }
  }, [open])

  return (
    <dialog
      className={styles.dialog}
      ref={dialogRef}
      onClose={() => {
        setPomodoroTime(initialTimeSettings.pomodoro)
        setShortBreakTime(initialTimeSettings.shortBreak)
        setLongBreakTime(initialTimeSettings.longBreak)
        setColor(initialColor)
        setFontFamily(initialFontFamily)
        onClose()
      }}
    >
      <div className={styles.wrapper}>
        <header>
          <h1 className={styles.title}>Settings</h1>
          <button onClick={onClose} className={styles.closeBtn}>
            <span className='sr-only'>Close</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 14 14'
              aria-hidden
            >
              <path
                fill='#1E213F'
                fillRule='evenodd'
                d='M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z'
                opacity='.5'
              />
            </svg>
          </button>
        </header>
        <div className={styles.main}>
          <div className={styles.timeSection}>
            <h2 className={styles.sectionTitle}>Time (minutes)</h2>
            <div className={styles.timeInputs}>
              <div className={styles.timeSetting}>
                <label htmlFor='pomodoro-time-input'>pomodoro</label>
                <TimeInput
                  id='pomodoro-time-input'
                  value={pomodoroTime}
                  onChange={setPomodoroTime}
                />
              </div>

              <div className={styles.timeSetting}>
                <label htmlFor='short-break-input'>short break</label>
                <TimeInput
                  id='short-break-input'
                  value={shortBreakTime}
                  onChange={setShortBreakTime}
                />
              </div>

              <div className={styles.timeSetting}>
                <label htmlFor='long-break-input'>long break</label>
                <TimeInput
                  id='long-break-input'
                  value={longBreakTime}
                  onChange={setLongBreakTime}
                />
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Font</h2>
            <FontFamilySelector
              className={styles.fontFamilySelector}
              selected={fontFamily}
              onChange={setFontFamily}
            />
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Color</h2>
            <ColorSelector
              className={styles.colorSelector}
              selected={color}
              onChange={setColor}
            />
          </div>
        </div>
        <button
          className={styles.applyBtn}
          onClick={() =>
            onApply(color, fontFamily, {
              pomodoro: clampTime(pomodoroTime),
              shortBreak: clampTime(shortBreakTime),
              longBreak: clampTime(longBreakTime),
            })}
        >
          Apply
        </button>
      </div>
    </dialog>
  )
}

function clampTime(time: number) {
  return Math.min(Math.max(time, 1), 99)
}
