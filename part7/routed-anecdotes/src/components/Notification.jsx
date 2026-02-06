const Notification = ({ notification }) => {
  if (notification === '') {
    return null
  }

  const style = {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    border: '1px solid green',
    padding: 10,
    borderRadius: 5,
  }
  return (
    <div style={style}>
      <p>{notification}</p>
    </div>
  )
}

export default Notification
