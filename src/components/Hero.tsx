import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiArrowRight } from 'react-icons/fi'
import me from '../assets/me.jpg'

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
}
const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

const SOCIALS = [
    { icon: <FiGithub size={20} />, href: 'https://github.com/nizomnasullayev', label: 'GitHub' },
    { icon: <FiLinkedin size={20} />, href: 'https://www.linkedin.com/in/nizom-nasullayev-1356693ba/', label: 'LinkedIn' }
]

export default function Hero() {
    const scrollTo = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section
            id="hero"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: 'calc(var(--nav-height) + 40px)',
                paddingBottom: '80px',
            }}
        >
            {/* Background radial glow */}
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 65%)',
                    pointerEvents: 'none',
                }}
            />
            <div
                aria-hidden
                style={{
                    position: 'absolute',
                    bottom: '-10%',
                    left: '-5%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(74,222,128,0.05) 0%, transparent 65%)',
                    pointerEvents: 'none',
                }}
            />

            <div
                className="container"
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '60px',
                    alignItems: 'center',
                }}
            >
                {/* Left — text */}
                <motion.div variants={container} initial="hidden" animate="show">
                    <motion.p
                        variants={item}
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.85rem',
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: 'var(--green-bright)',
                            marginBottom: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Hey
                    </motion.p>

                    <motion.h1
                        variants={item}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: '-0.03em',
                            marginBottom: '12px',
                        }}
                    >
                        I'm{' '}
                        <span style={{ color: 'var(--green-bright)' }}>Nizom Nasullayev</span>
                    </motion.h1>

                    <motion.p
                        variants={item}
                        style={{
                            fontSize: '1.05rem',
                            fontWeight: 500,
                            color: 'var(--green-mid)',
                            marginBottom: '20px',
                            letterSpacing: '0.01em',
                        }}
                    >
                        Full-stack Developer
                    </motion.p>

                    <motion.p
                        variants={item}
                        style={{
                            maxWidth: '480px',
                            color: 'var(--text-muted)',
                            lineHeight: 1.75,
                            marginBottom: '36px',
                            fontSize: '0.95rem',
                        }}
                    >
                        I build clean, fast and scalable web applications. Passionate about great UI,
                        real-time data, and making complex things feel simple.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        variants={item}
                        style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}
                    >
                        <motion.button
                            className="btn hvr-sweep-to-right"
                            onClick={() => scrollTo('contact')}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                background: 'transparent',
                                color: 'var(--green-bright)',
                                border: '1px solid var(--green-bright)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '12px 28px',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            Let's talk <FiArrowRight size={15} />
                        </motion.button>

                        <motion.a
                            href="/resume.pdf"
                            download="Nizom_Nasullayev_Resume.pdf"
                            className="btn hvr-sweep-to-right"
                            whileTap={{ scale: 0.97 }}
                            style={{
                                background: 'transparent',
                                color: 'var(--text-secondary)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '12px 28px',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                textDecoration: 'none',
                            }}>

                            Download Resume ↓

                        </motion.a>
                    </motion.div>

                    {/* Social links */}
                    <motion.div variants={item} style={{ display: 'flex', gap: '12px' }}>
                        {SOCIALS.map((s) => (
                            <motion.a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                whileHover={{ y: -3, color: 'var(--green-bright)' }}
                                transition={{ type: 'spring', stiffness: 400 }}
                                style={{
                                    width: 42,
                                    height: 42,
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-sm)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-muted)',
                                    transition: 'border-color var(--transition)',
                                }}
                            >
                                {s.icon}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right — avatar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    style={{ display: 'flex', justifyContent: 'center' }}
                    className="hero-avatar-col"
                >
                    <div
                        className="glow-ring"
                        style={{ width: 260, height: 260 }}
                    >
                        <div
                            style={{
                                width: 260,
                                height: 260,
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '3px solid var(--bg-0)',
                                boxShadow: '0 0 48px rgba(74, 222, 128, 0.25)',
                            }}
                        >
                            {/* Replace src with your actual profile photo */}
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(135deg, var(--bg-2) 0%, var(--green-deep) 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '5rem',
                                }}
                            >
                                <img src={me} alt="me" />
                            </div>
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                position: 'absolute',
                                bottom: -8,
                                right: -12,
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '8px 14px',
                                fontSize: '0.78rem',
                                fontWeight: 600,
                                color: 'var(--green-bright)',
                                whiteSpace: 'nowrap',
                                boxShadow: 'var(--shadow-card)',
                            }}
                        >
                            ✦ Open to work
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <style>{`
        @media (max-width: 720px) {
          .hero-avatar-col { display: none; }
          #hero .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    )
}