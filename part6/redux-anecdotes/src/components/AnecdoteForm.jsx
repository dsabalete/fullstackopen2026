import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer.js'
import { messageChange } from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(appendAnecdote(content))
    dispatch(messageChange(`You added "${content}"`))
    setTimeout(() => {
      dispatch(messageChange(''))
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
