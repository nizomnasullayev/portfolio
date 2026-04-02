import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi'
import type { Project } from '../types'

interface Props {
    project: Project
    index: number
    inView: boolean
}

export default function ProjectCard({ project, index, inView }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ y: -6 }}
            style={{
                position: 'relative',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)',
                transition: 'border-color var(--transition), box-shadow var(--transition)',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
            }}
            onMouseEnter={(e) => {
                ; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-hover)'
                    ; (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-glow)'
            }}
            onMouseLeave={(e) => {
                ; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
                    ; (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-card)'
            }}
        >
            {/* Featured badge */}
            {project.featured && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    style={{
                        position: 'absolute',
                        top: 14,
                        right: 14,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-pill)',
                        background: 'rgba(74, 222, 128, 0.1)',
                        border: '1px solid rgba(74, 222, 128, 0.3)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: 'var(--green-bright)',
                        letterSpacing: '0.05em',
                        zIndex: 1,
                    }}
                >
                    <FiStar size={10} /> Featured
                </motion.div>
            )}

            {/* Image / placeholder */}
            <div
                style={{
                    height: 180,
                    overflow: 'hidden',
                    background: project.imageUrl
                        ? undefined
                        : 'linear-gradient(135deg, var(--bg-2) 0%, var(--green-deep) 100%)',
                    position: 'relative',
                }}
            >
                {project.imageUrl ? (
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2.5rem',
                                fontWeight: 800,
                                color: 'rgba(74, 222, 128, 0.15)',
                                letterSpacing: '-0.04em',
                                userSelect: 'none',
                            }}
                        >
                            {project.title.slice(0, 2).toUpperCase()}
                        </span>
                    </div>
                )}
                {/* Subtle gradient overlay */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, transparent 50%, var(--bg-card) 100%)',
                    }}
                />
            </div>

            {/* Content */}
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                    }}
                >
                    {project.title}
                </h3>

                <p
                    style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.85rem',
                        lineHeight: 1.65,
                        flex: 1,
                    }}
                >
                    {project.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.tags.map((t) => (
                        <span key={t} className="tag">{t}</span>
                    ))}
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: '10px', paddingTop: '4px' }}>
                    {project.githubUrl && (
                        <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '7px 14px',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: 'var(--text-secondary)',
                                transition: 'border-color var(--transition)',
                            }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-hover)')}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)')}
                        >
                            <FiGithub size={14} /> GitHub
                        </motion.a>
                    )}
                    {project.liveUrl && (
                        <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '7px 14px',
                                background: 'var(--green-glow-sm)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: 'var(--green-bright)',
                                transition: 'background var(--transition)',
                            }}
                        >
                            <FiExternalLink size={14} /> Live Demo
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.div>
    )
}