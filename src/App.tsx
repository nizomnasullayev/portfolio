import { createContext, useContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

// Pages
import Login from './pages/admin/Login'
import AdminPanel from './pages/admin/AdminPanel'
import Portfolio from './pages/Portfolio'

// ─── Theme Context ────────────────────────────────────────────────────────────
interface ThemeCtx {
  theme: 'dark' | 'light'
  toggle: () => void
}
export const ThemeContext = createContext<ThemeCtx>({
  theme: 'dark',
  toggle: () => { },
})
export const useTheme = () => useContext(ThemeContext)

// ─── Protected Route ──────────────────────────────────────────────────────────
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, authLoading } = useAuth()
  if (authLoading) return null
  return user ? <>{children}</> : <Navigate to="/admin/login" replace />
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('portfolio-theme')
    return (saved as 'dark' | 'light') ?? 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}