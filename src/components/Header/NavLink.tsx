import { useState, useEffect } from 'react'
import { currentLang } from '@store/*'

interface Props {
  title: string
  titulo: string
  url: string
  link: string
  onlyMobile?: boolean
  currentPath?: string
  handleClick?: () => void
}
const NavLink = ({
  title,
  titulo,
  url,
  link,
  onlyMobile,
  currentPath,
  handleClick,
}: Props) => {
  const [href, setHref] = useState(link)
  const [anchorText, setAnchorText] = useState(titulo)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (currentLang.get() === 'es') {
      setHref(link)
      setAnchorText(titulo)
      return
    }
    setHref(url)
    setAnchorText(title)
  }, [currentLang])

  const active = currentPath ? currentPath === href : false

  return (
    <li onClick={handleClick} style={{ listStyleType: 'none' }}>
      <a
        className={`block font-code relative text-2xl uppercase text-n-1 transition-colors hover:text-color-1 p-6 md:py-8 ${
          onlyMobile ? 'lg:hidden' : ''
        } lg:text-xs lg:font-semibold ${
          active ? 'z-20 lg:text-n-1' : 'lg:text-n-1/50'
        } lg:leading-5 lg:hover:text-1-n xl:px-12`}
        href={href}
      >
        {anchorText}
      </a>
    </li>
  )
}
export default NavLink
