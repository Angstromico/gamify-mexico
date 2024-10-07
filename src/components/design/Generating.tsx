import { loading } from '@assets/index'

interface Props {
  classes?: string
  loadingText: string
}
const Generating = ({ classes, loadingText }: Props) => {
  return (
    <div
      className={`flex items-center h-14 px-6 bg-n-8/80 rounded-3xl ${
        classes ?? ''
      } text-base`}
    >
      <img
        className='w-5 h-5 mr-4 animate-spin'
        src={loading.src}
        alt={loadingText}
      />
      {loadingText}
    </div>
  )
}
export default Generating
