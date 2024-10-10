import { useRef } from 'react'
import Section from './Section'
import { curve, pingball, space } from '../assets'
import Button from './Button'
import { BackgroundCircles, BottomLine, Gradient } from './design/Hero'
import { heroIcons } from '@constants/index'
import { ScrollParallax } from 'react-just-parallax'
import Generating from './design/Generating'
import Notification from './design/Notification'
import Logos from './design/Logos'
import type { Lang } from '@interfaces/index'

interface Props {
  title?: string
  subtitle?: string
  startBtn?: string
  btnLink?: string
  number?: string
  loadingtext?: string
  numberIs?: string
  fortuneText?: string
  lang?: Lang
}

const Hero = ({
  title = 'Explora las posibilidades',
  subtitle = 'Disfruta el juego',
  startBtn = 'Comenzar',
  btnLink = '/dashboard',
  number = 'Numero actual',
  loadingtext = 'Cargando',
  numberIs = 'El numero es: ',
  fortuneText = 'La Fortuna Favorece a los Valientes',
  lang = 'es',
}: Props) => {
  const parallaxRef = useRef(null)

  return (
    <Section
      classes='pt-[12rem] -mt-[5.25rem] overflow-hidden'
      id='mainHero'
      crosses
      crossesOffset='lg:translate-y-[5.25rem]'
      customPaddings
    >
      <div className='container relative w-full' ref={parallaxRef}>
        <div className='w-full max-w-6xl relative z-1 text-center mb-16 md:mb-20 lg:mb-24'>
          <h1 className='h1 mb-6 3xl:ml-32'>
            {title}
            <span className='inline-block relative'>
              Gamify Mexico
              <img
                src={curve.src}
                className='absolute top-full left-0 w-full xl:-mt-2'
                width={624}
                height={28}
                alt='Curve'
              />
            </span>
          </h1>
          <p className='body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8'>
            {subtitle}
          </p>
          <Button link={btnLink}>{startBtn}</Button>
        </div>
        <div className='max-w-96 mx-auto relative md:max-w-5xl xl:mb-24'>
          <div className='relative z-1 p-0.5 rounded-2xl bg-conic-gradient'>
            <div className='relative bg-n-8 rounded-2xl'>
              <div className='h-6 bg-n-10 rounded-t-xl' />
              <div className='aspect-[33/40] rounded-b-2xl overflow-hidden md:aspect-[688/490] lg:[1024/490]'>
                <img
                  className='w-full scale-[1.1] md:-translate-y-[10%] lg:-translate-y-[23%]'
                  src={pingball.src}
                  alt='Pingball'
                  height={1024}
                  width={490}
                />
                <Generating
                  loadingText={loadingtext}
                  classes='absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2 z-10'
                  lang={lang}
                />
                {/* I still can;t click the input and write, this is the place I use the component */}
                <ScrollParallax isAbsolutelyPositioned>
                  <ul className='hidden absolute -left-24 bottom-28 p-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex'>
                    {heroIcons.map((icon, i) => {
                      return (
                        <li className='p-5' key={i}>
                          <img
                            src={icon.src}
                            alt='Icon'
                            width={24}
                            height={25}
                          />
                        </li>
                      )
                    })}
                  </ul>
                </ScrollParallax>
                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    classes='hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] lg:flex'
                    title={number}
                    numberIs={numberIs}
                  />
                </ScrollParallax>
              </div>
            </div>
            <Gradient />
          </div>
          <div className='absolute w-full -top-[54%] left-1/2 -translate-x-1/2 md:-top-[46%] md:w-[136%] lg:-top-[104%] 3xl:ml-8'>
            <div
              className='w-full h-auto bg-center bg-no-repeat bg-cover rounded-b-2xl'
              style={{
                backgroundImage: `
                      radial-gradient(circle, transparent 30%, rgb(14, 12, 21) 80%),
                      url(${space.src})
                    `,
                aspectRatio: '16 / 9',
              }}
            />
          </div>
          <BackgroundCircles parallaxRef={parallaxRef} />
        </div>
        <Logos
          title={fortuneText}
          classes='hidden relative z-10 mt-20 lg:block'
        />
      </div>
      <BottomLine />
    </Section>
  )
}

export default Hero
