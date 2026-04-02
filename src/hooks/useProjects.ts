import { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { Project } from '../types'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project))
      setProjects(data)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  const addProject = async (project: Omit<Project, 'id' | 'createdAt'>) => {
    await addDoc(collection(db, 'projects'), {
      ...project,
      createdAt: serverTimestamp(),
    })
  }

  const updateProject = async (id: string, data: Partial<Omit<Project, 'id' | 'createdAt'>>) => {
    await updateDoc(doc(db, 'projects', id), data)
  }

  const deleteProject = async (id: string) => {
    await deleteDoc(doc(db, 'projects', id))
  }

  return { projects, loading, addProject, updateProject, deleteProject }
}