
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()

    if (email === 'test@gmail.com' && password === '12345') {
      navigate('/dashboard')
    } else {
      setMessage('Invalid email or password')
    }
  }

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>PeerLend</h1>

        <p className="login-subtitle">
          Welcome back! Log in to your account.
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

        </form>

        <p>{message}</p>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>

    </div>
  )
}

export default Login

