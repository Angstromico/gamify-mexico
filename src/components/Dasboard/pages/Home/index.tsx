import useAuthRedirect from '@hooks/useAuthRedirect'
import type { Lang } from '@interfaces/index'
import classes from './style.module.scss'
import {
  TopBox,
  ChartBox,
  BarChartBox,
  BigChartBox,
  CouponBox,
  WalletBox,
  StreamerBox,
  AddStreamerBox,
} from '@components/Dasboard/components'
import {
  chartBoxUser,
  chartBoxProduct,
  barChartBoxRevenue,
  barChartBoxVisit,
} from '@constants/index'
import { useState } from 'react'

const Home = ({
  lang = 'es',
  API_WALLET,
  BINGO_API,
  bingoTitle,
  QUIZ_API,
  quizTitle,
}: {
  lang?: Lang
  API_WALLET: string
  BINGO_API: string
  bingoTitle: string
  QUIZ_API: string
  quizTitle: string
}) => {
  useAuthRedirect(lang)
  return (
    <div className={classes.home}>
      <div className={`${classes.box} ${classes.box1}`}>
        <TopBox
          gameText='bingo'
          title={bingoTitle}
          lang={lang}
          API={BINGO_API}
        />
      </div>
      <div className={`${classes.box} ${classes.box2}`}>
        <ChartBox lang={lang} {...chartBoxUser} />
      </div>
      <div className={`${classes.box} ${classes.box3}`}>
        <ChartBox lang={lang} {...chartBoxProduct} />
      </div>
      <div className={`${classes.box} ${classes.box4}`}>
        <TopBox
          gameText='trivia'
          title={quizTitle}
          lang={lang}
          API={QUIZ_API}
        />
      </div>
      <div className={`${classes.box} ${classes.box5}`}>
        <WalletBox lang={lang} API_WALLET={API_WALLET} />
      </div>
      <div className={`${classes.box} ${classes.box6}`}>
        <CouponBox lang={lang} />
      </div>
      <div className={`${classes.box} ${classes.box7}`}>
        <BigChartBox lang={lang} />
      </div>
      <div className={`${classes.box} ${classes.box8}`}>
        <BarChartBox lang={lang} {...barChartBoxRevenue} />
      </div>
      <div className={`${classes.box} ${classes.box9}`}>
        <BarChartBox lang={lang} {...barChartBoxVisit} />
      </div>

      <div className={`${classes.box} ${classes.box10}`}>
        <StreamerBox lang={lang} />
      </div>

      <div className={`${classes.box} ${classes.box10}`}>
        <AddStreamerBox lang={lang} />
      </div>
    </div>
  )
}
export default Home
