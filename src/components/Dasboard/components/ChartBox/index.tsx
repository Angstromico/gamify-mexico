import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts'
import { useTranslation } from '@hooks/useTranslations'
import type { LangText } from '@interfaces/index'
import classes from './style.module.scss'

interface Props {
  title: LangText
  number: number | string
  icon: string
  chartData: {}[]
  color: string
  dataKey: string
  percentage: number
}

const ChartBox = ({
  title,
  number,
  icon,
  chartData,
  dataKey,
  color,
  percentage,
}: Props) => {
  const t = useTranslation()

  return (
    <div className={classes.chartBox}>
      <div className={classes.box}>
        <div className={classes.title}>
          <img src={icon} alt='User Chart' />
          <span>{t(title.es, title.en)}</span>
        </div>
        <h1>{number}</h1>
        <a style={{ color }} href='#'>
          {t('Verlos todos', 'View all')}
        </a>
      </div>
      <div className={classes.chart}>
        <div className={classes.main}>
          <ResponsiveContainer width='99%' height='100%'>
            <LineChart width={300} height={100} data={chartData}>
              <Tooltip
                contentStyle={{ background: 'transparent', border: 'none' }}
                labelStyle={{ display: 'none' }}
                position={{ x: 10, y: 60 }}
              />
              <Line
                type='monotone'
                dataKey={dataKey}
                stroke={color}
                dot={false}
                strokeWidth={2}
              />
              <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={classes.text}>
          <div
            className={classes.percentage}
            style={{ color: percentage < 0 ? 'tomato' : 'limegreen' }}
          >
            {percentage}%
          </div>
          <div className={classes.duration}>{t('Este mes', 'This month')}</div>
        </div>
      </div>
    </div>
  )
}
export default ChartBox