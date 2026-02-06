import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateVote } from './requests'

import { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'

const App = () => {
  const { notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const updateVoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anectodes'], (oldAnecdotes) => {
        return oldAnecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote,
        )
      })
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        notification: `anecdote '${updatedAnecdote.content}' voted`,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
  })

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['anectodes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>anecdote service unavailable: {error.message}</div>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
