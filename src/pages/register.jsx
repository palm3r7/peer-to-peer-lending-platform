import { Link } from 'react-router-dom'
import './register.css';

function Register() {
  return (
    <div className="register-container">

      <div className="register-card">

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Join our lending platform today
        </p>

        <form>

          <div className="register-form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="register-form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="register-form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="register-form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="register-form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="register-button">
            Create Account
          </button>

        </form>

        <p className="register-footer">
          Already have an account?
          <a href="/"> Login</a>
        </p>

      </div>

    </div>
  );
}

export default Register;
