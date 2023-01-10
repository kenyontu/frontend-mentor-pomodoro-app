import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppThemeWrapper } from './components/AppThemeWrapper'
import { AppColorProvider } from './contexts/AppColorContext'
import { AppFontProvider } from './contexts/AppFontContext'
import { TimeProvider } from './contexts/TimeContext'
import './index.scss'

let container: HTMLElement | null = null

document.addEventListener('DOMContentLoaded', () => {
  if (!container) {
    container = document.getElementById('root') as HTMLElement
    const root = ReactDOM.createRoot(container)
    root.render(
      <React.StrictMode>
        <Providers>
          <AppThemeWrapper>
            <App />
          </AppThemeWrapper>
        </Providers>
      </React.StrictMode>,
    )
  }
})

type ProvidersProps = {
  children: React.ReactNode
}

function Providers({ children }: ProvidersProps) {
  return (
    <TimeProvider>
      <AppFontProvider>
        <AppColorProvider>
          {children}
        </AppColorProvider>
      </AppFontProvider>
    </TimeProvider>
  )
}
