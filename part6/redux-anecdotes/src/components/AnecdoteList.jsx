import { useSelector, useDispatch } from 'react-redux'
import { upVote } from '../reducers/anecdoteReducer.js'
import { messageChange } from '../reducers/notificationReducer.js'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()),
  )
  const sortedAnecdotes = [...filteredAnecdotes].sort(
    (a, b) => b.votes - a.votes,
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch(upVote(id, anecdote))
    dispatch(messageChange(`You voted for "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(messageChange(''))
    }, 5000)
  }

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
