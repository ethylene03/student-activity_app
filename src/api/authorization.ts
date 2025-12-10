import type { ApiError } from '@/models/global'
import type { Student, StudentLogin, StudentSignUp, StudentToken } from '@/models/students'

function getUrl(path: string = ''): string {
  return import.meta.env.VITE_API_URL + '/auth' + path
}

const headers = new Headers({ 'Content-Type': 'application/json' })

async function login(student: StudentLogin): Promise<StudentToken | ApiError> {
  try {
    const response = await fetch(getUrl('/login'), {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify(student),
    })

    if (!response.ok) return (await response.json()) as ApiError

    return (await response.json()) as StudentToken
  } catch (error) {
    console.error(error)
    if (error instanceof TypeError) return { error: ['Network/Fetch error'] } as ApiError

    return { error: ['Unknown error'] } as ApiError
  }
}

async function signup(student: StudentSignUp): Promise<Student | ApiError> {
  try {
    const response = await fetch(getUrl('/signup'), {
      method: 'POST',
      headers,
      body: JSON.stringify(student),
    })

    if (!response.ok) return (await response.json()) as ApiError

    return (await response.json()) as Student
  } catch (error) {
    if (error instanceof TypeError) return { error: ['Network/Fetch error'] } as ApiError

    return { error: ['Unknown error'] } as ApiError
  }
}

async function logout(): Promise<void> {
  try {
    const response = await fetch(getUrl(), {
      method: 'DELETE',
      credentials: 'include',
      headers,
    })

    if (!response.ok) throw new Error('Logout failed with status ' + response.status)
  } catch (error) {
    throw new Error('Error logging out student: ' + error)
  }
}

async function refreshToken(): Promise<StudentToken | null> {
  try {
    const response = await fetch(getUrl('/refresh'), {
      method: 'POST',
      credentials: 'include',
      headers,
    })

    if (!response.ok) return null

    return (await response.json()) as StudentToken
  } catch (error) {
    throw new Error('Error refreshing token: ' + error)
  }
}

export { login, logout, refreshToken, signup }
