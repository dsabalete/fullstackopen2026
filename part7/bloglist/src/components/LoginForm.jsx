const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div style={{
      maxWidth: '400px',
      margin: '2em auto',
      padding: '30px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '25px',
      }}>🔐 Login</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#2c3e50',
            fontWeight: '500',
          }}>
            Username
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px',
                marginTop: '5px',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '1em',
                boxSizing: 'border-box',
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#2c3e50',
            fontWeight: '500',
          }}>
            Password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px',
                marginTop: '5px',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '1em',
                boxSizing: 'border-box',
              }}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
      </form>
    </div>
  )
}

export default LoginForm
