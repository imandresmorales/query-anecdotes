import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'vote':
      return `anecdote '${action.payload}' voted`
    case 'add':
      return `anecdote '${action.payload}' added`
    case 'hide':
      return ''
    case 'error':
      return `too short anecdote, must have length 5 or more`
    default:
      return state
  }
}

const CounterContext = createContext()

export const CounterContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <CounterContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </CounterContext.Provider>
  )
}

export default CounterContext