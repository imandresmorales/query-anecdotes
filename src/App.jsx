import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './request'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  // const { status, data, error } = useQuery(  en status esta el estado y en error te da info del error
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.status === "pending") {
    return <span>Pending</span>
  }

  if (result.status === "error") {
    return <span>Anecdote service error </span>
  }

  // if (result.status === "success") {
  //   return <span>success </span>
  // }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
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
// 6.20