import PlusSvg from './PlusSvg'

interface Props {
  crossesOffset?: string
}

const SectionSvg = ({ crossesOffset }: Props) => {
  return (
    <>
      <PlusSvg
        classes={`hidden absolute -top-[0.3125rem] left-[1.5625rem] ${
          crossesOffset && crossesOffset
        } pointer-events-none lg:block xl:left-[2.1875rem]`}
      />

      <PlusSvg
        classes={`hidden absolute  -top-[0.3125rem] right-[1.5625rem] ${
          crossesOffset && crossesOffset
        } pointer-events-none lg:block xl:right-[2.1875rem]`}
      />
    </>
  )
}
export default SectionSvg
