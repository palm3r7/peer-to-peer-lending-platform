
import './profile.css'
import { Link } from 'react-router-dom'

function Profile() {
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

          <div className="profile-details">
            <p><strong>Full Name:</strong> John Doe</p>
            <p><strong>Email:</strong> johndoe@gmail.com</p>
            <p><strong>Phone Number:</strong> 0712345678</p>
            <p><strong>Account Type:</strong> Borrower / Lender</p>
          </div>

          <button className="edit-profile-btn">
            Edit Profile
          </button>

        </div>

      </main>

    </div>
  )
}

export default Profile
