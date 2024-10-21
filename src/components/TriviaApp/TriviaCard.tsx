import { useState, useEffect } from 'react'
import { dynamicTranslate } from 'src/utils'
import type { Lang } from '@interfaces/index'

function TriviaCard({
  question,
  options,
  onAnswer,
  lang = 'es',
}: {
  question: string
  options: string[]
  onAnswer: (answer: string | null) => void
  lang?: Lang
}) {
  const [timeLeft, setTimeLeft] = useState(10)
  const [showPopup, setShowPopup] = useState(false)
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(
    null
  )
  const [answered, setAnswered] = useState(false) // Track if the user has answered

  useEffect(() => {
    resetQuestion()
    return () => clearTimer() // Cleanup on unmount or question change
  }, [question]) // Reset when a new question comes

  const handleAnswer = (answer: string) => {
    clearTimer()
    onAnswer(answer)
    setAnswered(true) // Set answered to true when user selects an answer
  }

  const startTimer = () => {
    const newTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearTimer()
          triggerPopup()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
    setTimer(newTimer)
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
    startTimer()
  }

  return (
    <div className='relative animate-slide-up'>
      <div className='p-4 bg-black bg-opacity-5 rounded-lg shadow-md'>
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
          <p>{dynamicTranslate(lang, '¡Se acabó el tiempo!', "Time's up!")}</p>
        </div>
      )}
    </div>
  )
}

export default TriviaCard
