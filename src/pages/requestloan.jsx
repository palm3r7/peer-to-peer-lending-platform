
import './requestloan.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function RequestLoan() {

  const [amount, setAmount] = useState('')
  const [purpose, setPurpose] = useState('')
  const [period, setPeriod] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    setMessage('Your loan request has been submitted successfully!')

    console.log({
      amount,
      purpose,
      period,
      description
    })
  }

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

          <form onSubmit={handleSubmit}>

            <div className="request-form-group">
              <label>Amount Required (KSh)</label>
              <input
                type="number"
                placeholder="e.g. 5000"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="request-form-group">
              <label>Purpose of Loan</label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
              >
                <option value="">Select purpose</option>
                <option>Education</option>
                <option>Business</option>
                <option>Personal Expenses</option>
                <option>Emergency</option>
                <option>Other</option>
              </select>
            </div>

            <div className="request-form-group">
              <label>Repayment Period</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                required
              >
                <option value="">Select repayment period</option>
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-request">
              Submit Loan Request
            </button>

          </form>

          <p>{message}</p>

        </div>

      </main>
    </div>
  )
}

export default RequestLoan

