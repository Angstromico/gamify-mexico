import { useEffect, useRef } from 'react'
import logo from '@assets/logo3.png'

// Props interface for the LogoContainer component
interface LogoContainerProps {
  className?: string
}

// LogoContainer component
const LogoContainer: React.FC<LogoContainerProps> = ({ className }) => {
  const logoContainerRef = useRef<HTMLDivElement | null>(null)

  // Apply initial state based on screen size
  const setInitialLogoState = () => {
    if (logoContainerRef.current) {
      if (window.innerWidth <= 768) {
        logoContainerRef.current.style.transform = 'translateY(100%)'
      } else {
        logoContainerRef.current.style.transform = 'translateX(100%)'
      }
      logoContainerRef.current.style.opacity = '0'
    }
  }

  // Set up Intersection Observer for logo animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-logo')
          entry.target.classList.remove('hide-logo')
        } else {
          entry.target.classList.add('hide-logo')
          entry.target.classList.remove('show-logo')
        }
      })
    }, observerOptions)

    // Start observing the logo container
    if (logoContainerRef.current) {
      observer.observe(logoContainerRef.current)
    }

    // Cleanup observer on component unmount
    return () => {
      if (logoContainerRef.current) {
        observer.unobserve(logoContainerRef.current)
      }
    }
  }, [])

  // Set initial state on load and resize
  useEffect(() => {
    const handleLoad = () => {
      setInitialLogoState()
    }

    const handleResize = () => {
      setInitialLogoState()
    }

    window.addEventListener('load', handleLoad)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('load', handleLoad)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      ref={logoContainerRef}
      className={`logo-container w-full md:w-[35%] md:right-0 transform opacity-0 transition-all duration-500 ease-out mb-16 md:mb-0 ${className}`}
    >
      <div className='relative w-full max-w-[320px] mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-br from-color-1 to-color-2 opacity-75 blur-lg'></div>
        <img
          src={logo.src}
          alt='Logo'
          className='w-full h-auto relative z-10 shadow-lg rounded-md'
          id='logoImage'
        />
      </div>
    </div>
  )
}

export default LogoContainer
