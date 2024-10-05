import { useState } from 'react'
import classes from './style.module.scss'
import { useTranslation } from '@hooks/useTranslations'
import Button from '@components/Button'
import { topDealUsers } from '@constants/index'

const TopBox = () => {
  const [openRanking, setOpenRanking] = useState(false)
  const t = useTranslation()
  const topFour = topDealUsers.slice(0, 4)
  const topTwenty = topDealUsers.slice(0, 20)
  const ranking = openRanking ? topTwenty : topFour
  const totalUsers = topDealUsers.length < 20 ? topDealUsers.length : 20

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
            ? t(`Ver primeros ${totalUsers}`, `See first ${totalUsers}`)
            : t('Ver primeros 4', 'See first four')}
        </Button>
      </div>
    </div>
  )
}
export default TopBox
