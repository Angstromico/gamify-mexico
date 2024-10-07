import { useState, useEffect } from 'react'

interface Props {
  classes?: string
  title: string
  numberIs: string
}
const Notification = ({ classes, title, numberIs }: Props) => {
  const [currentNumber, setCurrentNumber] = useState<string>('00')

  useEffect(() => {
    const generateRandomNumber = () => {
      const randomNum = Math.floor(Math.random() * 100)
      // Ensure two-digit format
      const formattedNumber =
        randomNum < 10 ? `0${randomNum}` : randomNum.toString()
      setCurrentNumber(formattedNumber)
    }

    // Set random interval between 2 and 5 seconds
    const randomInterval = () => Math.random() * (5000 - 2000) + 2000

    const intervalId = setInterval(() => {
      generateRandomNumber()
    }, randomInterval())

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div
      className={`${
        classes ?? ''
      } flex items-center p-4 pr-6  bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl gap-5 text-center`}
    >
      <div className='flex-1'>
        <h6 className='mb-1 font-semibold text-base'>{title}</h6>
        <div className='flex items-center justify-between'>
          <h4 className='text-xl text-center text-yellow-500 font-black ml-10'>
            {`${numberIs} ${currentNumber}`}
          </h4>
        </div>
      </div>
    </div>
  )
}
export default Notification
