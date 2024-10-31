import { useEffect, useState } from 'react'
import useFetchBingoGames from '@hooks/useFetchBingoGames'
import classes from './style.module.scss'
import { dynamicTranslate } from 'src/utils'
import type { Lang } from '@interfaces/index'

// StreamersModal component to select a streamer for the game
const StreamersModal = ({
  isOpen,
  onClose,
  lang,
  gameText,
  gameId,
}: {
  isOpen: boolean
  onClose: () => void
  lang: Lang
  gameText: string
  gameId: string
}) => {
  const [streamers, setStreamers] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      const fetchStreamers = async () => {
        const loginData = localStorage.getItem('loginData')
        const { token } = JSON.parse(loginData || '{}')

        try {
          const response = await fetch(import.meta.env.PUBLIC_STREAMS, {
            headers: { Authorization: `Token ${token}` },
          })
          if (!response.ok) throw new Error('Failed to fetch streamers')
          const data = await response.json()
          setStreamers(data.data)
        } catch (err) {
          setError('Error fetching streamers. Please try again later.')
          console.error('Error fetching streamers:', err)
        }
      }

      fetchStreamers()
    }
  }, [isOpen])

  const handleStreamerSelect = (streamer: any) => {
    localStorage.setItem('selectedStreamer', JSON.stringify(streamer))
    window.location.href = `${dynamicTranslate(lang, '', '/en')}/${gameText}/${gameId}`
  }

  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div
        className={`${classes.topBox} border-color-softBg bg-slate-600 text-white p-6 rounded-lg max-w-sm w-full text-center`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='mb-4 text-xl md:text-2xl font-black'>
          {dynamicTranslate(lang, 'Elige un streamer', 'Choose a streamer')}
        </h2>
        {error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <ul className='flex flex-col gap-2'>
            {streamers.length > 0 ? (
              streamers.map((streamer) => (
                <li key={streamer.id}>
                  <button
                    onClick={() => handleStreamerSelect(streamer)}
                    className='w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700'
                  >
                    {dynamicTranslate(lang, 'Jugar con', 'Play with')}{' '}
                    <span className='capitalize'>{streamer.name}</span>
                  </button>
                </li>
              ))
            ) : (
              <p>
                {dynamicTranslate(
                  lang,
                  'No streamers disponibles',
                  'No streamers available'
                )}
              </p>
            )}
          </ul>
        )}
        <button
          onClick={onClose}
          className='mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-500'
        >
          {dynamicTranslate(lang, 'Cerrar', 'Close')}
        </button>
      </div>
    </div>
  )
}

// TopBox component displaying game times and modal trigger
const TopBox = ({
  lang,
  API,
  title,
  gameText,
}: {
  lang: Lang
  API: string
  title: string
  gameText: string
}) => {
  const gameTimes = useFetchBingoGames(API)
  const [countdowns, setCountdowns] = useState<{ [key: string]: any }>({})
  const [modalGameId, setModalGameId] = useState<string | null>(null)

  const calculateCountdown = (date: Date) => {
    const targetDate = new Date(date).getTime()
    const now = new Date().getTime()
    const difference = targetDate - now
    if (difference <= 0) return null

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)
    return { hours, minutes, seconds }
  }

  useEffect(() => {
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
    return () => clearInterval(interval)
  }, [gameTimes])

  return (
    <div className={classes.topBox}>
      <h1>{title}</h1>
      {gameTimes.length === 0 && (
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
          {gameTimes.slice(-6).map((game) => {
            const { id, date } = game
            const countdown = countdowns[id]
            const isExpired = !countdown

            return (
              <li className={classes.item} key={id}>
                <div className={classes.user}>
                  <span>{id}</span>
                  <div className={classes.text}>
                    {countdown ? (
                      <div className='text-[0.6rem] flex gap-1 flex-wrap'>
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
                <button
                  onClick={() => !isExpired && setModalGameId(id)}
                  className={`${classes.amount} ${isExpired ? classes.disabled : ''}`}
                >
                  {dynamicTranslate(lang, 'Jugar', 'Play')}
                </button>
              </li>
            )
          })}
        </ul>
      )}
      <StreamersModal
        isOpen={!!modalGameId}
        onClose={() => setModalGameId(null)}
        lang={lang}
        gameText={gameText}
        gameId={modalGameId!}
      />
    </div>
  )
}

export default TopBox
