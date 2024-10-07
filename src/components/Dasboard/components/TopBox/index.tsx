import classes from './style.module.scss'
import { dynamicTranslate } from 'src/utils'
import { topDealUsers } from '@constants/index'
import type { Lang } from '@interfaces/index'

const TopBox = ({ lang }: { lang: Lang }) => {
  return (
    <div className={classes.topBox}>
      <h1>{dynamicTranslate(lang, 'Top Jugadores', 'Top Players')}</h1>
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
