import type { Lang } from '@interfaces/index'
import classes from './style.module.scss'
import {
  TopBox,
  ChartBox,
  BarChartBox,
  PieChartBox,
  BigChartBox,
} from '@components/Dasboard/components'
import {
  chartBoxUser,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxConversion,
  barChartBoxRevenue,
  barChartBoxVisit,
} from '@constants/index'

const Home = ({ lang = 'es' }: { lang?: Lang }) => {
  return (
    <div className={classes.home}>
      <div className={`${classes.box} ${classes.box1}`}>
        <TopBox lang={lang} />
      </div>
      <div className={`${classes.box} ${classes.box2}`}>
        <ChartBox lang={lang} {...chartBoxUser} />
      </div>
      <div className={`${classes.box} ${classes.box3}`}>
        <ChartBox lang={lang} {...chartBoxProduct} />
      </div>
      <div className={`${classes.box} ${classes.box4}`}>
        <PieChartBox lang={lang} />
      </div>
      <div className={`${classes.box} ${classes.box5}`}>
        <ChartBox lang={lang} {...chartBoxRevenue} />
      </div>
      <div className={`${classes.box} ${classes.box6}`}>
        <ChartBox lang={lang} {...chartBoxConversion} />
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
    </div>
  )
}
export default Home
