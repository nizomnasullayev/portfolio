import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useProjects } from '../hooks/useProjects'
import ProjectCard from './ProjectCard'
import { FiLoader } from 'react-icons/fi'

const FILTERS = ['All', 'Featured'] as const
type Filter = (typeof FILTERS)[number]

export default function Projects() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const { projects, loading } = useProjects()
    const [filter, setFilter] = useState<Filter>('All')

    const visible =
        filter === 'Featured' ? projects.filter((p) => p.featured) : projects

    // Collect all unique tags for a secondary tag filter
    const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).slice(0, 8)
    const [tagFilter, setTagFilter] = useState<string | null>(null)

    const final = tagFilter ? visible.filter((p) => p.tags.includes(tagFilter)) : visible

    return (
        <section id="projects" className="section" ref={ref}>
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: '48px' }}
                >
                    <p className="section-label">What I've built</p>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            gap: '24px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <h2 className="section-title">
                            My <span>Projects</span>
                        </h2>

                        {/* Filter tabs */}
                        <div
                            style={{
                                display: 'flex',
                                gap: '6px',
                                background: 'var(--bg-1)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-pill)',
                                padding: '4px',
                            }}
                        >
                            {FILTERS.map((f) => (
                                <motion.button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        position: 'relative',
                                        padding: '6px 18px',
                                        borderRadius: 'var(--radius-pill)',
                                        border: 'none',
                                        background: 'transparent',
                                        color: filter === f ? 'var(--bg-0)' : 'var(--text-muted)',
                                        fontFamily: 'var(--font-body)',
                                        fontWeight: 600,
                                        fontSize: '0.82rem',
                                        cursor: 'pointer',
                                        transition: 'color var(--transition)',
                                        zIndex: 0,
                                    }}
                                >
                                    {filter === f && (
                                        <motion.span
                                            layoutId="filter-pill"
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                borderRadius: 'var(--radius-pill)',
                                                background: 'var(--green-mid)',
                                                zIndex: -1,
                                            }}
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    {f}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Tag chips */}
                    {allTags.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.3 }}
                            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}
                        >
                            <button
                                onClick={() => setTagFilter(null)}
                                className="tag"
                                style={{
                                    cursor: 'pointer',
                                    border: `1px solid ${tagFilter === null ? 'var(--green-bright)' : 'var(--border)'}`,
                                    color: tagFilter === null ? 'var(--green-bright)' : 'var(--text-muted)',
                                    background: tagFilter === null ? 'var(--green-glow-sm)' : 'transparent',
                                    transition: 'all var(--transition)',
                                }}
                            >
                                All tags
                            </button>
                            {allTags.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTagFilter(tagFilter === t ? null : t)}
                                    className="tag"
                                    style={{
                                        cursor: 'pointer',
                                        border: `1px solid ${tagFilter === t ? 'var(--green-bright)' : 'var(--border)'}`,
                                        color: tagFilter === t ? 'var(--green-bright)' : 'var(--text-muted)',
                                        background: tagFilter === t ? 'var(--green-glow-sm)' : 'transparent',
                                        transition: 'all var(--transition)',
                                    }}
                                >
                                    {t}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </motion.div>

                {/* Loading */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '80px 0',
                            color: 'var(--text-muted)',
                            fontSize: '0.9rem',
                        }}
                    >
                        <div className="spinner">
                            <FiLoader size={35} />
                        </div>
                        Loading projects...
                    </motion.div>
                )}

                {/* Grid */}
                {!loading && (
                    <>
                        <AnimatePresence mode="wait">
                            {final.length === 0 ? (
                                <motion.p
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        textAlign: 'center',
                                        padding: '80px 0',
                                        color: 'var(--text-muted)',
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    No projects yet. Add some from the{' '}
                                    <a href="/admin" style={{ color: 'var(--green-bright)' }}>admin panel</a>.
                                </motion.p>
                            ) : (
                                <motion.div
                                    key="grid"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                        gap: '24px',
                                    }}
                                >
                                    {final.map((project, i) => (
                                        <ProjectCard
                                            key={project.id}
                                            project={project}
                                            index={i}
                                            inView={inView}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Live indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8 }}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '8px',
                                marginTop: '48px',
                                color: 'var(--text-muted)',
                                fontSize: '0.78rem',
                            }}
                        >
                            <motion.span
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    width: 7,
                                    height: 7,
                                    borderRadius: '50%',
                                    background: 'var(--green-bright)',
                                    display: 'inline-block',
                                }}
                            />
                            Live - updates in real-time from Firestore
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    )
}
