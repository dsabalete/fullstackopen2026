import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const BirthyearForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: Number(born) } })
    setName('')
    setBorn('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          name
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          born
          <input
            type="number"
            value={born}
            name="born"
            min="0"
            onChange={(e) => setBorn(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">update author</button>
    </form>
  )
}

export default BirthyearForm
