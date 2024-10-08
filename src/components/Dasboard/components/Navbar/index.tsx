import { dynamicTranslate } from 'src/utils'
import logo from '@assets/logo3.png'
import classes from './style.module.scss'
import type { Lang } from '@interfaces/index'
const Navbar = ({ lang }: { lang: Lang }) => {
  return (
    <div className={classes.navbar}>
      <div className={classes.logo}>
        <img src={logo.src} alt='Logo' />
      </div>
      <div className={classes.icons}>
        <img src='/search.svg' alt='Search icon' className={classes.icon} />
        <img src='/app.svg' alt='App icon' className={classes.icon} />
        <img src='/expand.svg' alt='Expand icon' className={classes.icon} />
        <div className={classes.notification}>
          <img src='/notifications.svg' alt='Bell icon' />
          <span>1</span>
        </div>
        <div className={classes.user}>
          <img src='/user.svg' alt='User Icon' />
          <span>{dynamicTranslate(lang, 'Usuario', 'Username')}</span>
        </div>
        <img src='/settings.svg' alt='Settings icon' className={classes.icon} />
      </div>
    </div>
  )
}
export default Navbar
