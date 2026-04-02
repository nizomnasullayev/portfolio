import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiX, FiSave } from 'react-icons/fi'
import type { Project } from '../../types'

type FormData = Omit<Project, 'id' | 'createdAt'>

const EMPTY: FormData = {
    title: '',
    description: '',
    tags: [],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    featured: false,
}

interface Props {
    initial?: FormData & { id?: string }
    onSave: (data: FormData) => Promise<void>
    onCancel?: () => void
    mode: 'add' | 'edit'
}

export default function ProjectForm({ initial, onSave, onCancel, mode }: Props) {
    const [form, setForm] = useState<FormData>(initial ?? EMPTY)
    const [tagInput, setTagInput] = useState('')
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    const set = (field: keyof FormData, value: FormData[keyof FormData]) =>
        setForm((f) => ({ ...f, [field]: value }))

    const addTag = () => {
        const t = tagInput.trim()
        if (t && !form.tags.includes(t)) set('tags', [...form.tags, t])
        setTagInput('')
    }

    const removeTag = (t: string) => set('tags', form.tags.filter((x: any) => x !== t))

    const handleSave = async () => {
        if (!form.title.trim()) { setError('Title is required.'); return }
        setSaving(true)
        setError('')
        try {
            await onSave(form)
            if (mode === 'add') setForm(EMPTY)
        } catch {
            setError('Something went wrong. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: '28px',
                boxShadow: 'var(--shadow-card)',
            }}
        >
            <h3
                style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    marginBottom: '22px',
                    color: 'var(--text-secondary)',
                }}
            >
                {mode === 'add' ? '+ Add New Project' : '✎ Edit Project'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Title */}
                <div>
                    <label className="form-label">Title *</label>
                    <input
                        className="form-input"
                        placeholder="My Awesome Project"
                        value={form.title}
                        onChange={(e) => set('title', e.target.value)}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-input"
                        placeholder="A brief description of what this project does…"
                        rows={3}
                        value={form.description}
                        onChange={(e) => set('description', e.target.value)}
                    />
                </div>

                {/* GitHub + Live in a row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="two-col">
                    <div>
                        <label className="form-label">GitHub URL</label>
                        <input
                            className="form-input"
                            placeholder="https://github.com/..."
                            value={form.githubUrl}
                            onChange={(e) => set('githubUrl', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="form-label">Live URL (optional)</label>
                        <input
                            className="form-input"
                            placeholder="https://myproject.com"
                            value={form.liveUrl ?? ''}
                            onChange={(e) => set('liveUrl', e.target.value)}
                        />
                    </div>
                </div>

                {/* Image URL */}
                <div>
                    <label className="form-label">Image URL (optional)</label>
                    <input
                        className="form-input"
                        placeholder="https://i.imgur.com/screenshot.png"
                        value={form.imageUrl ?? ''}
                        onChange={(e) => set('imageUrl', e.target.value)}
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="form-label">Tags</label>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                        <input
                            className="form-input"
                            placeholder="React, Python, Firebase…"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                            style={{ flex: 1 }}
                        />
                        <button
                            onClick={addTag}
                            className="btn btn-outline"
                            style={{ flexShrink: 0, padding: '10px 14px' }}
                        >
                            <FiPlus size={15} />
                        </button>
                    </div>
                    <AnimatePresence>
                        {form.tags.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}
                            >
                                {form.tags.map((t: any) => (
                                    <motion.span
                                        key={t}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        className="tag"
                                        style={{ cursor: 'default' }}
                                    >
                                        {t}
                                        <button
                                            onClick={() => removeTag(t)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: 'inherit',
                                                padding: '0 0 0 4px',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <FiX size={10} />
                                        </button>
                                    </motion.span>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Featured toggle */}
                <label
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        userSelect: 'none',
                    }}
                >
                    <div
                        onClick={() => set('featured', !form.featured)}
                        style={{
                            width: 40,
                            height: 22,
                            borderRadius: 'var(--radius-pill)',
                            background: form.featured ? 'var(--green-mid)' : 'var(--bg-2)',
                            border: '1px solid var(--border)',
                            position: 'relative',
                            transition: 'background var(--transition)',
                            cursor: 'pointer',
                            flexShrink: 0,
                        }}
                    >
                        <motion.div
                            animate={{ left: form.featured ? 20 : 2 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            style={{
                                position: 'absolute',
                                top: 2,
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                background: 'white',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                            }}
                        />
                    </div>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                        Featured project
                    </span>
                </label>

                {/* Error */}
                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
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
                </AnimatePresence>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', paddingTop: '4px', flexWrap: 'wrap' }}>
                    <motion.button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn btn-primary"
                        whileTap={{ scale: 0.97 }}
                        style={{ opacity: saving ? 0.7 : 1 }}
                    >
                        {saving ? (
                            <>
                                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⟳</motion.span>
                                Saving…
                            </>
                        ) : (
                            <><FiSave size={14} /> {mode === 'add' ? 'Add Project' : 'Save Changes'}</>
                        )}
                    </motion.button>
                    {onCancel && (
                        <button onClick={onCancel} className="btn btn-outline">
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            <style>{`
        .form-label {
          display: block;
          margin-bottom: 6px;
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        @media (max-width: 560px) {
          .two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </motion.div>
    )
}