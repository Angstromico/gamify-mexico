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
    // If language is English and the current path is already in English
    if (lang === 'en' && currentLang === 'en') {
      return path // Return the same path, no change needed
    }

    // If switching to Spanish from English, remove '/en' from path
    if (lang === 'es' && currentLang === 'en') {
      const filterPath = path.replace('/en', '') // Remove '/en' prefix
      return filterPath || '/' // Fallback to '/' if path becomes empty
    }

    // If switching to English and the path doesn't already have '/en'
    if (lang === 'en' && currentLang === 'es') {
      return '/en' + path // Add '/en' to the existing path
    }

    // Default return for other cases
    return path
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
