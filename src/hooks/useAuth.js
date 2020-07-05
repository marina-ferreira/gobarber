import { useContext } from 'react'
import { AuthContext } from 'contexts/AuthContext'

const useAuth = () => {
  const context = useContext(AuthContext)
  const errorMessage = 'useAuth must be used within an AuthProvider'

  if (!context) throw new Error(errorMessage)

  return context
}

export default useAuth
