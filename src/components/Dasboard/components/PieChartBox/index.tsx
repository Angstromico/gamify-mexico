import { dynamicTranslate } from 'src/utils'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import classes from './style.module.scss'
import type { Lang } from '@interfaces/index'

const data = [
  { name: { es: 'Ganadas', en: 'Wins' }, value: 500, color: '#0088FE' },
  { name: { es: 'Ganancias', en: 'Proficts' }, value: 150, color: '#00C49F' },
  { name: { es: 'Partidas', en: 'Games' }, value: 220, color: '#FFBB28' },
  { name: { es: 'Referidos', en: 'Referrals' }, value: 15, color: '#FF8042' },
]
const PieChartBox = ({ lang }: { lang: Lang }) => {
  return (
    <div className={classes.pieChart}>
      <h1 className='h4'>
        {dynamicTranslate(lang, 'Historico de Juegos', 'Games History')}
      </h1>
      <div className={classes.chart}>
        <ResponsiveContainer width='99%' height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: 'white', borderRadius: '5px' }}
            />
            <Pie
              data={data}
              innerRadius={'70%'}
              outerRadius={'90%'}
              paddingAngle={5}
              dataKey='value'
            >
              {data.map((item) => (
                <Cell key={item.name.es} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={classes.options}>
        {data.map((item) => (
          <div className={classes.option} key={item.name.en}>
            <div className={classes.title}>
              <div
                className={classes.dot}
                style={{ backgroundColor: item.color }}
              />
              <span>{dynamicTranslate(lang, item.name.es, item.name.en)}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
export default PieChartBox
