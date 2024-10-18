import { useState } from 'react'
import { dynamicTranslate } from 'src/utils'
import classes from './style.module.scss'
import type { Lang } from '@interfaces/index'

// Helper function to generate a random secret code
const generateSecretCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase() // 6-character random code
}

const CouponBox = ({ lang }: { lang: Lang }) => {
  const [secretCode, setSecretCode] = useState(generateSecretCode())

  return (
    <div className={classes.coupon}>
      <h2>
        {dynamicTranslate(lang, 'Atrapa una recompensa', 'Catch a reward')}
      </h2>

      {/* Secret Code Section */}
      <div className='flex flex-col gap-3 md:flex-row items-center mt-4'>
        <p className='text-sm text-center font-semibold text-n-2 mr-4'>
          {dynamicTranslate(lang, 'Código secreto', 'Secret Code')}:
        </p>
        <div className='flex w-full items-center justify-center sm:justify-start bg-white text-n-4 px-4 py-2 rounded-lg'>
          <span className='font-mono text-xl'>{secretCode}</span>
        </div>
        <button
          onClick={() => setSecretCode(generateSecretCode())}
          className='ml-4 bg-color-3 hover:bg-color-2 text-white font-bold py-2 px-4 rounded-lg transition duration-300'
        >
          {dynamicTranslate(lang, 'Enviar', 'Send')}
        </button>
      </div>
    </div>
  )
}

export default CouponBox
