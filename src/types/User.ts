export type Status = '0' | '1'

export type User ={
  id: number
  name: string
  username: string
  password: string
  status: Status
}