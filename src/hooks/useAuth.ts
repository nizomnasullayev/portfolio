import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../lib/firebase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthLoading(false)
    })
    return () => unsub()
  }, [])

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password)

  const logout = () => signOut(auth)

  return { user, authLoading, login, logout }
}