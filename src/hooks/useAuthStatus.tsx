import { useState, useEffect } from 'react'

// Define the shape of the data in localStorage
interface StreamerData {
  id: number
  name: string
  urlStreaming: string
  plataforma: string
  image: string
  descripcion: string
  facebook: string | null
  twitter: string | null
  instagram: string | null
  youtube: string | null
  tiktok: string | null
  video: string | null
  on_live: boolean
}

export interface LoginData {
  token: string
  username: string
  isLoggedIn: boolean
  admin: boolean
  streamer: StreamerData | null
}

// Hook to check admin and streamer status
const useAuthStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isStreamer, setIsStreamer] = useState(false)

  useEffect(() => {
    // Retrieve and parse the loginData from localStorage
    const storedData = localStorage.getItem('loginData')
    if (storedData) {
      const loginData: LoginData = JSON.parse(storedData)

      // Update the states based on loginData properties
      setIsAdmin(loginData.admin || false)
      setIsStreamer(!!loginData.streamer) // true if streamer object exists
    }
  }, [])

  return { isAdmin, isStreamer }
}

export default useAuthStatus
