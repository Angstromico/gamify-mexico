import { useTranslation } from '@hooks/useTranslations'
import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { LangText } from '@interfaces/index'
import classes from './BarChartBox.module.scss'

type Props = {
  title: LangText
  color: string
  dataKey: string
  chartData: object[]
}

const BarChartBox = (props: Props) => {
  const t = useTranslation()

  return (
    <div className={classes.barChartBox}>
      <h1>{t(props.title.es, props.title.en)}</h1>
      <div className='chart'>
        <ResponsiveContainer width='99%' height={150}>
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{ background: '#2a3447', borderRadius: '5px' }}
              labelStyle={{ display: 'none' }}
              cursor={{ fill: 'none' }}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BarChartBox
