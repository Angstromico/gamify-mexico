import { useState } from 'react'
import { useTranslation } from '@hooks/useTranslations'

interface RegistrationFormProps {
  title?: string
  nameLabel?: string
  emailLabel?: string
  passwordLabel?: string
  confirmPasswordLabel?: string
  submitButtonText?: string
  loginText?: string
  loginLink?: string
  namePlaceholder?: string
  emailPlaceholder?: string
  passwordPlaceholder?: string
  confirmPasswordPlaceholder?: string
  phoneLabel?: string // New prop for phone label
  phonePlaceholder?: string // New prop for phone placeholder
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  title = 'Register',
  nameLabel = 'Name',
  emailLabel = 'Email',
  passwordLabel = 'Password',
  confirmPasswordLabel = 'Confirm Password',
  submitButtonText = 'Register',
  loginText = 'Already have an account? Login',
  loginLink = '/login',
  namePlaceholder = 'Your name',
  emailPlaceholder = 'you@example.com',
  passwordPlaceholder = '********',
  confirmPasswordPlaceholder = '********',
  phoneLabel = 'Phone Number', // Default value for phone label
  phonePlaceholder = 'Your phone number', // Default value for phone placeholder
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '', // New field for phone
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.phone
    ) {
      setError(
        t('Por favor agregue todos los campos.', 'Please complete all fields.')
      )
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t('Las claves no coinciden.', 'Passwords do not match.'))
      return
    }

    try {
      // Prepare data to be sent
      const data = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value)
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Provide success feedback
      setSuccess(t('Registro Correcto!', 'Registration successful!'))
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      }) // Reset form
    } catch (err) {
      setError(
        t(
          'Hubo un problema al llenar el formulario',
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

        <form
          id='registrationForm'
          className='mt-6 space-y-4'
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div>
            <label htmlFor='name' className='block text-sm font-medium'>
              {nameLabel}
            </label>
            <input
              type='text'
              id='name'
              name='name'
              required
              value={formData.name}
              onChange={handleChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder={namePlaceholder}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium'>
              {emailLabel}
            </label>
            <input
              type='email'
              id='email'
              name='email'
              required
              value={formData.email}
              onChange={handleChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder={emailPlaceholder}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor='phone' className='block text-sm font-medium'>
              {phoneLabel}
            </label>
            <input
              type='tel'
              id='phone'
              name='phone'
              required
              value={formData.phone}
              onChange={handleChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder={phonePlaceholder}
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
              placeholder={passwordPlaceholder}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor='confirm-password'
              className='block text-sm font-medium'
            >
              {confirmPasswordLabel}
            </label>
            <input
              type='password'
              id='confirm-password'
              name='confirmPassword'
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder={confirmPasswordPlaceholder}
            />
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

        {/* Login Link */}
        <p className='mt-4 text-center text-sm text-white'>
          {loginText}{' '}
          <a
            href={loginLink}
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            Login
          </a>
        </p>
      </div>
    </section>
  )
}

export default RegistrationForm
