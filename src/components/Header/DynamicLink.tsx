import { useEffect, useState } from 'react'
import { currentLang } from '@store/*'

interface Props {
  href: string
  text: string
  texto: string
}

const DynamicLink = ({ href, text, texto }: Props) => {
  const [url, setUrl] = useState(href)
  const [txt, setTxt] = useState(texto)

  useEffect(() => {
    if (currentLang.get() === 'es') {
      setUrl(href)
      setTxt(texto)
    } else {
      setUrl(`/en${href}`)
      setTxt(text)
    }
  }, [href, text, texto])

  return (
    <a
      className='text-n-1/50 transition-colors hover:text-n-1 lg:block'
      href={url}
    >
      {txt}
    </a>
  )
}

export default DynamicLink
