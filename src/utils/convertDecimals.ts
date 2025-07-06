// utils/convertDecimals.ts
import { Decimal } from '@prisma/client/runtime/library'

export function convertDecimals(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertDecimals)
  } else if (obj && typeof obj === 'object') {
    const newObj: any = {}
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object' && 'toNumber' in obj[key]) {
        newObj[key] = obj[key].toNumber()
      } else {
        newObj[key] = convertDecimals(obj[key])
      }
    }
    return newObj
  }
  return obj
}