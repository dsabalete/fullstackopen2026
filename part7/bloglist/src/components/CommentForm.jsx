import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

const styles = {
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  input: {
    flex: '1',
    minWidth: '250px',
    padding: '12px 16px',
    fontSize: '0.95em',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
}

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
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Write a comment..."
        style={styles.input}
        onFocus={(e) => e.target.style.borderColor = '#3498db'}
        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
      />
      <button
        type="submit"
        disabled={commentMutation.isPending || !text.trim()}
        className={`btn btn-success ${commentMutation.isPending || !text.trim() ? '' : ''}`}
      >
        {commentMutation.isPending ? '💬 adding...' : '💬 add comment'}
      </button>
    </form>
  )
}

export default CommentForm