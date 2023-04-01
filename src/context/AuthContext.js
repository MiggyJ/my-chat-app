import axios from 'axios'
import React, { createContext, useReducer } from 'react'

const initialState = {
  id: '',
  username: ''
}

const MainReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {

    case 'LOGIN':
      return {
        ...state,
        username: payload.username,
        id: payload.id,
      }

    case 'LOGOUT':
      return {
        ...state,
        username: '',
        id: '',
      }

    default:
      break
  }
}

export const AuthContext = createContext(initialState)


export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MainReducer, initialState)


  const login = async (form) => {
    try {
      const { data } = await axios.post('/auth/login', form)
      localStorage.setItem('authenticated', true)
      if (!data.error) {
        dispatch({
          type: 'LOGIN',
          payload: data.data
        })

        return data
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const getUser = async () => {
    try {
      const { data } = await axios.get('/auth/user')
      if (data) {
        dispatch({
          type: 'LOGIN',
          payload: data
        })

        return true
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const logout = async () => {
    try {
      await axios.post('/auth/logout', {})

      localStorage.removeItem('authenticated')
      dispatch({ type: 'LOGOUT' })

      return true

    } catch (error) {
      console.log(error)
      return error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        username: state.username,
        id: state.id,
        login,
        logout,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}