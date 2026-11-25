
import './dashboard.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Dashboard() {

  const [borrowedLoans, setBorrowedLoans] = useState([])
  const [lending, setLending] = useState([])

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {

    if (user) {

      // Get borrowing records
      fetch(`http://localhost/peer%20to%20peer%20lending%20platform/backend/getmyloans.php?user_id=${user.user_id}`)
        .then(response => response.json())
        .then(data => {
          setBorrowedLoans(data)
        })
        .catch(error => {
          console.log('Error fetching borrowing records:', error)
        })

      // Get lending records
      fetch(`http://localhost/peer%20to%20peer%20lending%20platform/backend/getmylending.php?lender_id=${user.user_id}`)
        .then(response => response.json())
        .then(data => {
          setLending(data)
        })
        .catch(error => {
          console.log('Error fetching lending records:', error)
        })

    }

  }, [])

  // Calculate total borrowed
  const totalBorrowed = borrowedLoans
    .filter(loan => loan.status === 'Approved')
    .reduce((total, loan) => total + Number(loan.amount), 0)

  // Calculate total lent
  const totalLent = lending.reduce(
    (total, loan) => total + Number(loan.amount), 0
  )

  // Count active loans
  const activeLoans = borrowedLoans.filter(
    loan => loan.status === 'Approved'
  ).length

  // Count pending requests
  const pendingRequests = borrowedLoans.filter(
    loan => loan.status === 'Pending'
  ).length

  // Logout function
  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/')
  }

  // Recent activities
  const activities = [
    ...borrowedLoans.map(loan => ({
      text: `You submitted a loan request of KSh ${Number(loan.amount).toLocaleString()}. Status: ${loan.status}`,
      date: loan.created_at
    })),

    ...lending.map(loan => ({
      text: `You lent KSh ${Number(loan.amount).toLocaleString()} to ${loan.borrower_name}.`,
      date: loan.created_at
    }))
  ]

  activities.sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>PeerLend</h2>

        <nav>
          <Link to="/dashboard" className="active">Dashboard</Link>
          <Link to="/browseloans">Browse Loan Requests</Link>
          <Link to="/requestloan">Request a Loan</Link>
          <Link to="/myloans">My Borrowing</Link>
          <Link to="/mylending">My Lending</Link>
          <Link to="/repayment">Repayments</Link>
          <Link to="/profile">My Profile</Link>
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main Dashboard */}
      <main className="dashboard-main">

        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's an overview of your activity.</p>
          </div>

          <div className="user-profile">
            <span>
              {user ? user.full_name.charAt(0).toUpperCase() : 'U'}
            </span>
            <p>{user ? user.full_name : 'User'}</p>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="summary-cards">

          <div className="summary-card">
            <p>Total Borrowed</p>
            <h2>KSh {totalBorrowed.toLocaleString()}</h2>
            <span>Amount borrowed</span>
          </div>

          <div className="summary-card">
            <p>Total Lent</p>
            <h2>KSh {totalLent.toLocaleString()}</h2>
            <span>Amount lent</span>
          </div>

          <div className="summary-card">
            <p>Active Loans</p>
            <h2>{activeLoans}</h2>
            <span>Currently active</span>
          </div>

          <div className="summary-card">
            <p>Pending Requests</p>
            <h2>{pendingRequests}</h2>
            <span>Awaiting approval</span>
          </div>

        </section>

        {/* Quick Actions */}
        <section className="dashboard-section">
          <h2>Quick Actions</h2>

          <div className="quick-actions">
            <Link to="/requestloan">+ Request a Loan</Link>
            <Link to="/browseloans">Browse Loan Requests</Link>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="dashboard-section">
          <h2>Recent Activity</h2>

          <div className="activity-box">

            {activities.length > 0 ? (
              activities.slice(0, 5).map((activity, index) => (
                <p key={index}>{activity.text}</p>
              ))
            ) : (
              <p>No recent activities.</p>
            )}

          </div>
        </section>

      </main>
    </div>
  )
}

export default Dashboard
