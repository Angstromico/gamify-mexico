import { useState } from 'react'
import { dynamicTranslate } from 'src/utils'
import { loading } from '@assets/index'
import type { Lang } from '@interfaces/index'

interface Props {
  classes?: string
  loadingText: string
  lang: Lang
}
const Generating = ({ classes, loadingText, lang }: Props) => {
  const [inputText, setInputText] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const handleSend = () => {
    if (inputText.trim()) {
      setShowAlert(true)

      // Hide alert after 2500ms
      setTimeout(() => {
        setShowAlert(false)
        setInputText('') // Clear input after sending
      }, 2500)
    }
  }

  return (
    <>
      <div
        className={`flex items-center px-6 bg-n-8/80 rounded-3xl ${
          classes ?? ''
        } text-base`}
      >
        <img
          className='w-5 h-5 mr-4 animate-spin'
          src={loading.src}
          alt={loadingText}
        />
        <input
          type='text'
          className='bg-transparent py-4 flex-1 outline-none text-white mr-2'
          placeholder={loadingText}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend()
            }
          }}
        />
      </div>
      {/* Custom alert */}
      {showAlert && (
        <div
          className={`fixed top-32 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 text-white text-center p-4 rounded-lg shadow-lg opacity-0 transition-opacity duration-500 ease-in-out ${
            showAlert ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className='flex items-center justify-center mb-2'>
            <img
              className='w-5 h-5 mr-2 animate-spin'
              src={loading.src}
              alt='Loading'
            />
            <span>
              {dynamicTranslate(lang, 'Mensaje Enviado:', 'Message Sent:')}{' '}
              {inputText}
            </span>
          </div>

          {/* Progress Bar */}
          <div className='relative w-full h-2 bg-white/20 rounded-full overflow-hidden'>
            <div
              className='absolute left-0 top-0 h-full bg-white animate-progress-bar'
              style={{ animationDuration: '2.5s' }}
            />
          </div>
        </div>
      )}

      {/* Styles for Progress Bar Animation */}
      <style>{`
        @keyframes progress-bar {
          0% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }
        .animate-progress-bar {
          animation: progress-bar linear forwards;
        }
      `}</style>
    </>
  )
}
export default Generating
