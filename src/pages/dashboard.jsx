
import './dashboard.css'
import { Link } from 'react-router-dom'

function Dashboard() {

  // Sample borrowing records
  const borrowedLoans = [
    { id: 1, amount: 10000, status: 'Pending' },
    { id: 2, amount: 15000, status: 'Approved' },
    { id: 3, amount: 5000, status: 'Rejected' }
  ]

  // Sample lending records
  const lending = [
    { id: 1, amount: 5000 },
    { id: 2, amount: 8000 },
    { id: 3, amount: 3000 }
  ]

  // Calculate total borrowed
  const totalBorrowed = borrowedLoans
    .filter(loan => loan.status === 'Approved')
    .reduce((total, loan) => total + loan.amount, 0)

  // Calculate total lent
  const totalLent = lending.reduce(
    (total, loan) => total + loan.amount, 0
  )

  // Count active loans
  const activeLoans = borrowedLoans.filter(
    loan => loan.status === 'Approved'
  ).length

  // Count pending requests
  const pendingRequests = borrowedLoans.filter(
    loan => loan.status === 'Pending'
  ).length

  // Sample recent activities
  const activities = [
    'You submitted a loan request of KSh 10,000.',
    'Your loan request of KSh 15,000 was approved.',
    'You lent KSh 5,000 to John Kamau.'
  ]

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>PeerLend</h2>

        <nav>
          <Link to="/dashboard" className="active">Dashboard</Link>
          <Link to="/browse-loans">Browse Loan Requests</Link>
          <Link to="/request-loan">Request a Loan</Link>
          <Link to="/my-loans">My Borrowing</Link>
          <Link to="/my-lending">My Lending</Link>
          <Link to="/repayments">Repayments</Link>
          <Link to="/profile">My Profile</Link>
        </nav>

        <button className="logout-button">Logout</button>
      </aside>

      {/* Main Dashboard */}
      <main className="dashboard-main">

        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's an overview of your activity.</p>
          </div>

          <div className="user-profile">
            <span>U</span>
            <p>User</p>
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
            <Link to="/request-loan">+ Request a Loan</Link>
            <Link to="/browse-loans">Browse Loan Requests</Link>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="dashboard-section">
          <h2>Recent Activity</h2>

          <div className="activity-box">
            {activities.map((activity, index) => (
              <p key={index}>{activity}</p>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}

export default Dashboard
