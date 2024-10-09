import React, { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'
import { generateBingoCard } from '@constants/index'
import { dynamicTranslate } from 'src/utils'
import type { Lang } from '@interfaces/index'
import BingoCard from './BingoCard'

const BingoVideoPlayer: React.FC = ({ lang = 'es' }: { lang?: Lang }) => {
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

  const commentsRef = useRef<HTMLDivElement | null>(null)

  // Simulate adding a new ball every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const newBall = Math.floor(Math.random() * 75) + 1
      setDrawnBalls((prev) =>
        prev.length >= 3 ? [...prev.slice(1), newBall] : [...prev, newBall]
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

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
        <ReactPlayer
          url='https://www.youtube.com/embed/-gEFDcfyyMg?autoplay=1&rel=0&showinfo=0&controls=0&modestbranding=0'
          width='100%'
          height='100%'
          playing
          loop
          className='rounded-xl overflow-hidden'
          style={{ objectFit: 'cover' }}
        />

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
            <div className='text-yellow-600 font-bold text-xl mb-2'>
              {dynamicTranslate(lang, 'Bolas Extraídas', 'Drawn Balls')}
            </div>
            <div className='flex flex-col flex-wrap justify-center mt-2'>
              {drawnBalls.map((ball, idx) => (
                <div
                  key={idx}
                  className={`h-7 w-7 text-sm md:w-9 md:h-9 rounded-full bg-yellow-500 hover:bg-yellow-700 hover:text-n-1 text-slate-500 font-bold flex items-center justify-center mx-2 mb-2 cursor-pointer transition-colors ${
                    markedNumbers.has(ball) ? 'bg-green-500' : ''
                  } ${fadeOutBalls.has(ball) ? 'animate-fadeOut' : ''}`}
                  onClick={() => handleMarkNumber(ball)}
                >
                  {ball}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BingoVideoPlayer
