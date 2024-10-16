import { useState, useEffect, useRef, useCallback } from 'react'
import useAuthRedirect from '@hooks/useAuthRedirect'
import ReactPlayer from 'react-player/youtube'
import { generateBingoCard } from '@constants/index'
import { dynamicTranslate } from 'src/utils'
import type { Lang } from '@interfaces/index'
import BingoCard from './BingoCard'
import initBall from '@assets/balotas/tapa.png'

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
  users: unknown[] // Assuming you need to define user types later
  trivias: unknown[] // Assuming you will define trivia types later
}

const BingoVideoPlayer = ({
  lang = 'es',
  WS,
  BINGO_API,
}: {
  lang?: Lang
  WS: string
  BINGO_API: string
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [cards, setCards] = useState<number[][]>([])
  const [selectedCard, setSelectedCard] = useState<number[] | null>(null)
  const [liveViewers, setLiveViewers] = useState<number>(100)
  const [drawnBalls, setDrawnBalls] = useState<number[]>([])
  const [markedNumbers, setMarkedNumbers] = useState<Set<number>>(new Set())
  const [fadeOutBalls, setFadeOutBalls] = useState<Set<number>>(new Set())
  const [showMessage, setShowMessage] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const [comments, setComments] = useState<{ es: string; en: string }[]>([])
  const [newComment, setNewComment] = useState<string>('')
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [socketNumbers, setSocketNumbers] = useState<null | Array<
    number | string
  >>(null)
  const [gameTimes, setGameTimes] = useState<{ id: number; date: Date }[]>([])
  const [balls, setBalls] = useState<Array<Array<string[]>>>([])

  useAuthRedirect(lang)

  const commentsRef = useRef<HTMLDivElement | null>(null)
  const handleWebSocketData = useCallback((data: any) => {
    let dataArray: Array<string[]> = []

    if (data.tipo_ws === 'inicio') {
      dataArray.push(['inicio'])
    } else if (data.tipo_ws === 'ballot') {
      const reversedUltimas = [...data.ultimas].reverse().slice(0, 4)
      dataArray.push(reversedUltimas)
    }

    setBalls((prevBalls) => [...prevBalls, dataArray])
  }, [])

  useEffect(() => {
    setIsMounted(true)

    const getTimeDifferenceWithMexicoCity = () => {
      // Get the current time in the user's local time zone
      const localDate = new Date()
      const localTime = localDate.getTime() // Get the current time in milliseconds
      const localOffset = localDate.getTimezoneOffset() * 60000 // Get the local time zone offset in milliseconds

      // Convert local time to UTC
      const utc = localTime + localOffset

      // Define the Mexico City offset (UTC-6)
      const mexicoCityOffset = -6 // UTC-6 for Mexico City
      const mexicoCityTime = utc + 3600000 * mexicoCityOffset // Adjust the time by -6 hours

      // Get the current time in Mexico City
      const mexicoCityDate = new Date(mexicoCityTime)

      // Calculate the difference in hours between the two time zones
      const hoursDifference =
        (localDate.getTime() - mexicoCityDate.getTime()) / 3600000 // Convert milliseconds to hours

      // Return the difference where positive means local time is ahead and negative means local time is behind
      return hoursDifference
    }

    const getDates = async () => {
      try {
        const response = await fetch(BINGO_API)
        const data: BingoGame[] = await response.json() // Assume data is an array of BingoGame

        // Get the user's current time zone
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const mexicanTimeZone = 'America/Mexico_City' // Define Mexico's time zone

        if (Array.isArray(data)) {
          // Process each bingo game in the array
          const parsedGameTimes = data
            .map((game) => {
              if (game.id && game.hour) {
                const today = new Date() // Current date
                const [hours, minutes, seconds] = game.hour
                  .split(':')
                  .map(Number) // Split the time string into components

                // Create a Date object for today with the hour from the API (Mexico time zone)
                let gameDate = new Date(today.setHours(hours, minutes, seconds))

                // Check if the user's time zone is different from the Mexican time zone
                if (userTimeZone !== mexicanTimeZone) {
                  // Get the time difference in hours
                  const timeDifference = getTimeDifferenceWithMexicoCity()
                  // Adjust gameDate according to the time difference
                  gameDate.setHours(gameDate.getHours() + timeDifference)
                }

                return {
                  id: game.id,
                  date: gameDate, // Use the Date object created above (converted if needed)
                }
              } else {
                console.error('Invalid game data:', game)
                return null
              }
            })
            .filter((game): game is { id: number; date: Date } => game !== null) // Type guard to ensure non-null values

          // Set the gameTimes state
          setGameTimes(parsedGameTimes) // Now TypeScript knows this is the correct type
        } else {
          console.error('Invalid data structure: ', data)
        }

        return data
      } catch (error) {
        console.error('Error fetching bingo data:', error)
      }
    }

    getDates()
  }, [])

  useEffect(() => {
    if (gameTimes.length > 0) {
      // Sort gameTimes by the date, closest dates first
      const sortedGameTimes = gameTimes.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )

      // Filter games whose date is in the future
      const currentSocketNumbers = sortedGameTimes
        .filter((game) => new Date(game.date) > new Date())
        .map((game) => game.id)

      // Update state with the filtered and sorted game IDs
      setSocketNumbers(currentSocketNumbers)
    }
  }, [gameTimes])

  useEffect(() => {
    if (socketNumbers && socketNumbers.length > 0) {
      let socketIndex = 0
      const connectSocket = () => {
        if (socketIndex >= socketNumbers.length) return // No more sockets to connect

        const socket = new WebSocket(`${WS}${socketNumbers[socketIndex]}/`)

        socket.onopen = () => {
          console.log('WebSocket connection established')
          const loginData = localStorage.getItem('loginData')
          if (loginData) {
            const { token } = JSON.parse(loginData)
            socket.send(JSON.stringify({ token }))
          }
        }

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data)
          handleWebSocketData(data)
        }

        socket.onerror = (error) => {
          console.error('WebSocket error:', error)
        }

        socket.onclose = () => {
          console.log(
            `WebSocket connection closed for socket: ${socketNumbers[socketIndex]}`
          )
          socketIndex++ // Move to the next socket number
          connectSocket() // Try reconnecting with the next socket number
        }

        setWs(socket) // Save the WebSocket instance to state
      }

      connectSocket()

      // Cleanup function to close socket on unmount
      return () => {
        if (ws) ws.close()
      }
    }
  }, [socketNumbers, WS])

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (balls.length > currentIndex) {
        const currentBalls = balls[currentIndex]

        if (Array.isArray(currentBalls) && currentBalls.length > 0) {
          const ballNumbers = currentBalls[0]
          if (
            Array.isArray(ballNumbers) &&
            ballNumbers.every((ball) => !isNaN(Number(ball)))
          ) {
            setDrawnBalls(ballNumbers.map(Number))
          }
        }

        currentIndex++
      }
    }, 8000) // Display new balls every 8 seconds

    return () => clearInterval(interval)
  }, [balls])

  // Simulate adding a new ball every minute
  /* useEffect(() => {
    const interval = setInterval(() => {
      const newBall = Math.floor(Math.random() * 75) + 1
      setDrawnBalls((prev) =>
        prev.length >= 4 ? [...prev.slice(1), newBall] : [...prev, newBall]
      )
      //I don't want to simulate add balls anymore
    }, 10000)

    return () => clearInterval(interval)
  }, []) */

  // Generate 4 random bingo cards
  useEffect(() => {
    const generatedCards = Array.from({ length: 4 }, () => generateBingoCard())
    setCards(generatedCards)
  }, [])

  const handleSelectCard = (card: number[]) => {
    setSelectedCard(card)
  }

  const handleMarkNumber = (number: number) => {
    if (selectedCard && !markedNumbers.has(number)) {
      setMarkedNumbers((prev) => new Set(prev).add(number))

      setAlertMessage(
        dynamicTranslate(
          lang,
          `¡El número ${number} está disponible en tu tarjeta de Bingo!`,
          `Number ${number} is now available on your Bingo card!`
        )
      )
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 3000)

      setFadeOutBalls((prev) => new Set(prev).add(number))

      setTimeout(() => {
        setDrawnBalls((prev) => prev.filter((ball) => ball !== number))
        setFadeOutBalls((prev) => {
          const newSet = new Set(prev)
          newSet.delete(number)
          return newSet
        })
      }, 500) // Match the fade-out animation duration
    }
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        {
          es: `${newComment}`,
          en: `${newComment}`,
        },
      ])
      setNewComment('') // Clear input after adding comment

      // Scroll to the bottom after the comment is added
      setTimeout(() => {
        if (commentsRef.current) {
          commentsRef.current.scrollTop = commentsRef.current.scrollHeight
        }
      }, 100) // Allow state to update before scrolling
    }
  }

  return (
    <div className='relative w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center'>
      {/* Video with live chat and viewer count */}
      <div className='relative w-screen h-screen md:h-[80vh] max-w-[400px]'>
        {isMounted && (
          <ReactPlayer
            url='https://www.youtube.com/embed/-gEFDcfyyMg?autoplay=1&rel=0&showinfo=0&controls=0&modestbranding=0'
            width='100%'
            height='100%'
            playing
            loop
            className='rounded-xl overflow-hidden'
            style={{ objectFit: 'cover' }}
          />
        )}

        {/* Viewer count */}
        <div className='absolute top-2 right-2 flex items-center bg-gray-700 bg-opacity-60 p-1 rounded'>
          <img src='/witness.png' alt='Live viewers' className='w-4 h-4 mr-1' />
          <span>{liveViewers}</span>
        </div>

        {/* Live comments section */}
        <div
          className='absolute bottom-[45%] left-0 right-0 flex flex-col space-y-2 px-4  w-[90%] rounded-md mx-auto h-20 md:h-24 overflow-y-auto no-scrollbar'
          ref={commentsRef}
        >
          {comments.length === 0 ? (
            <div className='text-gray-100 text-center'>
              {dynamicTranslate(
                lang,
                'No hay comentarios todavía',
                'No comments yet'
              )}
            </div>
          ) : (
            comments.map((comment, idx) => (
              <div key={idx} className='flex items-start space-x-2 p-2'>
                <img
                  src='/user.svg' // Replace with a proper avatar image path
                  alt='User avatar'
                  className='w-8 h-8 rounded-full'
                />
                <p className='text-white'>
                  {dynamicTranslate(lang, comment.es, comment.en)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Input for adding a new comment */}
        <div className='absolute bottom-0 left-0 right-0 px-4 flex items-center space-x-2 mb-1'>
          <input
            type='text'
            className='flex-grow p-2 rounded-full border border-gray-400 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder={dynamicTranslate(
              lang,
              'Escribe un comentario...',
              'Write a comment...'
            )}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddComment()
              }
            }}
          />
          <button
            className='bg-blue-500 text-white px-4 py-3 rounded-full hover:bg-blue-600 transition'
            onClick={handleAddComment}
          >
            <img className='w-5' src='/send.png' alt='Arrow' />
          </button>
        </div>

        {/* Alert message */}
        {showMessage && (
          <div className='fixed top-32 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-center p-2 rounded shadow-lg z-[1000]'>
            {alertMessage}
          </div>
        )}

        {/* Bingo card and drawn balls container */}
        <div className='absolute bottom-8 left-0 right-0 flex justify-between items-start w-[90%]'>
          {/* Bingo card section (70% width) */}
          <div className='text-center text-yellow-600 font-bold w-[70%]'>
            {!selectedCard ? (
              <h2 className='mb-2 text-2xl italic -rotate-12'>
                {dynamicTranslate(
                  lang,
                  'Elige una Tarjeta de Bingo',
                  'Choose a Bingo Card:'
                )}
              </h2>
            ) : (
              <div className='mb-2 text-lg w-full justify-center items-center'>
                <BingoCard
                  lang={lang}
                  card={selectedCard}
                  numbers={Array.from(markedNumbers)}
                />
              </div>
            )}
            <h3 className='text-xl text-red-500 text-center font-black my-2'>
              {dynamicTranslate(lang, 'Tarjetas:', 'Cards:')}
            </h3>
            {/* Display 4 bingo cards for selection */}
            <div className='grid grid-cols-4 gap-1 mb-2 w-full md:w-[80%] mx-auto'>
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className='text-white text-sm p-2 m-2 rounded-lg shadow-lg cursor-pointer bg-color-4 hover:bg-color-5 transition mb-4'
                  onClick={() => handleSelectCard(card)}
                >
                  {idx + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Drawn balls section (30% width) */}
          <div className='flex flex-col items-center w-[30%]'>
            <div className='grid grid-cols-2 gap-4 justify-between items-center'>
              {drawnBalls.length === 0 && (
                <img
                  className={`h-12 w-12 text-sm md:w-16 md:h-16 rounded-full text-slate-500 font-bold flex items-center justify-center mx-2 mb-4 cursor-pointer transition-colors `}
                  src={initBall.src}
                  alt={dynamicTranslate(lang, 'Bola', 'Bola')}
                />
              )}
              {drawnBalls.map((ball, idx) => (
                //The balls are showing in here, can you do it?
                <img
                  key={idx}
                  className={`h-12 w-12 text-sm md:w-16 md:h-16 rounded-full text-slate-500 font-bold flex items-center justify-center mx-2 mb-4 cursor-pointer transition-colors ${
                    markedNumbers.has(ball) ? 'bg-green-500' : ''
                  } ${fadeOutBalls.has(ball) ? 'animate-fadeOut' : ''}`}
                  src={`/balotas/bola${ball}.png`}
                  alt={dynamicTranslate(lang, `Bola ${ball}`, `Ball ${ball}`)}
                  onClick={() => handleMarkNumber(ball)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BingoVideoPlayer
