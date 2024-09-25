import SectionSvg from '@assets/svg/SectionSvg'
import style from './style.module.css'
import type { ReactNode } from 'react'

interface Props {
  classes?: string
  id: string
  crosses?: boolean
  crossesOffset?: string
  customPaddings?: boolean
  children: ReactNode | string
}

const Section = ({
  classes,
  id,
  crosses,
  crossesOffset,
  customPaddings,
  children,
}: Props) => {
  const mainClasses = `relative ${
    customPaddings ||
    `py-10 lg:py-16 xl:py-20 ${crosses ? 'lg:py-32 xl:py-40' : ''}`
  } 
      ${classes || ''}`

  return (
    <section id={id} className={mainClasses}>
      {children}
      <div className={style.firstHiddenDiv} />
      <div className={style.secondHiddenDiv} />
      {crosses && (
        <>
          <div
            className={`hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-stroke-1 ${
              crossesOffset && crossesOffset
            } pointer-events-none lg:block xl:left-10 right-10`}
          />
          <SectionSvg crossesOffset={crossesOffset} />
        </>
      )}
    </section>
  )
}
export default Section
