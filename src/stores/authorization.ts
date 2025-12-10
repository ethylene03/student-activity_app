import type { Student, StudentToken } from '@/models/students'
import { defineStore } from 'pinia'

export const useAuthorizationStore = defineStore('authorization', {
  state: (): StudentToken => ({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    token: '',
  }),

  actions: {
    isLoggedIn(): boolean {
      return this.token !== ''
    },
    setStudentDetails(response: StudentToken) {
      this.id = response.id
      this.firstName = response.firstName
      this.lastName = response.lastName
      this.email = response.email
      this.token = response.token
    },
    getStudentDetails() {
      return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      } as Student
    },
  },
})
