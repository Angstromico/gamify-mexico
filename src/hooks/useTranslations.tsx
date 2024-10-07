import { useState, useEffect } from 'react'
import { currentLang } from '@store/*'

export const useTranslation = () => {
  const [isClient, setIsClient] = useState(false)
  const [lang, setLang] = useState(currentLang.get()) // Initialize with current language

  useEffect(() => {
    setIsClient(true)

    // Listen for language changes in currentLang and update lang state
    const unsubscribe = currentLang.subscribe((newLang) => setLang(newLang))

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe()
  }, [])

  // Automatically update the t function based on the current language
  const t = (es: string, en: string) => {
    return lang === 'es' ? es : en
  }

  return t
}
