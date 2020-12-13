import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { User } from '../interfaces/user'
import * as AuthApi from '../apis/auth'

interface State {
  loading: boolean
  error?: Error
  user?: User
}

type Action = 
  | { type: 'AUTHORIZING' }
  | { type: 'AUTHORIZE_SUCCEED', user: User }
  | { type: 'AUTHORIZE_FAILED', error: Error }
  | { type: 'SIGN_OUT' }

const initialState = {
  loading: false,
  error: null,
  user: null
}

const authReducer = (state: State, action: Action): State => {
  switch(action.type) {
    case 'AUTHORIZING':
      return {
      ...initialState,
      loading: true,
    }
    case 'AUTHORIZE_SUCCEED': 
      return {
      ...initialState,
      user: action.user
    }
    case 'AUTHORIZE_FAILED':
      return {
      ...initialState,
      error: action.error
    }
    case 'SIGN_OUT':
      return {
      ...initialState
    }
    default:
      return state
  }
}

export const useAuthProvider = () => {
 const [state, dispatch] = React.useReducer(authReducer, {
    ...initialState,
    loading: true
  })
  
  const authContext = React.useMemo(() => {
    async function authorize() {
      dispatch({type: 'AUTHORIZING'})
      try {
        const accessToken = await AsyncStorage.getItem('accessToken')
        if (accessToken === null) {
          dispatch({
            type: 'AUTHORIZE_FAILED',
            error: null
          })
          return
        }
        const user = await AuthApi.authorize({ accessToken })
        dispatch({ type: 'AUTHORIZE_SUCCEED', user })
      } catch(error) {
        dispatch({
          type: 'AUTHORIZE_FAILED',
          error
        })
      }
    }

    async function signIn ({email, password}) {
      try {
        const  accessToken  = await AuthApi.signIn({ email, password })
        await AsyncStorage.setItem('accessToken', accessToken)
        await authorize()
      } catch(error) {
        dispatch({type: 'AUTHORIZE_FAILED', error })
      }
    }

    async function signOut() { 
      await AsyncStorage.removeItem('accessToken')
      dispatch({type: 'SIGN_OUT'})
    }

    return {
      signIn,
      signOut,
      authorize
    }
  }, [])

  React.useEffect(() => {
    authContext.authorize()
  }, [])

  return {
    ...authContext,
    ...state
  }
}
