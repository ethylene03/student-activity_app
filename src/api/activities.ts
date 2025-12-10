import type { ApiError, Page } from '@/models/global'
import type { Activity } from '@/models/activities'
import { DELETE, fetchApi, GET, POST, PUT } from './base'

async function createActivity(activity: Activity): Promise<Activity | ApiError> {
  try {
    const response = await fetchApi(
      POST('/activities', {
        ...activity,
        timestamp: activity.timestamp.split(' ').join('T') + ':00',
      }),
    )
    const data = await response.json()

    if (!response.ok) return { error: data.error } as ApiError

    return data as Activity
  } catch (error) {
    if (error instanceof TypeError) return { error: ['Network/Fetch error'] } as ApiError

    return { error: ['Unknown error'] } as ApiError
  }
}

async function getActivities(
  query?: Record<string, string>,
  signal?: AbortSignal,
): Promise<Page | ApiError> {
  try {
    const response = await fetchApi(GET('/activities', query, signal))
    const data = await response.json()

    if (!response.ok) return { error: data.error } as ApiError

    return data as Page
  } catch (error) {
    if (error instanceof TypeError) return { error: ['Network/Fetch error'] } as ApiError

    return { error: ['Unknown error'] } as ApiError
  }
}

async function getActivity(id: string): Promise<Activity | ApiError> {
  try {
    const response = await fetchApi(GET(`/activities/${id}`))
    const data = await response.json()

    if (!response.ok) return { error: data.error } as ApiError

    return data as Activity
  } catch (error) {
    if (error instanceof TypeError) return { error: ['Network/Fetch error'] } as ApiError

    return { error: ['Unknown error'] } as ApiError
  }
}

async function updateActivity(activity: Activity): Promise<Activity | ApiError> {
  try {
    const response = await fetchApi(PUT(`/activities/${activity.id}`, activity))
    const data = await response.json()

    if (!response.ok) return { error: data.error } as ApiError

    return data as Activity
  } catch (error) {
    if (error instanceof TypeError) return { error: ['Network/Fetch error'] } as ApiError

    return { error: ['Unknown error'] } as ApiError
  }
}

async function deleteActivity(id: string): Promise<void | ApiError> {
  try {
    const response = await fetchApi(DELETE(`/activities/${id}`))
    const data = await response.json()

    if (!response.ok) return { error: data.error } as ApiError
  } catch (error) {
    if (error instanceof TypeError) return { error: ['Network/Fetch error'] } as ApiError

    return { error: ['Unknown error'] } as ApiError
  }
}

export { createActivity, deleteActivity, getActivity, getActivities, updateActivity }
