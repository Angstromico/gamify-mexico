import { splitTextToLines } from 'src/utils'
import { currentLang } from '@store/*'

const TriviaComponent = () => {
  const es = `
    ¡Bienvenidos al Show de Trivias La Quincena! La emocionante competencia interactiva que pone a prueba tus habilidades y conocimientos, donde nuestro streamer te desafiará con divertidas dinámicas y preguntas fáciles que ofrecen recompensas reales en tiempo real. Lucha por alcanzar el podio acumulando puntos y su increíble recompensa quincenal.

    Para disfrutar esta experiencia única sólo necesitas un teléfono móvil, ser miembro registrado de GamifyMéxico y no perderte la transmisión en vivo de Show de Trivias de lunes a sábado a las 8 p.m. hora de CDMX a través de nuestras redes sociales.

    ¡Únete, disfruta y conquista múltiples recompensas!

    Prepárate para nuevas rondas de preguntas cada semana, con temas variados que van desde cultura general hasta conocimientos sobre tendencias actuales. La Quincena está diseñada para todos, desde principiantes hasta expertos, y ofrece la posibilidad de ganar recompensas reales por tu participación.

    ¿Listo para el desafío? Cada pregunta te acerca más a la cima, y cada semana se acumulan más premios para los mejores jugadores. No te lo pierdas y demuestra cuánto sabes.
  `

  const en = `
    Welcome to the Trivia Show La Quincena! The exciting interactive competition that tests your skills and knowledge, where our streamer challenges you with fun dynamics and easy questions that offer real-time rewards. Fight to reach the podium by accumulating points for an amazing biweekly prize.

    To enjoy this unique experience, all you need is a mobile phone, to be a registered member of GamifyMexico, and not to miss the live Trivia Show broadcast from Monday to Saturday at 8 p.m. CDMX time on our social networks.

    Join in, enjoy, and conquer multiple rewards!

    Get ready for new rounds of questions every week, with diverse topics ranging from general knowledge to current trends. La Quincena is designed for everyone, from beginners to experts, offering the chance to earn real rewards for your participation.

    Are you up for the challenge? Each question brings you closer to the top, with more rewards accumulating each week for the best players. Don’t miss out and show us what you know.
  `

  const esText = splitTextToLines(es)
  const enText = splitTextToLines(en)
  const arrText = currentLang.get() === 'es' ? esText : enText

  return (
    <div className='flex flex-col items-center justify-start w-full h-full max-h-[80vh] overflow-y-auto bg-n-8 text-n-1'>
      <div className='w-full max-w-md md:max-w-lg p-4'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl mb-4 text-yellow-500 font-bold text-center mt-5'>
          <span className='text-gray-400'>La</span> Quincena
        </h1>
        {arrText.map((arr, index) => (
          <p
            key={index}
            className='text-sm md:text-base lg:text-lg mb-4 text-justify'
          >
            {arr}
          </p>
        ))}
      </div>
    </div>
  )
}

export default TriviaComponent
