import type { ApiError, Page } from '@/models/global'
import type { Student } from '@/models/students'
import { DELETE, fetchApi, GET, POST, PUT } from './base'
import type { DashboardStats } from '@/models/activities'

async function createStudent(student: Student): Promise<Student | ApiError> {
  try {
    const response = await fetchApi(POST('/students', student))
    const data = await response.json()

    if (!response.ok) return { error: data.error } as ApiError

    return data as Student
  } catch (error) {
    if (error instanceof TypeError) return { error: ['Network/Fetch error'] } as ApiError

    return { error: ['Unknown error'] } as ApiError
  }
}

async function getStudents(): Promise<Page | ApiError> {
  try {
    const response = await fetchApi(GET('/students'))
    const data = await response.json()

    if (!response.ok) return { error: data.error } as ApiError

    return data as Page
  } catch (error) {
    if (error instanceof TypeError) return { error: ['Network/Fetch error'] } as ApiError

    return { error: ['Unknown error'] } as ApiError
  }
}

async function getStudent(id: string): Promise<Student | ApiError> {
  try {
    const response = await fetchApi(GET(`/students/${id}`))
    const data = await response.json()

    if (!response.ok) return { error: data.error } as ApiError

    return data as Student
  } catch (error) {
    if (error instanceof TypeError) return { error: ['Network/Fetch error'] } as ApiError

    return { error: ['Unknown error'] } as ApiError
  }
}

async function updateStudent(student: Student): Promise<Student | ApiError> {
  try {
    const response = await fetchApi(PUT(`/students/${student.id}`, student))
    const data = await response.json()

    if (!response.ok) return { error: data.error } as ApiError

    return data as Student
  } catch (error) {
    if (error instanceof TypeError) return { error: ['Network/Fetch error'] } as ApiError

    return { error: ['Unknown error'] } as ApiError
  }
}

async function deleteStudent(id: string): Promise<void | ApiError> {
  try {
    const response = await fetchApi(DELETE(`/students/${id}`))
    const data = await response.json()

    if (!response.ok) return { error: data.error } as ApiError
  } catch (error) {
    if (error instanceof TypeError) return { error: ['Network/Fetch error'] } as ApiError

    return { error: ['Unknown error'] } as ApiError
  }
}

async function getDashboardStats(): Promise<DashboardStats | ApiError> {
  try {
    const response = await fetchApi(GET('/students/summary'))
    const data = await response.json()

    if (!response.ok) return { error: data.error } as ApiError

    return data as DashboardStats
  } catch (error) {
    if (error instanceof TypeError) return { error: ['Network/Fetch error'] } as ApiError

    return { error: ['Unknown error'] } as ApiError
  }
}

export { createStudent, deleteStudent, getStudent, getStudents, updateStudent, getDashboardStats }
