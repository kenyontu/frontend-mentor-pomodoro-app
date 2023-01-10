import clsx from 'clsx'
import { useAppColorContext } from '~/contexts/AppColorContext'
import { useAppFontContext } from '~/contexts/AppFontContext'

import styles from './AppThemeWrapper.module.scss'

type Props = {
  children: React.ReactNode
}

export function AppThemeWrapper({ children }: Props) {
  const { color } = useAppColorContext()
  const { fontFamily } = useAppFontContext()

  return (
    <div
      className={clsx(styles.container, {
        [styles.colorOrange]: color === 'orange',
        [styles.colorAqua]: color === 'aqua',
        [styles.colorPurple]: color === 'purple',

        [styles.ffKumbhSans]: fontFamily === 'kumbhSans',
        [styles.ffRobotoSlab]: fontFamily === 'robotoSlab',
        [styles.ffSpaceMono]: fontFamily === 'spaceMono',
      })}
    >
      {children}
    </div>
  )
}
