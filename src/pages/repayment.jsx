
import './repayment.css'
import { Link } from 'react-router-dom'

function Repayments() {
  return (
    <div className="repayments-container">

      {/* Sidebar */}
      <aside className="repayments-sidebar">
        <h2>PeerLend</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/browse-loans">Browse Loan Requests</Link>
          <Link to="/request-loan">Request a Loan</Link>
          <Link to="/my-loans">My Borrowing</Link>
          <Link to="/my-lending">My Lending</Link>
          <Link to="/repayments" className="active">Repayments</Link>
          <Link to="/profile">My Profile</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="repayments-main">

        <h1>Repayments</h1>
        <p>View and manage your loan repayments.</p>

        <div className="repayments-content">

          <div className="repayment-card">
            <h3>Loan Repayment 1</h3>
            <p>Loan Amount: Ksh 10,000</p>
            <p>Amount Paid: Ksh 3,000</p>
            <p>Balance: Ksh 7,000</p>
            <p>Status: Ongoing</p>
          </div>

          <div className="repayment-card">
            <h3>Loan Repayment 2</h3>
            <p>Loan Amount: Ksh 5,000</p>
            <p>Amount Paid: Ksh 5,000</p>
            <p>Balance: Ksh 0</p>
            <p>Status: Completed</p>
          </div>

        </div>

      </main>

    </div>
  )
}

export default Repayments

