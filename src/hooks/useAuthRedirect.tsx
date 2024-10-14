import { useEffect } from 'react'
import { dynamicTranslate } from 'src/utils'
import type { Lang } from '@interfaces/index'

const useAuthRedirect = (lang: Lang) => {
  useEffect(() => {
    const loginData = localStorage.getItem('loginData')
    if (loginData) {
      const parsedData = JSON.parse(loginData)
      if (!parsedData.isLoggedIn) {
        window.location.href = dynamicTranslate(lang, '/login', '/en/login')
      }
    } else {
      window.location.href = dynamicTranslate(lang, '/login', '/en/login')
    }
  }, [lang])
}

export default useAuthRedirect
