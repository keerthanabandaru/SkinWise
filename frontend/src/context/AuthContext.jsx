import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authAPI } from '../services/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('skinwise_token')
    if (token) {
      authAPI.me()
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem('skinwise_token'))
        .finally(() => setLoading(false))
      // setLoading(false) is called asynchronously inside .finally — not synchronous
    } else {
      // Use a microtask so the setState is deferred, not synchronous in the effect body
      Promise.resolve().then(() => setLoading(false))
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const res = await authAPI.login({ email, password })
    localStorage.setItem('skinwise_token', res.data.access_token)
    const me = await authAPI.me()
    setUser(me.data)
    return me.data
  }, [])

  const register = useCallback(async (data) => {
    const res = await authAPI.register(data)
    localStorage.setItem('skinwise_token', res.data.access_token)
    const me = await authAPI.me()
    setUser(me.data)
    return me.data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('skinwise_token')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
