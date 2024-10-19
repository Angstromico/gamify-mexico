import { useState, useEffect } from 'react'

interface BingoGame {
  id: number
  dateGame: string
  day: string
  hour: string
  week: number
  year: number
  description: string
  quantity_cartons: number
  figure_1: boolean
  amount_figure_1: number
  winner_1: boolean
  figure_2: boolean
  amount_figure_2: number
  winner_2: boolean
  figure_3: boolean
  amount_figure_3: number
  winner_3: boolean
  figure_4: boolean
  amount_figure_4: number
  winner_4: boolean
  figure_5: boolean
  amount_figure_5: number
  winner_5: boolean
  figure_6: boolean
  amount_figure_6: number
  winner_6: boolean
  player_cartons: number
  finished: boolean
  points_to_distribute: number
  started: boolean
  idRQ: string | null
  advertising: string | null
  ballot_advertising: number
  all_trivia: boolean
  trivia_category: string | null
  users: unknown[]
  trivias: unknown[]
}

const useFetchBingoGames = (BINGO_API: string) => {
  const [gameTimes, setGameTimes] = useState<{ id: number; date: Date }[]>([])

  const getTimeDifferenceWithMexicoCity = () => {
    const localDate = new Date()
    const localTime = localDate.getTime()
    const localOffset = localDate.getTimezoneOffset() * 60000
    const utc = localTime + localOffset
    const mexicoCityOffset = -6
    const mexicoCityTime = utc + 3600000 * mexicoCityOffset
    const mexicoCityDate = new Date(mexicoCityTime)
    const hoursDifference =
      (localDate.getTime() - mexicoCityDate.getTime()) / 3600000
    return hoursDifference
  }

  useEffect(() => {
    const fetchBingoGames = async () => {
      try {
        const response = await fetch(BINGO_API)
        const data: BingoGame[] = await response.json()
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const mexicanTimeZone = 'America/Mexico_City'

        if (Array.isArray(data)) {
          const parsedGameTimes = data
            .map((game) => {
              if (game.id && game.hour) {
                const today = new Date()
                const [hours, minutes, seconds] = game.hour
                  .split(':')
                  .map(Number)
                let gameDate = new Date(today.setHours(hours, minutes, seconds))

                if (userTimeZone !== mexicanTimeZone) {
                  const timeDifference = getTimeDifferenceWithMexicoCity()
                  gameDate.setHours(gameDate.getHours() + timeDifference)
                }

                return { id: game.id, date: gameDate }
              }
              return null
            })
            .filter((game): game is { id: number; date: Date } => game !== null)

          setGameTimes(parsedGameTimes)
        }
      } catch (error) {
        console.error('Error fetching bingo games:', error)
      }
    }

    fetchBingoGames()
  }, [BINGO_API])

  return gameTimes
}

export default useFetchBingoGames
