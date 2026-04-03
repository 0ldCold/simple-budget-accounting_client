export const checkIsLink = (str: string): boolean => {
  try {
    new URL(str)
    return true
  } catch (e) {
    return false
  }
}
export const urlRegex = /(https?:\/\/)([\da-z\.-]+)(:\d{1,6})?([\/\w\.\-\#\?\=\%\&А-я]*)*\/?/

export const replaceUrlInString = (str: string, callback: (url: string) => string): string => {
  return str.replace(urlRegex, callback)
}
