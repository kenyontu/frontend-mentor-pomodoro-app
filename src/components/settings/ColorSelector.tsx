import clsx from 'clsx'
import { AppColor, appColors } from '~/config'
import styles from './ColorSelector.module.scss'

const colorClassMapping: Record<AppColor, string> = {
  'orange': styles.colorOrange,
  'aqua': styles.colorAqua,
  'purple': styles.colorPurple,
}

type Props = {
  className?: string
  selected: AppColor
  onChange: (color: AppColor) => void
}

export function ColorSelector({ className, selected, onChange }: Props) {
  return (
    <div
      className={clsx(styles.container, className)}
      role='radiogroup'
      aria-labelledby='color-selector-label'
    >
      <p id='color-selector-label' className='sr-only'>
        Select the application color
      </p>
      {appColors.map(color => (
        <div className={styles.option} key={color}>
          <input
            id={color}
            type='radio'
            name='color'
            className={styles.optionRadio}
            checked={color === selected}
            onChange={() => onChange(color)}
          />
          <label className={colorClassMapping[color]} htmlFor={color}>
            <span className='sr-only'>{color}</span>
          </label>
        </div>
      ))}
    </div>
  )
}
