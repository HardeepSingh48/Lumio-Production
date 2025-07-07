import { Decimal } from '@prisma/client/runtime/library';

export function convertDecimals(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(convertDecimals);
  } else if (obj && typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      const value = obj[key];
      if (value instanceof Decimal) {
        newObj[key] = value.toNumber();
      } else {
        newObj[key] = convertDecimals(value);
      }
    }
    return newObj;
  }
  return obj;
}
