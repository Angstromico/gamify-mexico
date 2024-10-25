import { useState, useEffect, useCallback } from 'react'
import useAuthRedirect from '@hooks/useAuthRedirect'
import { dynamicTranslate } from 'src/utils'
import TriviaCard from './TriviaCard'
import ReactPlayer from 'react-player/youtube'
import type { Lang } from '@interfaces/index'

interface Question {
  id: number
  question: string
  options: string[]
}

function TriviaApp({
  lang = 'es',
  idTrivia = 0,
  WS = '',
}: {
  lang?: Lang
  idTrivia: number
  WS: string
}) {
  const [isMounted, setIsMounted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: 0,
    question: '',
    options: [],
  })
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [askedQuestions, setAskedQuestions] = useState<number[]>([])
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')
  const [openTriviaQuestions, setOpenTriviaQuestions] = useState(false)

  useAuthRedirect(lang)

  const handleWebSocketData = useCallback((data: any) => {
    let dataArray: Array<string[]> = []
    console.log(data)
    if (data.type_ws === 'started') {
      dataArray.push(['inicio'])
    } else if (data.type_ws === 'question') {
      setCurrentQuestion({
        id: data.trivia.id,
        question: data.trivia.question,
        options: [
          data.trivia.option_a,
          data.trivia.option_b,
          data.trivia.option_c,
        ],
      })
    } else if (data.type_ws === 'close_trivia') {
      setOpenTriviaQuestions(false)
    }
  }, [])

  const t = (es: string, en: string) => dynamicTranslate(lang, es, en)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setOpenTriviaQuestions(true)
  }, [currentQuestion])

  useEffect(() => {
    const connectSocket = () => {
      const socket = new WebSocket(`${WS}${idTrivia}/`)
      socket.onopen = () => {
        console.log('WebSocket connection established')
        const loginData = localStorage.getItem('loginData')
        if (loginData) {
          const { token } = JSON.parse(loginData)
          const headers = {
            authToken: `${token}`,
          }
          socket.send(JSON.stringify({ headers }))
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
        console.log(`WebSocket connection closed for socket`)
        connectSocket() // Try reconnecting with the next socket number
      }
    }

    connectSocket()

    // Cleanup function to close socket on unmount
  }, [])

  const startGame = () => {
    setIsGameStarted(true)
    setAskedQuestions([])
  }

  const handleAnswer = () => {
    return true
    /*
    if (currentQuestion) {
      if (answer === currentQuestion) {
        setPopupMessage(
          t(
            '¡Felicidades! Respuesta correcta.',
            'Congratulations! Correct answer.'
          )
        )
      } else {
        setPopupMessage(
          t(
            'Respuesta incorrecta. Inténtalo de nuevo.',
            'Wrong answer. Try again.'
          )
        )
      }

      setShowPopup(true)

      // Hide popup after 2 seconds
      setTimeout(() => {
        setShowPopup(false)
      }, 2000)
    }*/
  }

  return (
    <div className='relative w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center'>
      <div className='relative w-screen h-screen max-w-[400px]'>
        {isMounted && (
          <ReactPlayer
            url='https://www.youtube.com/shorts/636beEW2S6Q?autoplay=1&rel=0&showinfo=0&controls=0&modestbranding=0'
            width='100%'
            height='100%'
            playing={true}
            controls={false}
            loop
            className='rounded-xl overflow-hidden'
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className='absolute z-50 bottom-5 left-0 w-full flex justify-center items-center flex-col'>
          <h1 className='text-center text-3xl font-bold mb-4 text-yellow-600'>
            {t('¡Desafío de trivia!', 'Trivia Challenge!')}
          </h1>
          {openTriviaQuestions && (
            <TriviaCard
              triviaGameId={idTrivia}
              questionId={currentQuestion.id}
              question={currentQuestion.question}
              options={currentQuestion.options}
              onAnswer={handleAnswer}
              lang={lang}
            />
          )}

          {/* Popup for feedback */}
          {showPopup && (
            <div className='fixed left-1/2 transform -translate-x-1/2 p-4 bg-violet-800 text-white rounded shadow-lg top-5 w-[90%] max-w-96 text-center'>
              {popupMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TriviaApp
