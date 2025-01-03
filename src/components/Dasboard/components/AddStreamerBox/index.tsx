import { useState, useEffect } from 'react'
import { dynamicTranslate } from 'src/utils'
import classes from './style.module.scss'
import type { Lang } from '@interfaces/index'

const AddStreamerBox = ({ lang }: { lang: Lang }) => {
  const [email, setEmail] = useState('')

  const handleStartStream = async () => {
    const loginData = localStorage.getItem('loginData')
    if (loginData) {
      const { token } = JSON.parse(loginData)
      const formData = new FormData()
      formData.append('email', email)

      const response = fetch(
        'http://api.gamifymexico.com/api-v01/streamer/add-streamer/',
        {
          method: 'POST',
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
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
        {dynamicTranslate(lang, 'Agreaga un Streamer', 'Start some streaming')}
      </h2>

      {/* Secret Code Section */}
      <div className='flex flex-col gap-3 md:flex-row items-center mt-4'>
        <p className='text-sm text-center font-semibold text-n-2 mr-4'>
          {dynamicTranslate(lang, 'Agregar streamer', 'Add streamer')}:
        </p>
        <div className='flex w-full items-center justify-center sm:justify-start bg-white text-n-4 px-4 py-2 rounded-lg'>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dynamicTranslate(
              lang,
              'Email del streamer',
              'Streamer email'
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
          {dynamicTranslate(lang, 'Agregar streamer', 'Add streamer')}
        </button>
      </div>
    </div>
  )
}

export default AddStreamerBox
