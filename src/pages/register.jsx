
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.css'

function Register() {

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleRegister(e) {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    try {
      const response = await fetch(
        'http://localhost/peer%20to%20peer%20lending%20platform/backend/registration.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            full_name: fullName,
            email: email,
            phone_number: phone,
            password: password
          })
        }
      )

      const data = await response.json()

      setMessage(data.message)

    } catch (error) {
      setMessage('Could not connect to the server')
      console.log(error)
    }
  }

  return (
    <div className="register-container">

      <div className="register-card">

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Join our lending platform today
        </p>

        <form onSubmit={handleRegister}>

          <div className="register-form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="register-form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="register-form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="register-form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="register-form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-button">
            Create Account
          </button>

        </form>

        <p>{message}</p>

        <p className="register-footer">
          Already have an account?
          <Link to="/"> Login</Link>
        </p>

      </div>

    </div>
  )
}

export default Register


