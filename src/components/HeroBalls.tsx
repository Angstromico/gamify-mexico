import { useState } from 'react'
import { dynamicTranslate } from 'src/utils'
import { FaQuestionCircle, FaCalendarAlt, FaGift } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import type { Lang } from '@interfaces/index'

const Modal = ({
  isOpen,
  content,
  onClose,
  closeTxt,
}: {
  isOpen: boolean
  content: React.ReactNode
  onClose: () => void
  closeTxt: string
}) => {
  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div
        className='bg-white p-6 rounded-lg max-w-sm w-full text-center text-black'
        onClick={(e) => e.stopPropagation()}
      >
        {content}
        <button
          onClick={onClose}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
        >
          {closeTxt}
        </button>
      </div>
    </div>
  )
}

const MenuButton = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactElement
  label: string
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className='flex flex-col items-center justify-center w-[180px] h-[180px] m-3 text-white bg-blue-500 rounded-full hover:bg-blue-700'
  >
    {icon}
    <span className='mt-1 text-xs'>{label}</span>
  </button>
)

const HeroBalls = ({ lang = 'es' }: { lang?: Lang }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode>(null)

  const openModal = (content: React.ReactNode) => {
    setModalContent(content)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
    setModalContent(null)
  }

  return (
    <div className='pt-[12rem] -mt-[5.25rem] overflow-hidden'>
      <div className='mb-16 md:mb-20 lg:mb-24 flex justify-center'>
        {/* Swiper for responsive carousel */}
        <Swiper
          slidesPerView={'auto'}
          navigation={true}
          loop
          modules={[Navigation]}
          breakpoints={{
            1024: {
              slidesPerView: 3, // Show 3 slides on large screens
            },
          }}
          className='w-full max-w-4xl' // Set a max width for the Swiper
        >
          <SwiperSlide className='flex justify-center w-full lg:w-1/3 mx-auto'>
            <div></div>
            <MenuButton
              icon={<FaQuestionCircle size={24} />}
              label={dynamicTranslate(lang, 'Trivias', 'Trivia')}
              onClick={() =>
                openModal(
                  <div>
                    {dynamicTranslate(
                      lang,
                      'Contenido de Trivias',
                      'Trivia Content'
                    )}
                  </div>
                )
              }
            />
          </SwiperSlide>
          <SwiperSlide className='flex justify-center w-full lg:w-1/3 mx-auto'>
            <MenuButton
              icon={<FaCalendarAlt size={24} />}
              label={dynamicTranslate(lang, 'Bingo', 'Bingo')}
              onClick={() =>
                openModal(
                  <div>
                    {dynamicTranslate(
                      lang,
                      'Contenido de Bingo',
                      'Bingo Content'
                    )}
                  </div>
                )
              }
            />
          </SwiperSlide>
          <SwiperSlide className='flex justify-center w-full lg:w-1/3 mx-auto'>
            <MenuButton
              icon={<FaGift size={24} />}
              label={dynamicTranslate(lang, 'Recompensas', 'Rewards')}
              onClick={() =>
                openModal(
                  <div>
                    {dynamicTranslate(
                      lang,
                      'Contenido de Recompensas',
                      'Rewards Content'
                    )}
                  </div>
                )
              }
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <Modal
        isOpen={modalIsOpen}
        content={modalContent}
        onClose={closeModal}
        closeTxt={dynamicTranslate(lang, 'Cerrar', 'Close')}
      />
    </div>
  )
}

export default HeroBalls
