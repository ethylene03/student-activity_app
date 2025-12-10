export interface StudentToken {
  id: string
  firstName: string
  lastName: string
  email: string
  token: string
}

export type Student = Omit<StudentToken, 'token'>
export type StudentSignUp = Student & { password: string }

export interface StudentLogin {
  email: string
  password: string
}
