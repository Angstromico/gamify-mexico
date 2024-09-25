import Section from './Section'
import { useTranslation } from '@hooks/useTranslations'
import { socials } from '@constants/index'

const Footer = () => {
  const t = useTranslation()

  return (
    <Section id='footer' crosses classes='!px-0 !py-10'>
      <footer className='container flex sm:justify-between justify-center items-center gap-10 flex-col md:flex-row'>
        <p className='caption text-n-4 lg:block'>
          {new Date().getFullYear()} &copy;{' '}
          {t('Todos los derechos reservados', 'All the rights reserve')}
        </p>
        <ul className='flex flex-wrap gap-5'>
          {socials.map((s, i) => (
            <a
              className='cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-n-7 transition-colors hover:bg-n-6'
              key={i}
              target='_blank'
            >
              <img src={s.iconUrl.src} alt={s.title} height={16} width={16} />
            </a>
          ))}
        </ul>
      </footer>
    </Section>
  )
}

export default Footer
