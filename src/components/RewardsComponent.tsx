import { FaStar, FaTrophy, FaGift, FaMedal } from 'react-icons/fa'
import type { Lang } from '@interfaces/index'
import { dynamicTranslate } from 'src/utils'

const RewardsComponent = ({ lang }: { lang: Lang }) => {
  // Array of rewards for illustration
  const rewards = [
    {
      icon: <FaStar size={28} />,
      title: dynamicTranslate(lang, 'Insignia Exclusiva', 'Exclusive Badge'),
      description: dynamicTranslate(
        lang,
        'Gana una insignia única para mostrar en tu perfil.',
        'Earn a unique badge to display on your profile.'
      ),
    },
    {
      icon: <FaTrophy size={28} />,
      title: dynamicTranslate(
        lang,
        'Puntos de Clasificación',
        'Leaderboard Points'
      ),
      description: dynamicTranslate(
        lang,
        'Gana puntos extra para escalar en la clasificación.',
        'Gain extra points to climb the leaderboard.'
      ),
    },
    {
      icon: <FaGift size={28} />,
      title: dynamicTranslate(lang, 'Regalo Sorpresa', 'Mystery Gift'),
      description: dynamicTranslate(
        lang,
        'Desbloquea un regalo sorpresa por un rendimiento destacado.',
        'Unlock a surprise gift for top performance.'
      ),
    },
    {
      icon: <FaMedal size={28} />,
      title: dynamicTranslate(lang, 'Medalla Semanal', 'Weekly Medal'),
      description: dynamicTranslate(
        lang,
        'Colecciona medallas por cada semana exitosa.',
        'Collect medals for each successful week.'
      ),
    },
  ]

  return (
    <div className='text-center'>
      <h2 className='text-xl font-bold mb-4'>
        {dynamicTranslate(lang, 'Recompensas Disponibles', 'Available Rewards')}
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {rewards.map((reward, index) => (
          <div
            key={index}
            className='bg-gray-700 p-4 rounded-lg flex items-center space-x-3 text-white hover:bg-gray-600 transition-colors'
          >
            {reward.icon}
            <div className='text-left'>
              <h3 className='font-semibold'>{reward.title}</h3>
              <p className='text-sm'>{reward.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RewardsComponent
