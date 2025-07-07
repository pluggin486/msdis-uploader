/* eslint-disable @typescript-eslint/no-unused-expressions */
import { nextTick } from 'vue'

const IndicatorCounters = new Map()

/**
 * Декоратор для использования бинарного прогресса при выполнении переданной функции.
 */
export function usingProgress<TFunc extends (...args: any) => Promise<any>>(
  indicator: { value: boolean } | ((value: boolean) => void),
  action: TFunc,
  options?: { noNextTick?: boolean },
): TFunc {
  const setProgress =
    typeof indicator === 'function' ? indicator : (value: boolean) => (indicator.value = value)

  return (async (...args: Parameters<TFunc>) => {
    IndicatorCounters.set(indicator, (IndicatorCounters.get(indicator) ?? 0) + 1)

    setProgress(true)
    try {
      !options?.noNextTick && (await nextTick())
      return await action(...(args as any))
    } finally {
      const counter = IndicatorCounters.get(indicator)
      if (counter > 1) {
        IndicatorCounters.set(indicator, counter - 1)
      } else {
        IndicatorCounters.delete(indicator)
        setProgress(false)
      }
      !options?.noNextTick && (await nextTick())
    }
  }) as any
}
