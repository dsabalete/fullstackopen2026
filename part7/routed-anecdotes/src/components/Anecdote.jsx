const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>author: {anecdote.author}</p>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see: {anecdote.info}</p>
  </div>
)

export default Anecdote
