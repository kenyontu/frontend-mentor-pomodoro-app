import clsx from 'clsx'
import { appFontFamilies, AppFontFamily } from '~/config'
import styles from './FontFamilySelector.module.scss'

const ffClassMapping: Record<AppFontFamily, string> = {
  'kumbhSans': styles.ffKumbhSans,
  'robotoSlab': styles.ffRobotoSlab,
  'spaceMono': styles.ffSpaceMono,
}

type Props = {
  className?: string
  selected: AppFontFamily
  onChange: (fontFamily: AppFontFamily) => void
}

export function FontFamilySelector({ className, selected, onChange }: Props) {
  return (
    <div
      className={clsx(styles.container, className)}
      role='radiogroup'
      aria-labelledby='ff-selector-label'
    >
      <p className='sr-only' id='ff-selector-label'>
        Select the font family to be applied to text throughout the app
      </p>
      {appFontFamilies.map(ff => (
        <div className={styles.option} key={ff}>
          <input
            id={ff}
            type='radio'
            name='font-family'
            className={styles.optionRadio}
            checked={ff === selected}
            onChange={() => onChange(ff)}
          />
          <label className={ffClassMapping[ff]} htmlFor={ff}>Aa</label>
        </div>
      ))}
    </div>
  )
}
