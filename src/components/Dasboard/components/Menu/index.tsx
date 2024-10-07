import classes from './style.module.scss'
import { menu } from '@constants/index'
import { dynamicTranslate } from 'src/utils'
import type { Lang } from '@interfaces/index'

interface Props {
  lang: Lang
}

const Menu = ({ lang }: Props) => {
  return (
    <div className={classes.menu}>
      {menu.map((m) => {
        return (
          <div className={classes.item} key={m.id}>
            <span className={classes.title}>
              {dynamicTranslate(lang, m.titulo, m.title)}
            </span>
            {m.listItems.map((item) => {
              const { icon, id, link, url, title, titulo } = item

              return (
                <a
                  key={id}
                  href={dynamicTranslate(lang, link, url)}
                  className={classes.listItem}
                >
                  <img src={`/${icon}`} alt='Home icon' />
                  <span className={classes.listItemTitle}>
                    {dynamicTranslate(lang, titulo, title)}
                  </span>
                </a>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
export default Menu
