import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Box } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Section from './Section'
import { splitTextToLines } from 'src/utils'
import { currentLang } from '@store/*'

const getRandomColor = () => {
  return new THREE.Color(Math.random(), Math.random(), Math.random())
}

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

  const cubeSize = 3.5

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextColor((prev) => (prev === 'gold' ? 'silver' : 'gold'))
      setRotation([
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ])
      setFaceColors(
        (prevColors) => prevColors.map(() => getRandomColor()) // Change all face colors randomly
      )
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
            fontSize={0.4}
            color={textColor}
          >
            {word}
          </Text>
        )
      })}
    </Box>
  )
}

const BingoComponent = () => {
  const es = `  Ahora puedes jugar bingo sin la necesidad de apostar. Lo mejor de todo, es que no solo te diviertes como loco sino que tambien podrás obtener multiples recompensas en tiempo real.

   Como miembro de nuestra comunidad GamifyMéxico  te da acceso exclusivo a toda la diversion interactiva que ofrecemos.  Con  Bingo57 de GamifyMexico
 alcanzar el podio y capturar recompensas  es una realidad.

  ¡ Bienvenido al show interactivo de recompensas reales !`

  const en = `Now you can play bingo without the need to bet. Best of all, you will not only have a lot of fun but you will also be able to obtain multiple rewards in real time.

As a member of our GamifyMexico community, you get exclusive access to all the interactive fun we offer. With GamifyMexico's Bingo57
reaching the podium and capturing rewards is a reality.

Welcome to the interactive show of real rewards!`

  const esText = splitTextToLines(es)
  const enText = splitTextToLines(en)
  const arrText = currentLang.get() === 'es' ? esText : enText

  return (
    <Section
      id='bingo'
      classes='flex flex-col md:flex-row items-center justify-center min-h-screen bg-n-8 text-n-1'
    >
      <div className='w-full md:w-1/2 h-[300px] md:h-[500px] mb-8 md:mb-0 cursor-grab'>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <BingoCube />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <div className='w-full md:w-1/2 px-4 md:px-8'>
        <h1 className='h1 mb-8 text-yellow-500 font-bold'>
          <span className='text-gray-400'>Bingo</span>57
        </h1>
        {arrText.map((arr) => (
          <p key={arr} className='mb-4 h6 max-w-xl text-justify'>
            {arr}
          </p>
        ))}
      </div>
    </Section>
  )
}

export default BingoComponent
