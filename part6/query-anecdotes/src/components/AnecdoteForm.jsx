import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests.js'
import NotificationContext from '../NotificationContext.jsx'

const AnecdoteForm = () => {
  const { notificationDispatch } = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anectodes'])
      queryClient.setQueryData(['anectodes'], anecdotes.concat(newAnecdote))
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        notification: `anecdote '${newAnecdote.content}' created`,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
    onError: (error) => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        notification: `too short anecdote, must have length 5 or more`,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
