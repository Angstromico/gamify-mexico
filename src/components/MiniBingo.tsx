import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Box } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { splitTextToLines } from 'src/utils'
import { currentLang } from '@store/*'

const getRandomColor = () =>
  new THREE.Color(Math.random(), Math.random(), Math.random())

const bingoWordsTranslations = {
  en: ['Bingo', 'Lucky', 'Winner', 'Jackpot', 'Chance', 'Fortune'],
  es: ['Bingo', 'Suerte', 'Ganador', 'Premio', 'Oportunidad', 'Fortuna'],
}

const BingoCube = () => {
  const meshRef = useRef()
  const [faceColors, setFaceColors] = useState(
    Array(6).fill().map(getRandomColor)
  )
  const [textColor, setTextColor] = useState('gold')
  const [rotation, setRotation] = useState([0, 0, 0])
  const bingoWords = bingoWordsTranslations[currentLang.get()]

  const cubeSize = 2.5 // Reduced size for modal fit

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextColor((prev) => (prev === 'gold' ? 'silver' : 'gold'))
      setRotation([
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ])
      setFaceColors((prevColors) => prevColors.map(() => getRandomColor()))
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x +=
        (rotation[0] - meshRef.current.rotation.x) * 0.1
      meshRef.current.rotation.y +=
        (rotation[1] - meshRef.current.rotation.y) * 0.1
      meshRef.current.rotation.z +=
        (rotation[2] - meshRef.current.rotation.z) * 0.1
    }
  })

  return (
    <Box ref={meshRef} args={[cubeSize, cubeSize, cubeSize]}>
      {faceColors.map((color, index) => (
        <meshStandardMaterial
          key={index}
          attachArray='material'
          color={color}
        />
      ))}
      {bingoWords.map((word, index) => {
        const positions = [
          [0, 0, cubeSize / 2 + 0.01],
          [0, 0, -cubeSize / 2 - 0.01],
          [cubeSize / 2 + 0.01, 0, 0],
          [-cubeSize / 2 - 0.01, 0, 0],
          [0, cubeSize / 2 + 0.01, 0],
          [0, -cubeSize / 2 - 0.01, 0],
        ]
        const rotations = [
          [0, 0, 0],
          [0, Math.PI, 0],
          [0, Math.PI / 2, 0],
          [0, -Math.PI / 2, 0],
          [-Math.PI / 2, 0, 0],
          [Math.PI / 2, 0, 0],
        ]
        return (
          <Text
            key={index}
            position={positions[index]}
            rotation={rotations[index]}
            fontSize={0.3}
            color={textColor}
          >
            {word}
          </Text>
        )
      })}
    </Box>
  )
}

const MiniBingo = () => {
  const es = `
    Ahora puedes jugar bingo sin la necesidad de apostar. Lo mejor de todo es que no solo te diviertes como loco sino que también podrás obtener múltiples recompensas en tiempo real.

    Como miembro de nuestra comunidad GamifyMéxico, tendrás acceso exclusivo a toda la diversión interactiva que ofrecemos. Con Bingo57 de GamifyMéxico alcanzar el podio y capturar recompensas es una realidad.

    ¡Bienvenido al show interactivo de recompensas reales!

    Únete a miles de jugadores que cada día se divierten y ganan en Bingo57. Participa en eventos especiales, descubre nuevas formas de ganar, y conviértete en uno de nuestros campeones.

    Recuerda, en GamifyMéxico, cada partida es una oportunidad para ser el mejor. ¡Juega ahora y forma parte de la diversión sin fin!
  `

  const en = `
    Now you can play bingo without the need to bet. Best of all, you will not only have a lot of fun but you will also be able to obtain multiple rewards in real time.

    As a member of our GamifyMexico community, you get exclusive access to all the interactive fun we offer. With GamifyMexico's Bingo57, reaching the podium and capturing rewards is a reality.

    Welcome to the interactive show of real rewards!

    Join thousands of players who have fun and win every day on Bingo57. Participate in special events, discover new ways to win, and become one of our champions.

    Remember, at GamifyMexico, every game is an opportunity to be the best. Play now and be part of the endless fun!
  `
  const esText = splitTextToLines(es)
  const enText = splitTextToLines(en)
  const arrText = currentLang.get() === 'es' ? esText : enText

  return (
    <div className='flex flex-col items-center justify-center overflow-y-auto max-h-[1000px] w-full h-full bg-n-8 text-n-1 no-scrollbar'>
      <div className='w-full md:w-1/2 h-[200px] md:h-[400px] mb-4 md:mb-0 cursor-grab'>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <BingoCube />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <div className='w-full px-4 md:px-6 max-h-[600px] overflow-y-auto'>
        <h1 className='text-lg md:text-xl mb-4 text-yellow-500 font-bold'>
          <span className='text-gray-400'>Bingo</span>57
        </h1>
        {arrText.map((arr, index) => (
          <p
            key={index}
            className='mb-2 text-sm md:text-base max-w-[90%] text-justify'
          >
            {arr}
          </p>
        ))}
      </div>
    </div>
  )
}

export default MiniBingo
