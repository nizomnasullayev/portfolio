import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiArrowRight, FiCode, FiLayers, FiZap } from 'react-icons/fi'
import me2 from '../assets/me2.jpg'

const CARDS = [
    { icon: <FiCode size={18} />, label: 'Clean Code', desc: 'Readable, maintainable and well-structured.' },
    { icon: <FiLayers size={18} />, label: 'Full-Stack', desc: 'From database to pixel-perfect UI.' },
    { icon: <FiZap size={18} />, label: 'Fast & Real-time', desc: 'Optimized performance with live updates.' },
]

export default function About() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="about" className="section" ref={ref}>
            <div
                className="container"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '80px',
                    alignItems: 'center',
                }}
            >
                {/* Avatar */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    className="about-avatar-col"
                >
                    <div
                        className="glow-ring"
                        style={{ width: 220, height: 220, margin: '0 auto' }}
                    >
                        <div
                            style={{
                                width: 220,
                                height: 220,
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '3px solid var(--bg-0)',
                                boxShadow: '0 0 40px rgba(74, 222, 128, 0.2)',
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(135deg, var(--bg-2) 0%, var(--green-deep) 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '4rem',
                                }}
                            >
                                <img src={me2} alt="" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                    <p className="section-label">About Me</p>
                    <h2 className="section-title" style={{ marginBottom: '8px' }}>
                        Full-stack <span>Developer</span>
                    </h2>
                    <p
                        style={{
                            color: 'var(--text-muted)',
                            lineHeight: 1.8,
                            marginBottom: '32px',
                            fontSize: '0.95rem',
                            maxWidth: '520px',
                        }}
                    >
                        I'm a passionate developer who loves turning ideas into real, polished products.
                        I work across the whole stack — designing systems, building APIs, and crafting
                        UIs that feel great to use. When I'm not coding I'm probably exploring new
                        technologies or catching up on sleep.
                    </p>

                    {/* Mini cards */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                            gap: '12px',
                            marginBottom: '32px',
                        }}
                    >
                        {CARDS.map((c, i) => (
                            <motion.div
                                key={c.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.25 + i * 0.1 }}
                                whileHover={{ y: -4, borderColor: 'var(--border-hover)' }}
                                style={{
                                    padding: '16px',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius)',
                                    transition: 'border-color var(--transition)',
                                }}
                            >
                                <div style={{ color: 'var(--green-bright)', marginBottom: '8px' }}>{c.icon}</div>
                                <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>{c.label}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.5 }}>{c.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.a
                        href="/cv.pdf"
                        download
                        className="btn hvr-sweep-to-right"
                        whileTap={{ scale: 0.97 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 28px',
                            background: 'var(--green-mid)',
                            color: 'var(--bg-0)',
                            border: '1px solid var(--green-mid)',
                            borderRadius: 'var(--radius-sm)',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                        }}
                    >
                        Hire Me <FiArrowRight size={15} />
                    </motion.a>
                </motion.div>
            </div>

            <style>{`
        @media (max-width: 720px) {
          .about-avatar-col { display: none; }
          #about .container { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
        </section>
    )
}