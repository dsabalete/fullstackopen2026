import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'

import BookTable from './BookTable'

const Books = () => {
  const [filter, setFilter] = useState(null)

  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
  } = useQuery(ALL_BOOKS, {
    skip: !!filter,
  })
  const {
    loading: genreBooksLoading,
    error: genreBooksError,
    data: genreBooksData,
  } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: filter },
    skip: !filter,
  })

  if (booksLoading || genreBooksLoading) return <p>Loading...</p>
  if (booksError || genreBooksError)
    return (
      <p>Error: {booksError ? booksError.message : genreBooksError.message}</p>
    )

  const books = booksData?.allBooks || []
  const filteredBooks = genreBooksData?.booksByGenre || books

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
