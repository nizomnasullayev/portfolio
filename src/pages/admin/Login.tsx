import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi'

export default function Login() {
    const { login, user, authLoading } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!authLoading && user) navigate('/admin', { replace: true })
    }, [user, authLoading, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(email, password)
            navigate('/admin', { replace: true })
        } catch {
            setError('Invalid email or password.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-0)',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Glow background */}
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    top: '30%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 65%)',
                    pointerEvents: 'none',
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                style={{
                    width: '100%',
                    maxWidth: 420,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: '44px 40px',
                    boxShadow: 'var(--shadow-card)',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Icon */}
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: '50%',
                            background: 'var(--green-glow-sm)',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px',
                            color: 'var(--green-bright)',
                        }}
                    >
                        <FiLock size={22} />
                    </motion.div>
                    <h1
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginBottom: '6px',
                        }}
                    >
                        Admin Login
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Sign in to manage your portfolio
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Email */}
                    <div style={{ position: 'relative' }}>
                        <label
                            style={{ display: 'block', marginBottom: '7px', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}
                        >
                            Email
                        </label>
                        <div style={{ position: 'relative' }}>
                            <FiMail
                                size={15}
                                style={{
                                    position: 'absolute',
                                    left: 13,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-muted)',
                                    pointerEvents: 'none',
                                }}
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="admin@example.com"
                                className="form-input"
                                style={{ paddingLeft: 38 }}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            style={{ display: 'block', marginBottom: '7px', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}
                        >
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <FiLock
                                size={15}
                                style={{
                                    position: 'absolute',
                                    left: 13,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-muted)',
                                    pointerEvents: 'none',
                                }}
                            />
                            <input
                                type={showPw ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="form-input"
                                style={{ paddingLeft: 38, paddingRight: 42 }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw((v) => !v)}
                                style={{
                                    position: 'absolute',
                                    right: 13,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                color: '#f87171',
                                fontSize: '0.82rem',
                                background: 'rgba(248,113,113,0.08)',
                                border: '1px solid rgba(248,113,113,0.2)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '8px 12px',
                            }}
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button
                        type="submit"
                        disabled={loading}
                        className="btn hvr-sweep-to-right"
                        whileTap={{ scale: 0.97 }}
                        style={{
                            marginTop: '4px',
                            width: '100%',
                            justifyContent: 'center',
                            padding: '13px',
                            background: 'transparent',
                            color: 'var(--green-bright)',
                            border: '1px solid var(--green-bright)',
                            borderRadius: 'var(--radius-sm)',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: loading ? 'wait' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        {loading ? (
                            <>
                                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                                    ⟳
                                </motion.span>
                                Signing in…
                            </>
                        ) : (
                            'Sign in'
                        )}
                    </motion.button>
                </form>

                <p
                    style={{
                        textAlign: 'center',
                        marginTop: '24px',
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                    }}
                >
                    <a href="/" style={{ color: 'var(--text-muted)', transition: 'color var(--transition)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-bright)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                        ← Back to portfolio
                    </a>
                </p>
            </motion.div>
        </div>
    )
}