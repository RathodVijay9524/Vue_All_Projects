export interface Employee {
  id: number
  firstName: string
  lastName: string
  emailId: string
}

export type NewEmployee = Omit<Employee, 'id'>
