import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './request'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useContext } from 'react'
import CounterContext from './CounterContext'

const App = () => {
  const queryClient = useQueryClient()
  const [counter, dispatch] = useContext(CounterContext)

  const useAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    // console.log('vote')
    useAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'vote', payload: anecdote.content })
    setTimeout(() => {
      dispatch({ type: 'hide' })
    }, 5000);
  }

  // const { status, data, error } = useQuery(  en status esta el estado y en error te da info del error
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    staleTime: Infinity //para que no ande recargando el frontend con los mismos datos
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.status === "pending")
    return <span>Pending</span>

  if (result.status === "error")
    return <span>Anecdote service error </span>

  // if (result.status === "success")
  //   return <span>success </span>


  const anecdotes = result.data

  const anecdotesOrdered = (anecdotes) => {
    return [...anecdotes].sort((a, b) => b.votes - a.votes)
  }



  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotesOrdered(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App