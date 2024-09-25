import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import ButtonSvg from './ButtonSvg'
import { currentLang } from '@store/*'

interface Props {
  link?: string
  text?: string
  texto?: string
  className?: string
  px?: boolean
  white?: boolean
  children?: ReactNode
  onClick?: () => void
}

const Button: React.FC<Props> = ({
  link,
  text,
  className,
  px,
  white,
  texto,
  children,
  onClick,
}) => {
  const [txt, setTxt] = useState(texto)
  const [url, setUrl] = useState(link)

  useEffect(() => {
    if (currentLang.get() === 'es') {
      setTxt(texto)
      setUrl(link)
    } else {
      setTxt(text)
      setUrl(`/en${link}`)
    }
  }, [link, text, texto])

  const classes = `relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    className ? className : ''
  } ${px ? 'px-7' : 'px-3'} ${white ? 'text-n-8' : 'text-n-1'}`

  return (
    <>
      {!link && !children && (
        <button className={classes}>
          <span className='relative z-10'>{txt}</span>
          <ButtonSvg />
        </button>
      )}

      {link && !children && (
        <a href={url} className={classes}>
          <span className='relative z-10'>{txt}</span>
          <ButtonSvg />
        </a>
      )}
      {children && !link && (
        <button onClick={onClick} className={`${classes} mx-8 cursor-pointer`}>
          {children}
          <ButtonSvg />
        </button>
      )}
      {children && link && (
        <a href={link} className={`${classes} mx-8 cursor-pointer`}>
          {children}
          <ButtonSvg />
        </a>
      )}
    </>
  )
}

export default Button
