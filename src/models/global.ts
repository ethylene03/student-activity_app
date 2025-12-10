import type { Activity } from './activities'
import type { Student } from './students'

export interface ApiError {
  error: string[]
}

export type DataType = Student | Activity | null

export interface Page {
  content: DataType[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  size: number
  totalElements: number
  totalPages: number
}
