import { useQuery } from '@apollo/client/react'
import { ME, BOOKS_BY_GENRE } from '../queries'

import BookTable from './BookTable'

const Recommendations = () => {
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(ME)

  const favoriteGenre = userData?.me?.favoriteGenre || null
  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
  } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  })

  if (booksLoading || userLoading) return <p>Loading...</p>
  if (booksError || userError) return <p>Error loading data</p>

  const books = booksData?.booksByGenre || []

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <BookTable books={books} />
    </div>
  )
}

export default Recommendations
