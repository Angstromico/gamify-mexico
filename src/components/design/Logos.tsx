import { companyLogos } from '@constants/index'

interface Props {
  classes: string
  title: string
}

const Logos = ({ classes, title }: Props) => {
  return (
    <div className={classes}>
      <h5 className='tagline mb-6 text-center text-n-1/50'>{title}</h5>
      <ul className='flex'>
        {companyLogos.map((logo, i) => {
          return (
            <li className='flex justify-center items-center flex-1' key={i}>
              <img src={logo.src} alt='Logo' />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default Logos
