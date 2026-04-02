import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import logo_me from '../assets/logo_me.png'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer
            style={{
                borderTop: '1px solid var(--border)',
                padding: '32px 24px',
            }}
        >
            <div
                className="container"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    flexWrap: 'wrap',
                }}
            >
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        color: 'var(--green-bright)',
                    }}
                >
                    <img src={logo_me} alt="" style={{ width: 240, height: 240, objectFit: 'contain' }} />
                </motion.span>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                    }}
                >
                    © {year} · Built with{' '}
                    <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <FiHeart size={12} style={{ color: 'var(--green-bright)' }} />
                    </motion.span>{' '}
                    React + Firebase
                </motion.p>

                <motion.a
                    href="/admin"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-faint)',
                        transition: 'color var(--transition)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-faint)')}
                >
                    Admin ↗
                </motion.a>
            </div>
        </footer>
    )
}
