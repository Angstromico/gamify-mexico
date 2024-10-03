import { useState, useEffect } from 'react'
import Section from './Section'
import ReactPlayer from 'react-player/youtube'
import { useTranslation } from '@hooks/useTranslations'
const Video = () => {
  const t = useTranslation()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <Section
      id='video'
      classes='w-full my-6 mx-auto flex justify-center items-center flex-col px-3 mx-2 overflow-hidden'
    >
      <h2 className='h2 text-center font-bold mb-8'>
        {t('Muro de Interes', 'Wall of Interest')}
      </h2>
      {isMounted && (
        <div className='w-full max-w-4xl mx-auto rounded-lg shadow-2xl overflow-hidden'>
          <div className='relative pb-[56.25%]'>
            <ReactPlayer
              url='https://youtu.be/l0ZNvhDdojQ?feature=shared'
              muted
              loop
              playing
              width='100%'
              height='100%'
              className='absolute top-0 left-0'
              style={{
                borderRadius: '0.5rem',
              }}
            />
          </div>
        </div>
      )}
    </Section>
  )
}
export default Video
