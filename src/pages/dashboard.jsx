import './dashboard.css'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>PeerLend</h2>

        <nav>
          <Link to="/dashboard" className="active">Dashboard</Link>
          <Link to="/browse-loans">Browse Loan Requests</Link>
          <Link to="/request-loan">Request a Loan</Link>
          <Link to="/my-borrowing">My Borrowing</Link>
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
            <h2>KSh 0</h2>
            <span>Amount borrowed</span>
          </div>

          <div className="summary-card">
            <p>Total Lent</p>
            <h2>KSh 0</h2>
            <span>Amount lent</span>
          </div>

          <div className="summary-card">
            <p>Active Loans</p>
            <h2>0</h2>
            <span>Currently active</span>
          </div>

          <div className="summary-card">
            <p>Pending Requests</p>
            <h2>0</h2>
            <span>Awaiting approval</span>
          </div>

        </section>

        {/* Quick Actions */}
        <section className="dashboard-section">
          <h2>Quick Actions</h2>

          <div className="quick-actions">
            <button>+ Request a Loan</button>
            <button>Browse Loan Requests</button>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="dashboard-section">
          <h2>Recent Activity</h2>

          <div className="activity-box">
            <p>No recent activity yet.</p>
          </div>
        </section>

      </main>
    </div>
  )
}

export default Dashboard
