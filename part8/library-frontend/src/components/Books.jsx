import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'

import BookTable from './BookTable'

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

      <BookTable books={filteredBooks} />

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
