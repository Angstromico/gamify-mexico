import { useTranslation } from '@hooks/useTranslations'
import { dynamicTranslate } from 'src/utils'
import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { LangText, Lang } from '@interfaces/index'
import classes from './BarChartBox.module.scss'

type Props = {
  title: LangText
  color: string
  dataKey: string
  chartData: object[]
  lang: Lang
}

const BarChartBox = (props: Props) => {
  const { lang } = props
  const t = useTranslation()

  return (
    <div className={classes.barChartBox}>
      <h1>{dynamicTranslate(lang, props.title.es, props.title.en)}</h1>
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
