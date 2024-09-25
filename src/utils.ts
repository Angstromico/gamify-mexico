import { currentLang } from './store'
export const translate = (es: string, en: string) => {
  const lang = currentLang.get()

  return lang === 'es' ? es : en
}
