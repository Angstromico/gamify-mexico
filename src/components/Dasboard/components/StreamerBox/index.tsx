import { useState, useEffect } from 'react'
import { dynamicTranslate } from 'src/utils'
import classes from './style.module.scss'
import type { Lang } from '@interfaces/index'

const StreamerBox = ({ lang }: { lang: Lang }) => {
  const [urlStream, setUrlStream] = useState('')
  const [on_live, setOnLive] = useState(false)

  const handleStartStream = async () => {
    const loginData = localStorage.getItem('loginData')
    if (loginData) {
      await setOnLive(!on_live)
      console.log('on_live', on_live)
      const { token } = JSON.parse(loginData)
      console.log('token', token)
      const formData = new FormData()
      formData.append('urlStreaming', on_live ? urlStream : '')
      formData.append('on_live', on_live.toString())

      const response = fetch('http://127.0.0.1:8000/api-v01/streamer/update/', {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      })
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
        })
        .catch((error) => {
          // Manejar errores
          console.error('Error:', error)
        })
    } else {
      console.log('No hay token en localStorage')
      return
    }
  }
  return (
    <div className={classes.coupon}>
      <h2>
        {dynamicTranslate(lang, 'Inicia tu streaming', 'start streaming')}
      </h2>

      {/* Secret Code Section */}
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
            className='w-full'
          ></input>
        </div>
      </div>
      <div className='flex flex-col gap-3 md:flex-row items-center mt-4 w-full justify-center'>
        <button
          onClick={() => handleStartStream()}
          className='ml-4 bg-color-3 hover:bg-color-2 text-white font-bold py-2 px-4 rounded-lg transition duration-300'
        >
          {on_live
            ? dynamicTranslate(lang, 'Detener Streaming', 'Stop Streaming')
            : dynamicTranslate(lang, 'Iniiciar Streaming', 'Start Streaming')}
        </button>
      </div>
    </div>
  )
}

export default StreamerBox
