import { useState } from 'react'
import {
  useQuery,
  useSubscription,
  useApolloClient,
} from '@apollo/client/react'
import { ALL_BOOKS, BOOKS_BY_GENRE, BOOK_ADDED } from '../queries'
import { addBookToCache } from '../utils/apolloCache'

import BookTable from './BookTable'

const Books = () => {
  const [filter, setFilter] = useState(null)
  const client = useApolloClient()

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

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data?.bookAdded
      if (addedBook) {
        addBookToCache(client.cache, addedBook)
      }
    },
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
