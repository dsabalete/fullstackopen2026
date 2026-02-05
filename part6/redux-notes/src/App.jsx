import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import NoteForm from './components/NoteForm.jsx'
import Notes from './components/Notes.jsx'
import VisibilityFilter from './components/VisibilityFilter.jsx'
import { setNotes } from './reducers/noteReducer'
import noteService from './services/notes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)))
  }, [dispatch])

  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
