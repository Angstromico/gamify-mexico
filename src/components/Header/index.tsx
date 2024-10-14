import { useState, useEffect } from 'react'
import { dynamicTranslate } from 'src/utils'
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
import type { Lang } from '@interfaces/index'

const Header = ({ lang }: { lang: Lang }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [pathname, setPathname] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    setPathname(window.location.pathname)

    // Check localStorage for loginData
    const loginData = localStorage.getItem('loginData')
    if (loginData) {
      const parsedData = JSON.parse(loginData)
      if (parsedData.isLoggedIn) {
        setIsLoggedIn(true)
        setUsername(parsedData.username) // Store username
      }
    }
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

  const logOutUser = () => {
    // Clear login data from localStorage
    localStorage.removeItem('loginData')
    setIsLoggedIn(false)
    setUsername('')
    // Optionally, redirect to homepage after logout
    window.location.href = '/'
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
          onLogOut={logOutUser}
          isLoggedIn={isLoggedIn}
          username={username}
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
        {/* Conditional navigation based on login status */}
        {isLoggedIn ? (
          <nav className='hidden lg:ml-[20rem] lg:flex flex-col lg:flex-row gap-5'>
            <p className='capitalize'>{username}</p> {/* Display username */}
            <Button
              text='Dashboard'
              texto='Dashboard'
              link={'/dashboard'}
              className='hidden lg:flex'
            />
            <button
              className='px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-md shadow-md hover:from-red-600 hover:to-red-800 transition-transform duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
              onClick={logOutUser}
            >
              {dynamicTranslate(lang, 'Salir', 'LogOut')}
            </button>
          </nav>
        ) : (
          <nav className='hidden lg:ml-[20rem] lg:flex flex-col lg:flex-row gap-5'>
            <DynamicLink href='/login' text='Login' texto='Login' />
            <Button
              text='Sign Up'
              texto='Suscribete'
              link={'/signup'}
              className='hidden lg:flex'
            />
          </nav>
        )}
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
