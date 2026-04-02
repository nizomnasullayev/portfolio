import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../App'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import logo_me from '../assets/logo_me.png'

const NAV_LINKS = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const { theme, toggle } = useTheme()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState('hero')

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20)

            // update active section highlight
            const sections = ['hero', 'about', 'skills', 'projects', 'contact']
            for (const s of [...sections].reverse()) {
                const el = document.getElementById(s)
                if (el && window.scrollY + 100 >= el.offsetTop) {
                    setActive(s)
                    break
                }
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const handleLink = (href: string) => {
        setOpen(false)
        const id = href.replace('#', '')
        const el = document.getElementById(id)
        if (!el) return
        const nav = document.querySelector('.navbar') as HTMLElement | null
        const navHeight = nav?.offsetHeight ?? 70
        const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight + 1
        if (window.history && window.history.pushState) {
            window.history.pushState(null, '', href)
        } else {
            window.location.hash = href
        }
        window.requestAnimationFrame(() => {
            window.scrollTo({ top, behavior: 'smooth' })
        })
    }

    return (
        <motion.header
            className="navbar"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                height: 'var(--nav-height)',
                backdropFilter: scrolled ? 'blur(16px)' : 'none',
                backgroundColor: scrolled
                    ? theme === 'dark'
                        ? 'rgba(6, 13, 6, 0.85)'
                        : 'rgba(240, 253, 244, 0.85)'
                    : 'transparent',
                borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
                transition: 'background-color 0.3s, border-color 0.3s',
            }}
        >
            <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo */}
                <motion.a
                    href="#hero"
                    onClick={(e) => { e.preventDefault(); handleLink('#hero') }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        color: 'var(--green-bright)',
                        letterSpacing: '-0.02em',
                        overflow: 'hidden',
                    }}
                    transition={{ type: 'spring', stiffness: 400 }}
                >
                    <img src={logo_me} alt="" style={{ width: 250, height: 250, objectFit: 'contain' }} />
                </motion.a>

                {/* Desktop Nav */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
                    {NAV_LINKS.map((l) => {
                        const id = l.href.replace('#', '')
                        const isActive = active === id
                        return (
                            <motion.a
                                key={l.href}
                                href={l.href}
                                onClick={(e) => { e.preventDefault(); handleLink(l.href) }}
                                style={{
                                    position: 'relative',
                                    padding: '6px 14px',
                                    borderRadius: 'var(--radius-pill)',
                                    fontSize: '0.88rem',
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? 'var(--green-bright)' : 'var(--text-muted)',
                                    transition: 'color var(--transition)',
                                }}
                                whileHover={{ color: 'var(--text-primary)' }}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            borderRadius: 'var(--radius-pill)',
                                            background: 'var(--green-glow-sm)',
                                            border: '1px solid var(--border)',
                                        }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                    />
                                )}
                                <span style={{ position: 'relative', zIndex: 1 }}>{l.label}</span>
                            </motion.a>
                        )
                    })}
                </nav>

                {/* Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <motion.button
                        onClick={toggle}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            width: 38,
                            height: 38,
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-sm)',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'border-color var(--transition), color var(--transition)',
                        }}
                        aria-label="Toggle theme"
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={theme}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>

                    {/* Hamburger — mobile */}
                    <motion.button
                        className="mobile-menu-btn"
                        onClick={() => setOpen((o) => !o)}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            display: 'none',
                            width: 38,
                            height: 38,
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-sm)',
                            background: 'transparent',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        aria-label="Menu"
                    >
                        {open ? <FiX size={18} /> : <FiMenu size={18} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            position: 'fixed',
                            top: 'var(--nav-height)',
                            left: 0,
                            right: 0,
                            zIndex: 99,
                            overflow: 'hidden',
                            background: 'var(--bg-1)',
                            borderBottom: '1px solid var(--border)',
                            maxHeight: 'calc(100vh - var(--nav-height))',
                            overflowY: 'auto',
                        }}
                    >
                        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {NAV_LINKS.map((l, i) => (
                                <motion.a
                                    key={l.href}
                                    href={l.href}
                                    initial={{ x: -16, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.06 }}
                                    onClick={(e) => { e.preventDefault(); handleLink(l.href) }}
                                    style={{
                                        padding: '10px 16px',
                                        borderRadius: 'var(--radius-sm)',
                                        color: active === l.href.replace('#', '') ? 'var(--green-bright)' : 'var(--text-secondary)',
                                        fontWeight: 500,
                                        background: active === l.href.replace('#', '') ? 'var(--green-glow-sm)' : 'transparent',
                                    }}
                                >
                                    {l.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 680px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </motion.header>
    )
}
