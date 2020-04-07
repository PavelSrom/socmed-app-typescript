export interface RegisterBody {
  avatar?: string
  fullName: string
  email: string
  password: string
}

export interface LoginBody {
  email: string
  password: string
}
