import { useState, useEffect } from 'react'
import { dynamicTranslate } from 'src/utils'
import type { Lang } from '@interfaces/index'

function TriviaCard({
  triviaGameId,
  questionId,
  question,
  options,
  onAnswer,
  lang = 'es',
}: {
  triviaGameId: number
  questionId: number
  question: string
  options: string[]
  onAnswer: (answer: string | null) => void
  lang?: Lang
}) {
  const [timeLeft, setTimeLeft] = useState(10)
  const [showPopup, setShowPopup] = useState(false)
  const [showPopupError, setShowPopupError] = useState(false)
  const [messagePopup, setMessagePopup] = useState('')
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(
    null
  )
  const [answered, setAnswered] = useState(false) // Track if the user has answered
  const loginData = localStorage.getItem('loginData')

  useEffect(() => {
    if (loginData) {
      const { token } = JSON.parse(loginData)
      console.log('token', token)
    } else {
      console.log('No hay token en localStorage')
    }
  }, [loginData])

  useEffect(() => {
    resetQuestion()
    return () => clearTimer() // Cleanup on unmount or question change
  }, [question]) // Reset when a new question comes

  const handleAnswer = (answer: string) => {
    if (loginData) {
      const { token } = JSON.parse(loginData)
      console.log('token', token)

      const responseAnswer = fetch(
        'http://api.gamifymexico.com/api-v01/trivia-answer/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            triviaGameId,
            questionId,
            answer,
          }),
        }
      )
        .then((response) => {
          // Verificar si la respuesta fue exitosa
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`)
          }
          // Obtener los datos en formato JSON
          return response.json()
        })
        .then((data) => {
          // Manejar los datos JSON
          console.log('data', data)
          setShowPopup(true)
          setMessagePopup(data.message)
        })
        .catch((error) => {
          if (error.response) {
            // El servidor respondió con un código de estado fuera del rango de 2xx
            console.error(error.response.data.message) // Mostrar el mensaje de error del servidor
          } else if (error.request) {
            // La petición se hizo pero no se recibió respuesta
            console.error('Error en la petición:', error.request)
          } else {
            // Algo más ocurrió al configurar la petición
            console.error('Error:', error.message)
          }

          // Manejar errores
          console.error('Error:', error)

          setShowPopupError(true)
          setMessagePopup(error.response.data.message)
        })
    } else {
      // ... maneja el caso en que no haya token en localStorage
    }

    //clearTimer()
    //onAnswer(answer)
    //setAnswered(true) // Set answered to true when user selects an answer
  }

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer)
      setTimer(null)
    }
  }

  const triggerPopup = () => {
    onAnswer(null) // Notify no answer
    setShowPopup(true)
    setTimeout(() => {
      setShowPopup(false) // Hide popup after 3 seconds
    }, 3000)
  }

  const resetQuestion = () => {
    setTimeLeft(10)
    setAnswered(false) // Reset answered state for new question
  }

  return (
    <div className='relative animate-slide-up overflow-hidden w-full max-w-[400px]'>
      <div className='p-4 bg-black bg-opacity-50 w-[90%] flex flex-col justify-center items-center m-auto rounded-t-lg shadow-lg'>
        {/* Show the "thank you" message if answered, otherwise show the question */}
        {answered ? (
          <h2 className='italic text-lg font-black text-gold-500 transform rotate-1'>
            {dynamicTranslate(
              lang,
              '¡Gracias por tu respuesta!',
              'Thanks for your answer!'
            )}
          </h2>
        ) : (
          <h2 className='text-lg font-bold mb-4'>{question}</h2>
        )}

        {!answered && (
          <div className='flex flex-col space-y-2'>
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() =>
                  handleAnswer(index == 0 ? 'A' : index == 1 ? 'B' : 'C')
                }
                className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded'
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {timer && (
        <span className='absolute bottom-2 right-2 text-sm'>{timeLeft}s</span>
      )}

      {showPopup && (
        <div className='fixed left-1/2 transform -translate-x-1/2 p-4 bg-violet-800 text-white rounded shadow-lg top-5 w-[90%] max-w-96 text-center'>
          <p>{messagePopup}</p>
        </div>
      )}
      {showPopupError && (
        <div className='fixed left-1/2 transform -translate-x-1/2 p-4 bg-red-800 text-white rounded shadow-lg top-5 w-[90%] max-w-96 text-center'>
          <p>{messagePopup}</p>
        </div>
      )}
    </div>
  )
}

export default TriviaCard
