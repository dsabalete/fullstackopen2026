const Notification = ({ message, errorMessage }) => {
  if (!message && !errorMessage) {
    return null
  }

  return (
    <div className={errorMessage ? 'error' : 'success'}>
      {errorMessage || message}
    </div>
  )
}

export default Notification
