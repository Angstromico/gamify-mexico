import NavLink from './NavLink'
import { navigation } from '@constants/index'
import { HamburgerMenu } from '@components/design/Header'

interface Props {
  pathname: string
  isOpen: boolean
  handleClick: () => void
}

const NavLinks = ({ pathname, isOpen, handleClick }: Props) => {
  return (
    <nav
      className={`${
        isOpen ? '' : 'hidden'
      } fixed h-screen lg:hidden top-20 left-0 right-0 bg-n-8 lg:static flex lg:mx-auto lg:bg-transparent`}
    >
      {isOpen && (
        <ul className='relative mt-12 lg:mt-0 gap-5 flex flex-col lg:flex-row items-center justify-center m-auto'>
          {navigation.map((page, i) => (
            <NavLink
              title={page.title}
              titulo={page.titulo}
              url={page.url}
              link={page.link}
              onlyMobile={page.onlyMobile}
              currentPath={pathname}
              key={i}
              handleClick={handleClick}
            />
          ))}
        </ul>
      )}

      <HamburgerMenu />
    </nav>
  )
}

export default NavLinks
