import { Timestamp } from 'firebase/firestore'

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  githubUrl: string
  liveUrl?: string
  imageUrl?: string
  featured: boolean
  createdAt: Timestamp
}

export interface Skill {
  name: string
  level: number // 0–100
}

export type Theme = 'dark' | 'light'