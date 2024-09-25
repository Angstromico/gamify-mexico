import { useState, useEffect } from 'react'
import { translate } from 'src/utils'

export const useTranslation = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const t = (es: string, en: string) => {
    return isClient ? translate(es, en) : es
  }

  return t
}
