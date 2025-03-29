// hooks/useDebounce.ts
import { useEffect, useRef, useCallback } from 'react'

type DebouncedFunction<T> = (
  value: T,
  name: string,
  ...args: any[]
) => void

export function useDebounce<T>(
  callback: DebouncedFunction<T>,
  delay: number = 500
): DebouncedFunction<T> {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup timeout saat komponen unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return useCallback(
    (value: T, name: string, ...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(value, name, ...args)
      }, delay)
    },
    [callback, delay]
  )
}