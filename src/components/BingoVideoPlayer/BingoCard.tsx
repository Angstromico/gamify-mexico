import React, { useState, useEffect } from 'react'
import { dynamicTranslate } from 'src/utils'
import type { Lang } from '@interfaces/index'
import frijol from '@assets/frijol.png'

interface BingoCardProps {
  card: number[] | null
  numbers?: number[]
  lang?: Lang
}

const BingoCard: React.FC<BingoCardProps> = ({
  card,
  numbers,
  lang = 'es',
}) => {
  const [markedNumbers, setMarkedNumbers] = useState<Set<number>>(new Set())
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showMessage, setShowMessage] = useState(false)
  const [progress, setProgress] = useState(100)

  // Function to handle when a number is clicked
  const handleNumberClick = (number: number) => {
    if (!numbers) {
      displayError(
        dynamicTranslate(
          lang,
          'No hay números para tomar',
          'There are no numbers to take'
        )
      )
      return
    }

    if (numbers.includes(number)) {
      setMarkedNumbers((prev) => {
        const newSet = new Set(prev)
        newSet.add(number) // Add the clicked number to the marked numbers
        return newSet
      })
    } else {
      displayError(
        dynamicTranslate(
          lang,
          'El número elegido es invalido',
          'The clicked number is invalid'
        )
      )
    }
  }

  // Function to display error messages temporarily
  const displayError = (message: string) => {
    setErrorMessage(message)
    setShowMessage(true)
    setProgress(100) // Reset the progress bar
    setTimeout(() => {
      setShowMessage(false)
    }, 3000) // Show the message for 3 seconds
  }

  // Handle progress bar shrinking
  useEffect(() => {
    if (showMessage) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 1, 0))
      }, 30)

      return () => clearInterval(interval)
    }
  }, [showMessage])
  if (!card) return null

  return (
    <>
      <div className='w-[70%] md:w-[80%] bg-red-700 mx-auto rounded-t-md'>
        <h2 className='text-xl text-center font-bold text-white'>Bingo</h2>
      </div>
      {/* Floating alert message with fade effect */}
      <div
        className={`fixed top-10 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black text-center p-2 mb-2 rounded shadow-lg w-4/5 max-w-md z-50 transition-opacity ease-in-out duration-1000 ${
          showMessage ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p>{errorMessage}</p>
        <div className='w-full h-1 bg-black mt-2'>
          <div
            className='h-full bg-red-500'
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className='grid grid-cols-5 gap-0 justify-center items-center text-white rounded-lg shadow-lg w-[70%] md:w-[78%] mx-auto'>
        {card.map((number, idx) => (
          <div
            key={idx}
            onClick={() => handleNumberClick(number)} // Handle click event
            className={`w-8 h-8 sm:w-10 sm:h-10 cursor-pointer p-1 border-2 border-black flex items-center justify-center font-bold text-xs sm:text-sm md:text-lg bg-opacity-50 ${
              number === 0
                ? 'bg-red-700'
                : markedNumbers.has(number) // Check if the number is marked
                ? 'bg-green-500' // Highlight the chosen number
                : 'bg-blue-700'
            } relative`}
          >
            {number === 0 ? 'B' : number}
            {markedNumbers.has(number) && (
              <img
                className='w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'
                src={frijol.src}
                alt='frijol'
              />
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default BingoCard
