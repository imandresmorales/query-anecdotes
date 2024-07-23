import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'

import { useContext } from 'react'
import CounterContext from '../CounterContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [counter, dispatch] = useContext(CounterContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: 'add', payload: content })
    setTimeout(() => {
      dispatch({ type: 'hide' })
    }, 5000);
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm