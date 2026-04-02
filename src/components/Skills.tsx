import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Skill } from '../types'

const SKILLS: Skill[] = [
  { name: 'HTML / CSS',    level: 95 },
  { name: 'TypeScript',    level: 88 },
  { name: 'React',         level: 90 },
  { name: 'Node.js',       level: 82 },
  { name: 'Python',        level: 75 },
  { name: 'Firebase',      level: 85 },
  { name: 'SQL / PostgreSQL',   level: 78 },
  { name: 'Figma / UI',    level: 70 },
  { name: 'JavaScript',    level: 85 },
  { name: 'FastAPI',    level: 80 },
]

const TECH = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 
  'Firebase', 'Python', 'PostgreSQL', 'Git',
  'Tailwind', 'Framer Motion', 'REST APIs', 
  'Redux', 'Vite', 'JWT', 'JavaScript', 'HTML', 'CSS', 'FastAPI'
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section" style={{ background: 'var(--bg-1)' }}>
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p className="section-label">What I know</p>
          <h2 className="section-title">My <span>Skills</span></h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px 80px',
          }}
          className="skills-grid"
        >
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  fontSize: '0.88rem',
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}>
                  {s.name}
                </span>
                <span style={{ color: 'var(--green-bright)', fontWeight: 700 }}>{s.level}%</span>
              </div>
              <div className="progress-track">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${s.level}%` } : { width: 0 }}
                  transition={{ duration: 1.1, delay: 0.2 + i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Infinite marquee — outside container so it goes full width ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.7 }}
        style={{ marginTop: '72px' }}
      >
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: '20px',
          textAlign: 'center',
        }}>
          Also working with
        </p>

        {/* Outer mask — fades edges */}
        <div style={{
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}>
          {/* Track — contains two identical sets so the loop is seamless */}
          <div className="marquee-track">
            {[...TECH, ...TECH].map((t, i) => (
              <span key={i} className="tag marquee-tag">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 680px) {
          .skills-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }

        /* Marquee */
        .marquee-track {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: marquee 28s linear infinite;
          padding: 4px 0;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-tag {
          flex-shrink: 0;
          font-size: 0.82rem;
          padding: 6px 16px;
          cursor: default;
          transition: border-color 0.2s, background 0.2s;
        }
        .marquee-tag:hover {
          border-color: var(--border-hover);
          background: var(--green-glow);
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}