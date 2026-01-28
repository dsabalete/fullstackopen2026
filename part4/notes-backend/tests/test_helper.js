const Note = require('../models/note.js')
const User = require('../models/user.js')

const initialNotes = [
    {
        content: 'HTML is easy',
        important: false,
        user: '697a01515b9bc6194365d380'
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true,
        user: '697a01515b9bc6194365d380'
    }
]

const passwordHash = await bcrypt.hash('testpassword', 10)
const initialUser = {
    username: 'testuser',
    name: 'Test User',
    password: passwordHash
}

const nonExistingId = async () => {
    const note = new Note({ content: 'willremovethissoon', user: '697a01515b9bc6194365d380' })
    await note.save()
    await note.deleteOne()

    return note._id.toString()
}

const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialNotes,
    initialUser,
    nonExistingId,
    notesInDb,
    usersInDb
}