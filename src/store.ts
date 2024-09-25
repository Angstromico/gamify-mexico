import { atom } from 'nanostores'
import type { Lang } from '@interfaces/index'

export const currentLang = atom<Lang>('es')

export const changeLang = (lang: Lang) => {
  currentLang.set(lang)
}
