import classes from './style.module.scss'
import { useTranslation } from '@hooks/useTranslations'
import { topDealUsers } from '@constants/index'

const TopBox = () => {
  const t = useTranslation()

  return (
    <div className={classes.topBox}>
      <h1>{t('Top Jugadores', 'Top Players')}</h1>
      <ul className={classes.list}>
        {topDealUsers.map((user) => {
          const { id, img, username, amount, email } = user

          return (
            <li className={classes.item} key={id}>
              <div className={classes.user}>
                <img src={img} alt={username} />
                <div className={classes.text}>
                  <div className={classes.name}>{username}</div>
                  <div className={classes.email}>{email}</div>
                </div>
              </div>
              <span className={classes.amount}>${amount}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default TopBox
