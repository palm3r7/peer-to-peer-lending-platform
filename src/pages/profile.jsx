
import './profile.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Profile() {

  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('johndoe@gmail.com')
  const [phone, setPhone] = useState('0712345678')

  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')

  function handleSave(e) {
    e.preventDefault()

    setIsEditing(false)
    setMessage('Profile updated successfully!')
  }

  return (
    <div className="profile-container">

      {/* Sidebar */}
      <aside className="profile-sidebar">
        <h2>PeerLend</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/browse-loans">Browse Loan Requests</Link>
          <Link to="/request-loan">Request a Loan</Link>
          <Link to="/my-loans">My Borrowing</Link>
          <Link to="/my-lending">My Lending</Link>
          <Link to="/repayments">Repayments</Link>
          <Link to="/profile" className="active">My Profile</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="profile-main">

        <h1>My Profile</h1>
        <p>View your personal account information.</p>

        <div className="profile-card">

          <h2>Personal Information</h2>

          {isEditing ? (

            <form onSubmit={handleSave}>

              <div className="profile-details">

                <p>
                  <strong>Full Name:</strong>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </p>

                <p>
                  <strong>Email:</strong>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </p>

                <p>
                  <strong>Phone Number:</strong>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </p>

                <p>
                  <strong>Account Type:</strong> Borrower / Lender
                </p>

              </div>

              <button type="submit" className="edit-profile-btn">
                Save Changes
              </button>

            </form>

          ) : (

            <div className="profile-details">

              <p><strong>Full Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Phone Number:</strong> {phone}</p>
              <p><strong>Account Type:</strong> Borrower / Lender</p>

              <button
                className="edit-profile-btn"
                onClick={() => {
                  setIsEditing(true)
                  setMessage('')
                }}
              >
                Edit Profile
              </button>

            </div>

          )}

          <p>{message}</p>

        </div>

      </main>

    </div>
  )
}

export default Profile

