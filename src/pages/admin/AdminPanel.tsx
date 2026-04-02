import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'
import type { Project } from '../../types'
import {
    FiLogOut,
    FiTrash2,
    FiEdit2,
    FiGithub,
    FiExternalLink,
    FiStar,
    FiLoader,
    FiArrowLeft,
} from 'react-icons/fi'
import ProjectForm from './ProjectForm'

type Omitted = Omit<Project, 'id' | 'createdAt'>

export default function AdminPanel() {
    const { user, logout } = useAuth()
    const { projects, loading, addProject, updateProject, deleteProject } = useProjects()
    const navigate = useNavigate()

    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const handleLogout = async () => {
        await logout()
        navigate('/admin/login', { replace: true })
    }

    const handleDelete = async (id: string) => {
        setDeletingId(id)
        await deleteProject(id)
        setDeletingId(null)
    }

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'var(--bg-0)',
                paddingBottom: '80px',
            }}
        >
            {/* Top bar */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    backdropFilter: 'blur(16px)',
                    background: 'rgba(6,13,6,0.85)',
                    borderBottom: '1px solid var(--border)',
                    padding: '0 24px',
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <motion.button
                        onClick={() => navigate('/')}
                        whileHover={{ x: -3 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            fontSize: '0.83rem',
                            fontFamily: 'var(--font-body)',
                        }}
                    >
                        <FiArrowLeft size={14} /> Portfolio
                    </motion.button>
                    <span style={{ color: 'var(--border)', fontSize: '1rem' }}>│</span>
                    <h1
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            color: 'var(--green-bright)',
                        }}
                    >
                        Admin Panel
                    </h1>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {user?.email}
                    </span>
                    <motion.button
                        onClick={handleLogout}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-outline"
                        style={{ padding: '7px 14px', fontSize: '0.82rem' }}
                    >
                        <FiLogOut size={13} /> Logout
                    </motion.button>
                </div>
            </motion.header>

            <div className="container" style={{ paddingTop: '48px' }}>
                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '16px',
                        marginBottom: '40px',
                    }}
                >
                    {[
                        { label: 'Total Projects', value: projects.length },
                        { label: 'Featured', value: projects.filter((p) => p.featured).length },
                        { label: 'With Live Demo', value: projects.filter((p) => p.liveUrl).length },
                    ].map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 + i * 0.07 }}
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)',
                                padding: '20px',
                                textAlign: 'center',
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '2rem',
                                    fontWeight: 800,
                                    color: 'var(--green-bright)',
                                    lineHeight: 1,
                                    marginBottom: '6px',
                                }}
                            >
                                {s.value}
                            </p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{s.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.3fr',
                        gap: '32px',
                        alignItems: 'start',
                    }}
                    className="admin-grid"
                >
                    {/* Add project form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <ProjectForm
                            mode="add"
                            onSave={async (data: any) => { await addProject(data) }}
                        />
                    </motion.div>

                    {/* Project list */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        <h2
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 700,
                                fontSize: '1.05rem',
                                marginBottom: '18px',
                                color: 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            All Projects
                            {/* Live dot */}
                            <motion.span
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: 'var(--green-bright)',
                                    display: 'inline-block',
                                }}
                            />
                        </h2>

                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
                                <div className='spinner'>
                                    <FiLoader size={35} />
                                </div>
                            </div>
                        ) : projects.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', padding: '24px 0' }}>
                                No projects yet. Add your first one!
                            </p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <AnimatePresence>
                                    {projects.map((p) => (
                                        <motion.div
                                            key={p.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.94, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {editingId === p.id ? (
                                                <ProjectForm
                                                    mode="edit"
                                                    initial={{
                                                        title: p.title,
                                                        description: p.description,
                                                        tags: p.tags,
                                                        githubUrl: p.githubUrl,
                                                        liveUrl: p.liveUrl,
                                                        imageUrl: p.imageUrl,
                                                        featured: p.featured,
                                                    }}
                                                    onSave={async (data: Omitted) => {
                                                        await updateProject(p.id, data)
                                                        setEditingId(null)
                                                    }}
                                                    onCancel={() => setEditingId(null)}
                                                />
                                            ) : (
                                                <motion.div
                                                    whileHover={{ borderColor: 'var(--border-hover)' }}
                                                    style={{
                                                        background: 'var(--bg-card)',
                                                        border: '1px solid var(--border)',
                                                        borderRadius: 'var(--radius)',
                                                        padding: '16px 20px',
                                                        transition: 'border-color var(--transition)',
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                                                                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                                                                    {p.title}
                                                                </h3>
                                                                {p.featured && (
                                                                    <span className="tag" style={{ fontSize: '0.65rem', padding: '2px 7px' }}>
                                                                        <FiStar size={9} /> Featured
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '340px' }}>
                                                                {p.description || 'No description'}
                                                            </p>
                                                        </div>

                                                        {/* Actions */}
                                                        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                                                            {p.githubUrl && (
                                                                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                                                                    style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', transition: 'color var(--transition)' }}
                                                                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-bright)')}
                                                                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                                                                >
                                                                    <FiGithub size={13} />
                                                                </a>
                                                            )}
                                                            {p.liveUrl && (
                                                                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                                                                    style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', transition: 'color var(--transition)' }}
                                                                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--green-bright)')}
                                                                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                                                                >
                                                                    <FiExternalLink size={13} />
                                                                </a>
                                                            )}
                                                            <motion.button
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => setEditingId(p.id)}
                                                                style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color var(--transition), border-color var(--transition)' }}
                                                                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--green-bright)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-hover)' }}
                                                                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)' }}
                                                            >
                                                                <FiEdit2 size={13} />
                                                            </motion.button>
                                                            <motion.button
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => handleDelete(p.id)}
                                                                disabled={deletingId === p.id}
                                                                style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 'var(--radius-sm)', background: 'none', color: '#f87171', cursor: 'pointer', opacity: deletingId === p.id ? 0.5 : 1 }}
                                                            >
                                                                {deletingId === p.id ? (
                                                                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}>
                                                                        ⟳
                                                                    </motion.span>
                                                                ) : (
                                                                    <FiTrash2 size={13} />
                                                                )}
                                                            </motion.button>
                                                        </div>
                                                    </div>

                                                    {/* Tags */}
                                                    {p.tags.length > 0 && (
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                                            {p.tags.map((t) => (
                                                                <span key={t} className="tag" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>{t}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <style>{`
        @media (max-width: 860px) {
          .admin-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    )
}