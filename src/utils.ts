import { currentLang } from './store'
import type { Lang } from '@interfaces/index'
export const translate = (es: string, en: string) => {
  const lang = currentLang.get()

  return lang === 'es' ? es : en
}

export function splitTextToLines(text: string): string[] {
  return text.split(/\r?\n/).filter((line) => line.trim() !== '')
}

export const dynamicTranslate = (lang: Lang, es: string, en: string) => {
  return lang === 'es' ? es : en
}
