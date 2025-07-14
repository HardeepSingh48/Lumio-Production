import { Decimal } from '@prisma/client/runtime/library'

export function convertDecimals<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map(convertDecimals) as unknown as T
  } else if (obj && typeof obj === 'object') {
    const newObj: Record<string, unknown> = {}
    for (const key in obj as object) {
      const value = (obj as Record<string, unknown>)[key]
      if (value instanceof Decimal) {
        newObj[key] = value.toNumber()
      } else {
        newObj[key] = convertDecimals(value)
      }
    }
    return newObj as T
  }
  return obj
}
