const trimLocal = <T extends string>(str: T, trim?: boolean): string => {
  return trim ? str.trim() : str
}

/**
 * Это строка, и она непустая
 */
export const isStringNotEmpty = <T extends string>(
  data: T | undefined | null,
  trim = true,
): data is T => {
  return typeof data === 'string' && trimLocal(data, trim).length > 0
}

/**
 * Это строка, но она пустая
 */
export const isStringEmptyAndExist = <T extends string>(
  data: T | undefined | null,
  trim = true,
): data is T => {
  return typeof data === 'string' && trimLocal(data, trim).length <= 0
}

/**
 * Это НЕ строка, или это пустая строка
 */
export const isStringEmptyOrNotExist = <T extends string>(
  data: T | undefined | null,
  trim = true,
): data is T | undefined | null => {
  return typeof data !== 'string' || trimLocal(data, trim).length <= 0
}
