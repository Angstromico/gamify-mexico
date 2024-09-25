import { useState, useEffect } from 'react'
import HeaderLink from './HeaderLink'
import logo from '@assets/logo3.png'
import NavLinks from './NavLinks'
import DynamicLink from './DynamicLink'
import Button from '@components/Button'
import MenuSvg from '@assets/svg/MenuSvg'
import pkg from 'scroll-lock'
const { disablePageScroll, enablePageScroll } = pkg
import { navigation } from '@constants/index'
import NavLink from './NavLink'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [pathname, setPathname] = useState('')

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  const handleClick = () => {
    if (isOpen) {
      setIsOpen(false)
      enablePageScroll()
      return
    }
    setIsOpen(true)
    disablePageScroll()
  }

  return (
    <header
      className={`fixed flex lg:block justify-between items-center top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        isOpen ? 'bg-n-8' : 'bg-n-8/90 backdrop-blur-sm'
      }`}
    >
      <div className='relative flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4'>
        <HeaderLink>
          <img className='max-w-36' src={logo.src} alt='Logo' />
        </HeaderLink>
        <NavLinks
          handleClick={handleClick}
          isOpen={isOpen}
          pathname={pathname}
        />
        <nav className='hidden lg:flex justify-between gap-5 items-center'>
          {navigation.map((page, i) => (
            <NavLink
              title={page.title}
              titulo={page.titulo}
              url={page.url}
              link={page.link}
              onlyMobile={page.onlyMobile}
              currentPath={pathname}
              key={i}
            />
          ))}
        </nav>
        <nav className='hidden lg:ml-[20rem] lg:flex flex-col lg:flex-row gap-5'>
          <DynamicLink href='/login' text='New Account' texto='Nueva Cuenta' />
          <Button
            text='Sign Up'
            texto='Suscribete'
            link={'/signup'}
            className='hidden lg:flex'
          />
        </nav>
      </div>
      <Button
        onClick={handleClick}
        text=''
        texto=''
        className='ml-auto lg:hidden'
      >
        <MenuSvg isOpen={isOpen} />
      </Button>
    </header>
  )
}
export default Header
