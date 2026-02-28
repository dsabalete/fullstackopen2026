import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const { loading, error, data } = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const books = data.allBooks

  const filteredBooks = filter
    ? books.filter((b) => b.genres.includes(filter))
    : books

  const genres = [...new Set(books.flatMap((b) => b.genres))]

  return (
    <div>
      <h2>books</h2>

      {filter && (
        <p>
          in genre <b>{filter}</b>
        </p>
      )}

      <table className="books">
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="genres">
        {genres.map((genre) => (
          <button key={genre} onClick={() => setFilter(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
