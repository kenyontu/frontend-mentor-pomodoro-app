import clsx from 'clsx'
import styles from './SlidingSelector.module.scss'

export type SlidingOption = {
  id: string
  name: string
}

type Props = {
  className?: string
  name: string
  options: SlidingOption[]
  selectedOption: SlidingOption['id']
  onChange: (option: SlidingOption) => void
}

export function SlidingSelector(
  { className, name, options, selectedOption, onChange }: Props,
) {
  return (
    <div className={clsx(styles.container, className)} role='radiogroup'>
      {options.map(option => (
        <div key={option.id} className={styles.option}>
          <input
            id={option.id}
            type='radio'
            name={name}
            checked={option.id === selectedOption}
            onChange={() => onChange(option)}
          />
          <label htmlFor={option.id}>
            {option.name}
          </label>
        </div>
      ))}
      <div
        className={clsx(styles.slidingIndicator, {
          [styles.firstSelected]: selectedOption === options[0]?.id,
          [styles.secondSelected]: selectedOption === options[1]?.id,
          [styles.thirdSelected]: selectedOption === options[2]?.id,
        })}
      >
      </div>
    </div>
  )
}
