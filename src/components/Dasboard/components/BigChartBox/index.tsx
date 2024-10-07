import { useTranslation } from '@hooks/useTranslations'
import { dynamicTranslate } from 'src/utils'
import type { Lang } from '@interfaces/index'

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import classes from './style.module.scss'

const data = [
  {
    name: 'Bingo',
    profit: 4000,
    loss: 2400,
  },
  {
    name: 'Poker',
    profit: 3000,
    loss: 1398,
  },
  {
    name: 'Blackjack',
    profit: 2000,
    loss: 9800,
  },
  {
    name: 'Roulette',
    profit: 2780,
    loss: 3908,
  },
  {
    name: 'Slots',
    profit: 1890,
    loss: 4800,
  },
  {
    name: 'Craps',
    profit: 2390,
    loss: 3800,
  },
  {
    name: 'Keno',
    profit: 3490,
    loss: 4300,
  },
]

const BigChartBox = ({ lang }: { lang: Lang }) => {
  const t = useTranslation()

  return (
    <div className={classes.bigChart}>
      <h1>
        {dynamicTranslate(
          lang,
          'Análisis de ganancias y pérdidas',
          'Profit and Loss Analysis'
        )}
      </h1>
      <div className={classes.chart}>
        <ResponsiveContainer width='99%' height='100%'>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='profit'
              stackId='1'
              stroke='#82ca9d'
              fill='#82ca9d'
              name={dynamicTranslate(lang, 'Ganancias', 'Profit')}
            />
            <Area
              type='monotone'
              dataKey='loss'
              stackId='1'
              stroke='#ff6b6b'
              fill='#ff6b6b'
              name={dynamicTranslate(lang, 'Pérdidas', 'Loss')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BigChartBox
