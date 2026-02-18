import { useQuery } from '@apollo/client/react'
import BirthyearForm from './BirthyearForm'
import { ALL_AUTHORS } from '../queries'

const Authors = () => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set Birthyear</h3>
      <BirthyearForm />
    </div>
  )
}

export default Authors
