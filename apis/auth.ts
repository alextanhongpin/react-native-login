import type { User } from '../interfaces/user'

export async function authorize({ accessToken }): Promise<User> {
  if (accessToken === 'fake-token') {
    return {
      name: 'John Doe'
    } as User
  }
  throw new Error('invalid token')
}

export async function signIn({email, password}): Promise<string>{
  const validEmail =  email === 'john.doe@mail.com'
  const validPassword = password === '123456'
  if (validEmail && validPassword) {
    return 'fake-token'
  }
  throw new Error('invalid email or password')
}
