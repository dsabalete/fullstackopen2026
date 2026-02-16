const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{ content: String }],
})
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    // Transform comment _id to id
    if (returnedObject.comments) {
      returnedObject.comments = returnedObject.comments.map((comment) => ({
        id: comment._id.toString(),
        content: comment.content,
      }))
    }
  },
})

module.exports = mongoose.model('Blog', blogSchema)
