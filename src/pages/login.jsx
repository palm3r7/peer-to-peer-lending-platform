import './login.css'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="login-container">

      <div className="login-card">

        <h1>PeerLend</h1>

        <p className="login-subtitle">
          Welcome back! Log in to your account.
        </p>

        <form>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

        </form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>

    </div>
  )
}

export default Login
