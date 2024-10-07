import classes from './style.module.scss'
import { menu } from '@constants/index'
import { useTranslation } from '@hooks/useTranslations'
import React from 'react'

interface Props {
  title: string
}

const Menu = ({ title }: Props) => {
  const t = useTranslation()

  return (
    <div className={classes.menu}>
      {menu.map((m) => {
        return (
          <div className={classes.item} key={m.id}>
            <span className={classes.title}>{t(m.titulo, m.title)}</span>
            {m.listItems.map((item) => {
              const { icon, id, link, url, title, titulo } = item

              return (
                <a key={id} href={t(link, url)} className={classes.listItem}>
                  <img src={`/${icon}`} alt='Home icon' />
                  <span className={classes.listItemTitle}>
                    {t(titulo, title)}
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
