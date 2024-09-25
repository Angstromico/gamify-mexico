import { loading } from '@assets/index'
import { useTranslation } from '@hooks/useTranslations'

interface Props {
  classes?: string
}
const Generating = ({ classes }: Props) => {
  const t = useTranslation()

  return (
    <div
      className={`flex items-center h-14 px-6 bg-n-8/80 rounded-3xl ${
        classes ?? ''
      } text-base`}
    >
      <img
        className='w-5 h-5 mr-4 animate-spin'
        src={loading.src}
        alt={t('Cargando', 'Loading')}
      />
      {t('Manda comentarios...', 'Send comments')}
    </div>
  )
}
export default Generating
