import { useState, useEffect } from 'react'
import { dynamicTranslate } from 'src/utils'
import Section from '@components/Section'
import classes from './style.module.scss'
import TopBox from './TopBox'
import type { Lang } from '@interfaces/index'

interface Props {
  target: Date
  lang?: Lang
}

const Timer = ({ target, lang = 'es' }: Props) => {
  const [missionAccomplished, setMissionAccomplished] = useState(false)
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const intervale = setInterval(() => {
      const now = new Date()
      const difference = target.getTime() - now.getTime()

      // Update days, hours, minutes, and seconds
      setDays(Math.floor(difference / (1000 * 60 * 60 * 24)))
      setHours(Math.floor((difference / (1000 * 60 * 60)) % 24))
      setMinutes(Math.floor((difference / 1000 / 60) % 60))
      setSeconds(Math.floor((difference / 1000) % 60))

      if (difference === 0) {
        setMissionAccomplished(true)
      }
    }, 1000)

    // Proper cleanup function
    return () => clearInterval(intervale)
  }, [])

  const isEs = lang === 'es'

  return (
    <Section id='timer'>
      <div className={classes.timer}>
        <h2>
          {dynamicTranslate(
            lang,
            'Top Jugadores de Temporada',
            'Top Season Players'
          )}
        </h2>
        {missionAccomplished ? (
          <h3>
            {dynamicTranslate(lang, 'Contienda Finalizada', 'Contest Ended')}
          </h3>
        ) : (
          <>
            <div className={classes.innerTimer}>
              <div className={classes.daySegment}>
                {isEs && <div className={classes.label}>Faltan</div>}
                <div className={classes.time}>{days}</div>
                {isEs ? (
                  <div className={classes.label}>Días</div>
                ) : (
                  <>
                    <div className={classes.label}>Days</div>
                    <div className={classes.label}>Left</div>
                  </>
                )}
              </div>
              <div className={classes.timeSegments}>
                <div className={classes.timerSegment}>
                  <div className={classes.time}>{hours}</div>
                  <div className={classes.divider}>:</div>
                  <div className={classes.label}>
                    {dynamicTranslate(lang, 'Horas', 'Hours')}
                  </div>
                </div>

                <div className={classes.timerSegment}>
                  <div className={classes.time}>{minutes}</div>
                  <div className={classes.divider}>:</div>
                  <div className={classes.label}>
                    {dynamicTranslate(lang, 'Minutos', 'Minutes')}
                  </div>
                </div>

                <div className={classes.timerSegment}>
                  <div className={classes.time}>{seconds}</div>
                  <div className={classes.divider}>:</div>
                  <div className={classes.label}>
                    {dynamicTranslate(lang, 'Segundos', 'Seconds')}
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.topBox}>
              <TopBox lang={lang} />
            </div>
          </>
        )}
      </div>
    </Section>
  )
}
export default Timer
