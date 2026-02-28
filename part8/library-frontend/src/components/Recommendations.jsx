import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ME } from '../queries'

import BookTable from './BookTable'

const Recommendations = () => {
  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
  } = useQuery(ALL_BOOKS)
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(ME)

  if (booksLoading || userLoading) return <p>Loading...</p>
  if (booksError || userError) return <p>Error loading data</p>

  const books = booksData.allBooks
  const favoriteGenre = userData.me.favoriteGenre

  const filteredBooks = books.filter((b) => b.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <BookTable books={filteredBooks} />
    </div>
  )
}

export default Recommendations
