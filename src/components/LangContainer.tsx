import { changeLang } from '@store/*'
interface Props {
  languages: {
    en: 'en'
    es: 'es'
  }
  path: string
}

const LangContainer = ({ languages, path }: Props) => {
  const currentLang = path.includes('/en') ? 'en' : 'es'

  const getHref = (lang: string) => {
    if (
      (lang === 'en' && currentLang === 'en') ||
      (lang === 'es' && currentLang === 'es')
    ) {
      return path
    }
    if (lang === 'es' && currentLang === 'en') {
      const filterPath = path.replace('/en', '') // Remove '/en' prefix
      return filterPath
    }

    return 'en' + path
  }
  return (
    <>
      <ul className='language-selector z-[200] font-code'>
        {Object.entries(languages).map(([lang, label]) => (
          <li key={lang}>
            <a
              href={getHref(lang)}
              onClick={() => changeLang(label)}
              className={lang === currentLang ? 'active' : ''}
            >
              {label === 'en' ? 'English' : 'Español'}
            </a>
          </li>
        ))}
      </ul>
      <div className='language-selector-mobile'>
        <ul>
          {Object.entries(languages).map(([lang, label]) => (
            <li key={lang}>
              <a
                href={getHref(lang)}
                onClick={() => changeLang(label)}
                className={lang === currentLang ? 'active' : ''}
              >
                {label === 'en' ? 'English' : 'Español'}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default LangContainer
