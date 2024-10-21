import { useEffect, useState } from 'react'
import useFetchBingoGames from '@hooks/useFetchBingoGames'
import classes from './style.module.scss'
import { dynamicTranslate } from 'src/utils'
import type { Lang } from '@interfaces/index'

const TopBox = ({ lang, BINGO_API }: { lang: Lang; BINGO_API: string }) => {
  const gameTimes = useFetchBingoGames(BINGO_API)
  const [countdowns, setCountdowns] = useState<{ [key: string]: any }>({})

  const calculateCountdown = (date: Date) => {
    const targetDate = new Date(date).getTime()
    const now = new Date().getTime()
    const difference = targetDate - now

    if (difference <= 0) return null // Game date has passed

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return { hours, minutes, seconds }
  }

  const generateRandomColor = () => {
    const colors = ['#FFB6C1', '#FFA07A', '#7FFFD4', '#FFE4B5', '#98FB98']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    // Update countdowns every second
    const interval = setInterval(() => {
      const newCountdowns = gameTimes.reduce(
        (acc, game) => {
          const countdown = calculateCountdown(game.date)
          acc[game.id] = countdown
          return acc
        },
        {} as { [key: string]: any }
      )
      setCountdowns(newCountdowns)
    }, 1000)

    return () => clearInterval(interval) // Cleanup on component unmount
  }, [gameTimes])

  return (
    <div className={classes.topBox}>
      <h1>{dynamicTranslate(lang, 'Juegos Bingo Hoy', 'Bingo Games Today')}</h1>
      {gameTimes.length < 0 && (
        <div className={classes.noGames}>
          {dynamicTranslate(
            lang,
            'No hay juegos disponibles en este momento.',
            'No games available at the moment.'
          )}
        </div>
      )}
      {gameTimes.length > 0 && (
        <ul className={classes.list}>
          {gameTimes.slice(0, 6).map((game) => {
            const { id, date } = game
            const countdown = countdowns[id]
            const isExpired = !countdown

            return (
              <li className={classes.item} key={id}>
                <div className={classes.user}>
                  <span style={{ backgroundColor: generateRandomColor() }}>
                    {id}
                  </span>
                  <div className={classes.text}>
                    {/* Display countdown if game is still available */}
                    {countdown ? (
                      <div className='text-[0.6rem] flex gap-1 flex-wrap'>
                        {/* {dynamicTranslate(lang, 'Comienza en:', 'Starts in:')} */}{' '}
                        <span>{`${countdown.hours}h`}</span>
                        <span>{`${countdown.minutes}m`}</span>
                        <span>{`${countdown.seconds}s`}</span>
                      </div>
                    ) : (
                      <span>
                        {dynamicTranslate(lang, 'Finalizado', 'Expired')}
                      </span>
                    )}
                  </div>
                </div>
                <a
                  href={`/bingo/${id}`}
                  className={`${classes.amount} ${isExpired ? classes.disabled : ''}`}
                  onClick={(e) => isExpired && e.preventDefault()} // Disable link if the game has expired
                >
                  {dynamicTranslate(lang, 'Jugar', 'Play')}
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default TopBox
