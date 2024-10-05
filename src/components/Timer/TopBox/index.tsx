import { useState } from 'react'
import classes from './style.module.scss'
import { useTranslation } from '@hooks/useTranslations'
import Button from '@components/Button'
import { topDealUsers } from '@constants/index'

const TopBox = () => {
  const [openRanking, setOpenRanking] = useState(false)
  const t = useTranslation()
  const topFive = topDealUsers.slice(0, 5)
  const ranking = openRanking ? topDealUsers : topFive

  const toggleRanking = () => setOpenRanking(!openRanking)

  return (
    <div className={classes.topBox}>
      <h1>{t('Top Jugadores', 'Top Players')}</h1>
      <ul className={classes.list}>
        {ranking.map((user) => {
          const { id, img, username, amount, email } = user

          return (
            <li className={classes.item} key={id}>
              <div className={classes.user}>
                <img src={img} alt={username} />
                <div className={classes.text}>
                  <div className={classes.name}>
                    <span className={classes.neonText}>{id}.</span> {username}
                  </div>
                  <div className={classes.email}>{email}</div>
                </div>
              </div>
              <span className={classes.amount}>${amount}</span>
            </li>
          )
        })}
      </ul>
      <div onClick={toggleRanking} className={classes.btnContainer}>
        <Button className='cursor-pointer'>
          {!openRanking
            ? t('Ver todo el ranking', 'See all ranking')
            : t('Ver primeros 5', 'See first five')}
        </Button>
      </div>
    </div>
  )
}
export default TopBox
