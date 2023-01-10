import { ComponentProps } from 'react'

import styles from './TimeInput.module.scss'

const numberRegex = /^[0-9]+$/

type Props = {
  value: number
  onChange: (value: number) => void
} & Pick<ComponentProps<'input'>, 'id'>

export function TimeInput(
  { value, onChange, ...inputProps }: Props,
) {
  return (
    <div className={styles.container}>
      <input
        type='number'
        className={styles.input}
        value={value.toString()}
        onChange={(event) => {
          const newValue = event.target.value.replace(/^0+/g, '')
          if (newValue.length === 0) {
            onChange(0)
            return
          }
          if (numberRegex.test(newValue)) {
            onChange(parseInt(newValue))
          }
        }}
        {...inputProps}
      />
      <div className={styles.btnContainer}>
        <button
          className={styles.increaseBtn}
          onClick={() => onChange(value + 1)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 14 7'
            aria-hidden
          >
            <path
              fill='none'
              stroke='#1E213F'
              strokeOpacity='.25'
              strokeWidth='2'
              d='M1 6l6-4 6 4'
            />
          </svg>
          <span className='sr-only'>Increase by 1</span>
        </button>
        <button
          className={styles.decreaseBtn}
          onClick={() => {
            if (value > 1) {
              onChange(value - 1)
            }
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 14 7'
            aria-hidden
          >
            <path
              fill='none'
              stroke='#1E213F'
              strokeOpacity='.25'
              strokeWidth='2'
              d='M1 1l6 4 6-4'
            />
          </svg>
          <span className='sr-only'>Decrease by 1</span>
        </button>
      </div>
    </div>
  )
}
