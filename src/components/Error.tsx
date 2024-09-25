import { useState, useEffect } from 'react'
import { currentLang } from '@store/*'

type ErrorType = {
  title: string
  description: string
  oopsText: string
  buttonText: string
  link: string
} | null

const Error = () => {
  //I want to increase the size of the face and the 4 and for on the 404 message
  const [text, setText] = useState<ErrorType>(null)

  useEffect(() => {
    // Get current language ('es' for Spanish, 'en' for English)
    const lang = currentLang.get()

    // Translations
    const translations = {
      en: {
        title: '404 Not Found',
        description: 'Page not found on Gamify Mexico',
        oopsText: 'Oops. Looks like you took a wrong turn.',
        buttonText: 'Go back to homepage',
        link: '/en',
      },
      es: {
        title: '404 No Encontrado',
        description: 'Página no encontrada en Gamify México',
        oopsText: 'Ups. Parece que tomaste un camino equivocado.',
        buttonText: 'Volver a la página principal',
        link: '/',
      },
    }

    // Set the translated text, defaulting to English if lang is not 'es'
    setText(translations[lang] || translations['en'])
  }, [])

  // Handle initial state when text is null
  if (!text) return null

  return (
    <section className='flex items-center justify-center min-h-screen text-white bg-gradient-to-br from-indigo-500 to-purple-700'>
      <div className='w-full max-w-md rounded-lg shadow-md p-6 text-center'>
        <div className='container-title'>
          <div className='title flex justify-center items-center space-x-2'>
            {/* Increased text size for the "404" numbers */}
            <span className='text-8xl font-bold'>4</span>
            <div className='moon relative'>
              {/* Increased size for the moon face */}
              <div className='face'>
                <div className='mouth bg-red-500 w-6 h-4 rounded-full mx-auto'></div>
                <div className='eyes flex justify-between mt-1'>
                  {/* Increased eye size */}
                  <div className='eye-left bg-black w-4 h-4 rounded-full'></div>
                  <div className='eye-right bg-black w-4 h-4 rounded-full'></div>
                </div>
              </div>
            </div>
            <span className='text-8xl font-bold'>4</span>
          </div>
        </div>
        <p className='subtitle text-2xl mt-4'>{text.oopsText}</p>

        <div className='mt-6'>
          <a
            href={text.link}
            className='w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            {text.buttonText}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Error
