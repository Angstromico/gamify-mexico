import { useState, type ReactNode, useEffect } from 'react'
import { currentLang } from '@store/*'
type Props = {
  children: ReactNode
}

const HeaderLink = ({ children }: Props) => {
  const [link, setLink] = useState('/')

  useEffect(() => {
    if (currentLang.get() === 'en') {
      setLink('/en')
      return
    }
    setLink('/')
  }, [currentLang])

  return (
    <a className='block xl:ml-8' href={link}>
      {children}
    </a>
  )
}
export default HeaderLink
