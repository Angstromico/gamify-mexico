import { useState } from 'react'
import { useTranslation } from '@hooks/useTranslations'

interface LoginFormProps {
  title?: string
  usernameLabel?: string // Changed to username
  usernamePlaceholder?: string // Changed to username placeholder
  passwordLabel?: string
  rememberMeLabel?: string
  forgotPasswordText?: string
  forgotPasswordLink?: string
  submitButtonText?: string
  signUpText?: string
  signUpLink?: string
  register?: string
  API: string
}

const LoginForm: React.FC<LoginFormProps> = ({
  title = 'Iniciar sesión',
  usernameLabel = 'Nombre de usuario', // Updated label to "username"
  usernamePlaceholder = 'nombredeusuario', // Updated placeholder
  passwordLabel = 'Contraseña',
  rememberMeLabel = 'Recuérdame',
  forgotPasswordText = '¿Olvidaste tu contraseña?',
  forgotPasswordLink = '/forgot-password',
  submitButtonText = 'Iniciar sesión',
  signUpText = '¿No tienes cuenta? Regístrate',
  signUpLink = '/signup',
  register = 'Regístrate',
  API,
}) => {
  const [formData, setFormData] = useState({
    username: '', // Updated to track username
    password: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [counter, setCounter] = useState(5)
  const t = useTranslation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (!formData.username || !formData.password) {
      setError(
        t('Por favor complete todos los campos.', 'Please complete all fields.')
      )
      return
    }

    const data = {
      username: formData.username,
      password: formData.password,
    }

    try {
      // Send POST request using fetch
      const response = await fetch(`${API}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      // Provide success feedback
      if (response.ok) {
        const successData = await response.json()
        // Create an object to store all the data
        const loginData = {
          token: successData.token,
          username: successData.user.username,
          isLoggedIn: true,
        }

        // Store the object in localStorage as a JSON string
        localStorage.setItem('loginData', JSON.stringify(loginData))

        setSuccess(
          t(
            `${successData.message} serás redirigido en ${counter} segundos.`,
            `Successfully logged in, you will be redirected in ${counter} seconds.`
          )
        )
        //I want to see the counter been update here with the interval

        // Countdown and redirect after 5 seconds
        const interval = setInterval(() => {
          setCounter((prevCounter) => {
            if (prevCounter <= 1) {
              clearInterval(interval)
              // Back previous page
              window.history.back()
              setSuccess(
                t(
                  `${successData.message} serás redirigido en ${0} segundos.`,
                  `Successfully logged in, you will be redirected in ${0} seconds.`
                )
              )
              return 0
            }
            setSuccess(
              t(
                `${successData.message} serás redirigido en ${
                  prevCounter - 1
                } segundos.`,
                `Successfully logged in, you will be redirected in ${
                  prevCounter - 1
                } seconds.`
              )
            )
            return prevCounter - 1 // This will correctly update the counter
          })
        }, 1000)
      } else {
        // Handle the error message
        const errorData = await response.json()
        console.log('Error response:', errorData)
        if (errorData.username && errorData.username[0]) {
          setError(
            t(
              'Hubo un problema al llenar el formulario',
              'There was a problem submitting the form.'
            )
          )
        } else {
          setError(
            t(
              'Hubo un problema al llenar el formulario',
              'There was a problem submitting the form.'
            )
          )
        }
      }

      // Provide success feedback
      //setSuccess(t('Inicio de sesión exitoso!', 'Login successful!'))
      setFormData({
        username: '',
        password: '',
      }) // Reset form
    } catch (err) {
      setError(
        t(
          'Hubo un problema al intentar iniciar sesión.',
          'There was a problem submitting the form.'
        )
      ) // Error feedback
    }
  }

  return (
    <section className='flex items-center justify-center min-h-screen text-white'>
      <div className='w-full max-w-md rounded-lg shadow-md p-6'>
        <h1 className='text-2xl font-semibold text-center'>{title}</h1>

        {error && (
          <div className='bg-red-500 text-white p-2 rounded mb-4'>{error}</div>
        )}
        {success && (
          <div className='bg-green-500 text-white p-2 rounded mb-4'>
            {success}
          </div>
        )}

        <form className='mt-6 space-y-4' id='loginForm' onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label htmlFor='username' className='block text-sm font-medium'>
              {usernameLabel}
            </label>
            <input
              type='text'
              id='username'
              name='username'
              required
              value={formData.username}
              onChange={handleChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder={usernamePlaceholder}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor='password' className='block text-sm font-medium'>
              {passwordLabel}
            </label>
            <input
              type='password'
              id='password'
              name='password'
              required
              value={formData.password}
              onChange={handleChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='********'
            />
          </div>

          {/* Remember Me */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              />
              <label htmlFor='remember-me' className='ml-2 block text-sm'>
                {rememberMeLabel}
              </label>
            </div>

            <div className='text-sm'>
              <a
                href={forgotPasswordLink}
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                {forgotPasswordText}
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              {submitButtonText}
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <p className='mt-4 text-center text-sm text-white'>
          {signUpText}{' '}
          <a
            href={signUpLink}
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            {register}
          </a>
        </p>
      </div>
    </section>
  )
}

export default LoginForm
