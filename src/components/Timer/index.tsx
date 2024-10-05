import { useState, useEffect } from 'react'
import { useTranslation } from '@hooks/useTranslations'
import Section from '@components/Section'
import classes from './style.module.scss'
import TopBox from './TopBox'

interface Props {
  target: Date
}

const Timer = ({ target }: Props) => {
  const [missionAccomplished, setMissionAccomplished] = useState(false)
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const t = useTranslation()

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

  return (
    <Section id='timer'>
      <div className={classes.timer}>
        <h2>{t('Top Jugadores de Temporada', 'Top Season Players')}</h2>
        {missionAccomplished ? (
          <h3>{t('Contienda Finalizada', 'Contest Ended')}</h3>
        ) : (
          <>
            <div className={classes.innerTimer}>
              <div className={classes.timerSegment}>
                <div className={classes.time}>{days}</div>
                <div className={classes.label}>{t('Días', 'Days')}</div>
              </div>
              <div className={classes.divider}>:</div>
              <div className={classes.timerSegment}>
                <div className={classes.time}>{hours}</div>
                <div className={classes.label}>{t('Horas', 'Hours')}</div>
              </div>
              <div className={classes.divider}>:</div>
              <div className={classes.timerSegment}>
                <div className={classes.time}>{minutes}</div>
                <div className={classes.label}>{t('Minutos', 'Minutes')}</div>
              </div>
              <div className={classes.divider}>:</div>
              <div className={classes.timerSegment}>
                <div className={classes.time}>{seconds}</div>
                <div className={classes.label}>{t('Segundos', 'Seconds')}</div>
              </div>
            </div>
            <div className={classes.topBox}>
              <TopBox />
            </div>
          </>
        )}
      </div>
    </Section>
  )
}
export default Timer
