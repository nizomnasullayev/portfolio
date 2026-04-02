import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiSend, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import emailjs from '@emailjs/browser'

// ─── EmailJS config ───────────────────────────────────────────────────────────
// Replace these with your actual values from emailjs.com
const EMAILJS_SERVICE_ID = 'service_5fnjvb6'
const EMAILJS_TEMPLATE_ID = 'template_tgivhd8'
const EMAILJS_PUBLIC_KEY = 'DBtvty1lx23kXBW_c'

const SOCIALS = [
    { icon: <FiGithub size={20} />, label: 'GitHub', href: 'https://github.com/nizomnasullayev' },
    { icon: <FiLinkedin size={20} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/nizomjon-nasullayev-1356693ba/' },
    { icon: <FiMail size={20} />, label: 'Email', href: 'mailto:nasullayevnizom7@gmail.com' },
]

export default function Contact() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.message) return
        setStatus('sending')
        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    title: 'Portfolio',
                    // keep common aliases to satisfy template fields like {{from_name}} / {{from_email}}
                    from_name: form.name,
                    from_email: form.email,
                    reply_to: form.email,
                },
                EMAILJS_PUBLIC_KEY,
            )
            setStatus('sent')
            setForm({ name: '', email: '', message: '' })
            setTimeout(() => setStatus('idle'), 4000)
        } catch {
            setStatus('error')
            setTimeout(() => setStatus('idle'), 4000)
        }
    }

    return (
        <section id="contact" className="section" style={{ background: 'var(--bg-1)' }}>
            <div
                className="container"
                ref={ref}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '80px',
                    alignItems: 'start',
                }}
            >
                {/* Left */}
                <motion.div
                    initial={{ opacity: 0, x: -32 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="section-label">Get in touch</p>
                    <h2 className="section-title" style={{ marginBottom: '20px' }}>
                        Let's <span>Work Together</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '40px', fontSize: '0.95rem' }}>
                        I'm currently open to new opportunities. Whether you have a project in mind,
                        want to collaborate, or just want to say hi — my inbox is always open.
                    </p>

                    {/* Socials */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {SOCIALS.map((s, i) => (
                            <motion.a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -16 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.08 }}
                                whileHover={{ x: 6 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '14px',
                                    color: 'var(--text-muted)',
                                    fontSize: '0.88rem',
                                    fontWeight: 500,
                                    transition: 'color var(--transition)',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-bright)')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                            >
                                <span
                                    style={{
                                        width: 42,
                                        height: 42,
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-sm)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'border-color var(--transition), background var(--transition)',
                                        background: 'var(--bg-card)',
                                        flexShrink: 0,
                                    }}
                                >
                                    {s.icon}
                                </span>
                                {s.label}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Right — form */}
                <motion.div
                    initial={{ opacity: 0, x: 32 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius)',
                        padding: '36px',
                        boxShadow: 'var(--shadow-card)',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        <div>
                            <label
                                htmlFor="name"
                                style={{ display: 'block', marginBottom: '7px', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="form-input"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                style={{ display: 'block', marginBottom: '7px', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="form-input"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                style={{ display: 'block', marginBottom: '7px', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project…"
                                rows={5}
                                className="form-input"
                            />
                        </div>

                        <motion.button
                            onClick={handleSubmit}
                            disabled={status === 'sending' || status === 'sent'}
                            className="btn hvr-sweep-to-right"
                            whileTap={{ scale: 0.97 }}
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                padding: '13px',
                                background: status === 'sent' ? 'var(--green-deep)' : 'transparent',
                                color: status === 'sent' ? 'var(--green-bright)' : 'var(--green-bright)',
                                border: '1px solid var(--green-bright)',
                                borderRadius: 'var(--radius-sm)',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                cursor: status === 'sending' ? 'wait' : 'pointer',
                                opacity: status === 'sending' ? 0.7 : 1,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            {status === 'sending' ? (
                                <>
                                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                                        ⟳
                                    </motion.span>
                                    Sending…
                                </>
                            ) : status === 'sent' ? (
                                '✓ Message sent!'
                            ) : status === 'error' ? (
                                '✗ Failed — try again'
                            ) : (
                                <>
                                    Send Message <FiSend size={15} />
                                </>
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            <style>{`
        @media (max-width: 760px) {
          #contact .container { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
        </section>
    )
}
