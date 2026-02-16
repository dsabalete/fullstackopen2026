import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const CommentForm = ({ blogId }) => {
  const [text, setText] = useState('')
  const queryClient = useQueryClient()

  const commentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setText('')
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    if (text.trim()) {
      commentMutation.mutate({ id: blogId, comment: text })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Write a comment..."
      />
      <button type="submit" disabled={commentMutation.isPending}>
        add comment
      </button>
    </form>
  )
}

export default CommentForm