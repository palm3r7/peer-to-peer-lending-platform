
import './repayment.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Repayments() {

  const [filter, setFilter] = useState('All')

  const [repayments, setRepayments] = useState([
    {
      id: 1,
      amount: 10000,
      paid: 3000
    },
    {
      id: 2,
      amount: 5000,
      paid: 5000
    }
  ])

  // Calculate total amounts
  const totalAmount = repayments.reduce((total, loan) => {
    return total + loan.amount
  }, 0)

  const totalPaid = repayments.reduce((total, loan) => {
    return total + loan.paid
  }, 0)

  const balance = totalAmount - totalPaid

  // Filter repayments
  const filteredRepayments = repayments.filter((loan) => {
    const status = loan.paid === loan.amount ? 'Completed' : 'Ongoing'

    if (filter === 'All') {
      return true
    }

    return status === filter
  })

  // Record a sample payment
  function handlePayment(id) {
    const updatedRepayments = repayments.map((loan) => {
      if (loan.id === id) {
        const remaining = loan.amount - loan.paid

        return {
          ...loan,
          paid: loan.paid + Math.min(1000, remaining)
        }
      }

      return loan
    })

    setRepayments(updatedRepayments)
  }

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

        {/* Repayment Summary */}
        <div className="repayment-summary">

          <div className="repayment-summary-card">
            <h3>Total Loan Amount</h3>
            <h2>KSh {totalAmount.toLocaleString()}</h2>
          </div>

          <div className="repayment-summary-card">
            <h3>Amount Paid</h3>
            <h2>KSh {totalPaid.toLocaleString()}</h2>
          </div>

          <div className="repayment-summary-card">
            <h3>Outstanding Balance</h3>
            <h2>KSh {balance.toLocaleString()}</h2>
          </div>

        </div>

        <div className="repayments-content">

          <h2>My Loan Repayments</h2>

          {/* Filter */}
          <div className="repayment-filter">

            <label>Filter by Status:</label>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Repayments</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>

          </div>

          {filteredRepayments.map((loan) => {

            const remaining = loan.amount - loan.paid

            const status = remaining === 0 ? 'Completed' : 'Ongoing'

            return (
              <div className="repayment-card" key={loan.id}>

                <h3>Loan Repayment {loan.id}</h3>

                <p>
                  Loan Amount: KSh {loan.amount.toLocaleString()}
                </p>

                <p>
                  Amount Paid: KSh {loan.paid.toLocaleString()}
                </p>

                <p>
                  Balance: KSh {remaining.toLocaleString()}
                </p>

                <p>
                  Status: {status}
                </p>

                {remaining > 0 && (
                  <button
                    className="repayment-button"
                    onClick={() => handlePayment(loan.id)}
                  >
                    Record KSh 1,000 Payment
                  </button>
                )}

              </div>
            )
          })}

          {filteredRepayments.length === 0 && (
            <p>No repayment records found.</p>
          )}

        </div>

      </main>
    </div>
  )
}

export default Repayments


