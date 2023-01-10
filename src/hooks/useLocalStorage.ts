import { useCallback, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.info(error)
      return initialValue
    }
  })

  const storeValue = useCallback((valueToStore: T) => {
    try {
      setValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.info(error)
    }
  }, [])

  return [value, storeValue] as const
}
