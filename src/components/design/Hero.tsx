import { useEffect, useState } from 'react'
import { MouseParallax } from 'react-just-parallax'

import PlusSvg from '../../assets/svg/PlusSvg'

export const Gradient = () => {
  return (
    <>
      <div className='relative z-1 h-6 mx-2.5 bg-n-11 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8' />
      <div className='relative z-1 h-6 mx-6 bg-n-11/70 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20' />
    </>
  )
}

export const BottomLine = () => {
  return (
    <>
      <div className='hidden absolute top-[55.25rem] left-10 right-10 h-0.25 bg-n-6 pointer-events-none xl:block' />

      <PlusSvg className='hidden absolute top-[54.9375rem] left-[2.1875rem] z-2 pointer-events-none xl:block' />

      <PlusSvg className='hidden absolute top-[54.9375rem] right-[2.1875rem] z-2 pointer-events-none xl:block' />
    </>
  )
}

const Rings = () => {
  return (
    <>
      <div className='absolute top-1/2 left-1/2 w-[65.875rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2' />
      <div className='absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2' />
      <div className='absolute top-1/2 left-1/2 w-[36.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2' />
      <div className='absolute top-1/2 left-1/2 w-[23.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2' />
    </>
  )
}

export const BackgroundCircles = ({ parallaxRef }) => {
  const [mounted, setMounted] = useState(false)
  const [gradients, setGradients] = useState({
    ball1: { from: '#DD734F', to: '#1A1A32' },
    ball2: { from: '#DD734F', to: '#1A1A32' },
    ball3: { from: '#B9AEDF', to: '#1A1A32' },
    ball4: { from: '#B9AEDF', to: '#1A1A32' },
    ball5: { from: '#88E5BE', to: '#1A1A32' },
    ball6: { from: '#88E5BE', to: '#1A1A32' },
  })

  useEffect(() => {
    setMounted(true)

    const generateRandomColor = () => {
      const randomColor = () =>
        `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')}`
      return { from: randomColor(), to: randomColor() }
    }

    const updateGradient = (ballKey) => {
      setGradients((prev) => ({
        ...prev,
        [ballKey]: generateRandomColor(),
      }))
    }

    const startGradientRotation = () => {
      const ballKeys = ['ball1', 'ball2', 'ball3', 'ball4', 'ball5', 'ball6']
      ballKeys.forEach((ballKey) => {
        const randomInterval = Math.random() * (10000 - 1000) + 1000 // Random interval between 1s and 10s
        setInterval(() => updateGradient(ballKey), randomInterval)
      })
    }

    startGradientRotation()

    return () => clearInterval()
  }, [])

  return (
    <div className='absolute -top-[42.375rem] left-1/2 w-[78rem] aspect-square border border-n-2/5 rounded-full -translate-x-1/2 md:-top-[38.5rem] xl:-top-[32rem]'>
      <Rings />
      <MouseParallax strength={0.07} parallaxContainerRef={parallaxRef}>
        <div className='absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[46deg]'>
          <div
            className={`w-2 h-2 -ml-1 -mt-36 rounded-full transition-transform duration-500 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{
              background: `linear-gradient(to bottom, ${gradients.ball1.from}, ${gradients.ball1.to})`,
            }}
          />
        </div>

        <div className='absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[56deg]'>
          <div
            className={`w-4 h-4 -ml-1 -mt-32 rounded-full transition-transform duration-500 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{
              background: `linear-gradient(to bottom, ${gradients.ball2.from}, ${gradients.ball2.to})`,
            }}
          />
        </div>

        <div className='absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[54deg]'>
          <div
            className={`hidden w-4 h-4 -ml-1 mt-[12.9rem] rounded-full xl:block transition-transform duration-500 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{
              background: `linear-gradient(to bottom, ${gradients.ball3.from}, ${gradients.ball3.to})`,
            }}
          />
        </div>

        <div className='absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[65deg]'>
          <div
            className={`w-3 h-3 -ml-1.5 mt-52 rounded-full transition-transform duration-500 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{
              background: `linear-gradient(to bottom, ${gradients.ball4.from}, ${gradients.ball4.to})`,
            }}
          />
        </div>

        <div className='absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[85deg]'>
          <div
            className={`w-6 h-6 -ml-3 -mt-3 rounded-full transition-transform duration-500 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{
              background: `linear-gradient(to bottom, ${gradients.ball5.from}, ${gradients.ball5.to})`,
            }}
          />
        </div>

        <div className='absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[70deg]'>
          <div
            className={`w-6 h-6 -ml-3 -mt-3 rounded-full transition-transform duration-500 ease-out ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{
              background: `linear-gradient(to bottom, ${gradients.ball6.from}, ${gradients.ball6.to})`,
            }}
          />
        </div>
      </MouseParallax>
    </div>
  )
}
