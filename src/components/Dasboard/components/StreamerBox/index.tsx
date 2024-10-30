import { useState, useEffect } from 'react'
import { dynamicTranslate } from 'src/utils'
import classes from './style.module.scss'
import type { Lang } from '@interfaces/index'
import type { LoginData } from '@hooks/useAuthStatus'

const StreamerBox = ({ lang }: { lang: Lang }) => {
  const [urlStream, setUrlStream] = useState('')
  const [on_live, setOnLive] = useState<boolean | undefined>(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('') // Error state for invalid URL

  useEffect(() => {
    const storedData = localStorage.getItem('loginData')
    if (storedData) {
      const loginData: LoginData = JSON.parse(storedData)
      setOnLive(loginData.streamer?.on_live)
    }
  }, [])

  useEffect(() => {
    const storedData = localStorage.getItem('loginData')
    if (storedData) {
      const loginData: LoginData = JSON.parse(storedData)
      if (loginData.streamer) {
        loginData.streamer.on_live = on_live
        localStorage.setItem('loginData', JSON.stringify(loginData))
      }
    }
  }, [on_live])

  const validateUrl = (url: string) => {
    const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([/?#].*)?$/i
    return urlPattern.test(url)
  }

  const handleStartStream = async () => {
    if (!on_live && !validateUrl(urlStream)) {
      setError(
        dynamicTranslate(
          lang,
          'URL inválida. Por favor ingrese una URL válida.',
          'Invalid URL. Please enter a valid URL.'
        )
      )
      return
    }

    const loginData = localStorage.getItem('loginData')
    if (!loginData) {
      console.log('No token found in localStorage')
      return
    }

    const { token, username } = JSON.parse(loginData)
    if (!username || !token) {
      console.error('No streamer data or name found')
      return
    }

    setIsSubmitting(true)
    setError('') // Clear any previous error

    try {
      const formData = new FormData()
      formData.append('urlStreaming', on_live ? '' : urlStream)
      formData.append('on_live', (!on_live).toString())
      formData.append('name', username) // Add the name from loginData

      const response = await fetch(import.meta.env.PUBLIC_STREAM, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log('Stream status updated:', data)

      setOnLive(!on_live) // Toggle only after a successful response
    } catch (error) {
      console.error('Error updating stream status:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={classes.coupon}>
      {!on_live && (
        <h2>
          {dynamicTranslate(lang, 'Inicia tu streaming', 'Start the streaming')}
        </h2>
      )}
      {on_live && (
        <h2>
          {dynamicTranslate(lang, 'Deten tu streaming', 'Stop the streaming')}
        </h2>
      )}

      {/* Conditionally render Stream URL Input */}
      {!on_live && (
        <div className='flex flex-col gap-3 md:flex-row items-center mt-4'>
          <p className='text-sm text-center font-semibold text-n-2 mr-4'>
            {dynamicTranslate(lang, 'url de tu stream', 'stream url')}:
          </p>
          <div className='flex w-full items-center justify-center sm:justify-start bg-white text-n-4 px-4 py-2 rounded-lg'>
            <input
              type='text'
              value={urlStream}
              onChange={(e) => setUrlStream(e.target.value)}
              placeholder={dynamicTranslate(
                lang,
                'url de tu stream',
                'stream url'
              )}
              className='w-full focus:outline-none'
              style={{ border: 'none' }}
            />
          </div>
          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        </div>
      )}

      {/* Stream Toggle Button */}
      <div className='flex flex-col gap-3 md:flex-row items-center mt-4 w-full justify-center'>
        <button
          onClick={handleStartStream}
          className={`ml-4 ${
            isSubmitting ? 'bg-gray-400' : 'bg-color-3 hover:bg-color-2'
          } text-white font-bold py-2 px-4 rounded-lg transition duration-300`}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? dynamicTranslate(lang, 'Cargando...', 'Loading...')
            : on_live
              ? dynamicTranslate(lang, 'Detener Streaming', 'Stop Streaming')
              : dynamicTranslate(lang, 'Iniciar Streaming', 'Start Streaming')}
        </button>
      </div>
    </div>
  )
}

export default StreamerBox
