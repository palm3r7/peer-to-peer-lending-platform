
import './profile.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Profile() {

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || {}
  })

  const [name, setName] = useState(user.full_name || '')
  const [email, setEmail] = useState(user.email || '')
  const [phone, setPhone] = useState(user.phone_number || '')

  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/')
  }

  async function handleSave(e) {
    e.preventDefault()

    try {

      const response = await fetch(
        'http://localhost/peer%20to%20peer%20lending%20platform/backend/updateprofile.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user.user_id,
            full_name: name,
            email: email,
            phone_number: phone
          })
        }
      )

      const data = await response.json()

      if (data.message === 'Profile updated successfully!') {

        const updatedUser = {
          ...user,
          full_name: name,
          email: email,
          phone_number: phone
        }

        setUser(updatedUser)

        localStorage.setItem('user', JSON.stringify(updatedUser))

        setIsEditing(false)
        setMessage(data.message)

      } else {
        setMessage(data.message)
      }

    } catch (error) {
      console.log('Error updating profile:', error)
      setMessage('Could not connect to the server')
    }
  }

  return (
    <div className="profile-container">

      {/* Sidebar */}
      <aside className="profile-sidebar">
        <h2>PeerLend</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/browseloans">Browse Loan Requests</Link>
          <Link to="/requestloan">Request a Loan</Link>
          <Link to="/myloans">My Borrowing</Link>
          <Link to="/mylending">My Lending</Link>
          <Link to="/repayment">Repayments</Link>
          <Link to="/profile" className="active">My Profile</Link>
        </nav>

        <button
          className="profile-logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="profile-main">

        <h1>My Profile</h1>
        <p>View your personal account information.</p>

        <div className="profile-card">

          <h2>Personal Information</h2>

          {user.user_id ? (

            isEditing ? (

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

                <p><strong>Full Name:</strong> {user.full_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone Number:</strong> {user.phone_number}</p>
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

            )

          ) : (

            <p>Please log in to view your profile.</p>

          )}

          <p>{message}</p>

        </div>

      </main>

    </div>
  )
}

export default Profile


