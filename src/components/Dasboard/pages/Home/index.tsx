import { useTranslation } from '@hooks/useTranslations'
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

const Home = () => {
  const t = useTranslation()

  return (
    <div className={classes.home}>
      <div className={`${classes.box} ${classes.box1}`}>
        <TopBox />
      </div>
      <div className={`${classes.box} ${classes.box2}`}>
        <ChartBox {...chartBoxUser} />
      </div>
      <div className={`${classes.box} ${classes.box3}`}>
        <ChartBox {...chartBoxProduct} />
      </div>
      <div className={`${classes.box} ${classes.box4}`}>
        <PieChartBox />
      </div>
      <div className={`${classes.box} ${classes.box5}`}>
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className={`${classes.box} ${classes.box6}`}>
        <ChartBox {...chartBoxConversion} />
      </div>
      <div className={`${classes.box} ${classes.box7}`}>
        <BigChartBox />
      </div>
      <div className={`${classes.box} ${classes.box8}`}>
        <BarChartBox {...barChartBoxRevenue} />
      </div>
      <div className={`${classes.box} ${classes.box9}`}>
        <BarChartBox {...barChartBoxVisit} />
      </div>
    </div>
  )
}
export default Home
