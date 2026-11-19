import './requestloan.css'
import { Link } from 'react-router-dom'

function RequestLoan() {
  return (
    <div className="request-container">

      {/* Sidebar */}
      <aside className="request-sidebar">
        <h2>PeerLend</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/browse-loans">Browse Loan Requests</Link>
          <Link to="/request-loan" className="active">Request a Loan</Link>
          <Link to="/my-borrowing">My Borrowing</Link>
          <Link to="/my-lending">My Lending</Link>
          <Link to="/repayments">Repayments</Link>
          <Link to="/profile">My Profile</Link>
        </nav>

        <button className="request-logout">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="request-main">

        <header className="request-header">
          <div>
            <h1>Request a Loan</h1>
            <p>Fill in the details below to submit your loan request.</p>
          </div>
        </header>

        <div className="request-card">

          <h2>Loan Details</h2>
          <p className="request-description">
            Provide accurate information about the amount you need.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>

            <div className="request-form-group">
              <label>Amount Required (KSh)</label>
              <input
                type="number"
                placeholder="e.g. 5000"
                min="1"
                required
              />
            </div>

            <div className="request-form-group">
              <label>Purpose of Loan</label>
              <select required defaultValue="">
                <option value="" disabled>Select purpose</option>
                <option>Education</option>
                <option>Business</option>
                <option>Personal Expenses</option>
                <option>Emergency</option>
                <option>Other</option>
              </select>
            </div>

            <div className="request-form-group">
              <label>Repayment Period</label>
              <select required defaultValue="">
                <option value="" disabled>Select repayment period</option>
                <option value="1">1 Month</option>
                <option value="2">2 Months</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </select>
            </div>

            <div className="request-form-group">
              <label>Description</label>
              <textarea
                rows="5"
                placeholder="Explain why you need this loan..."
                required
              />
            </div>

            <button type="submit" className="submit-request">
              Submit Loan Request
            </button>

          </form>
        </div>

      </main>
    </div>
  )
}

export default RequestLoan
