
import './mylending.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function MyLending() {

  const [filter, setFilter] = useState('All')

  const lending = [
    {
      id: 1,
      borrower: 'John Kamau',
      amount: 5000,
      interest: '10%',
      period: '3 Months',
      status: 'Active'
    },
    {
      id: 2,
      borrower: 'Mary Wanjiku',
      amount: 8000,
      interest: '12%',
      period: '6 Months',
      status: 'Completed'
    },
    {
      id: 3,
      borrower: 'Peter Otieno',
      amount: 3000,
      interest: '8%',
      period: '2 Months',
      status: 'Pending'
    }
  ]

  const filteredLending = lending.filter((loan) => {
    if (filter === 'All') {
      return true
    }

    return loan.status === filter
  })

  const totalLent = lending.reduce((total, loan) => {
    return total + loan.amount
  }, 0)

  return (
    <div className="mylend-container">

      {/* Sidebar */}
      <aside className="mylending-sidebar">
        <h2>PeerLend</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/browse-loans">Browse Loan Requests</Link>
          <Link to="/request-loan">Request a Loan</Link>
          <Link to="/my-loans">My Borrowing</Link>
          <Link to="/my-lending" className="active">My Lending</Link>
          <Link to="/repayments">Repayments</Link>
          <Link to="/profile">My Profile</Link>
        </nav>

        <button className="mylending-logout">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="lending-main">

        <h1>My Lending</h1>
        <p>View the loan requests you have funded.</p>

        {/* Lending Summary */}
        <div className="lending-summary">

          <div className="lending-summary-card">
            <h3>Total Amount Lent</h3>
            <h2>KSh {totalLent.toLocaleString()}</h2>
          </div>

          <div className="lending-summary-card">
            <h3>Total Lending Records</h3>
            <h2>{lending.length}</h2>
          </div>

        </div>

        <div className="lending-content">

          <h2>My Lending Activities</h2>

          {/* Filter */}
          <div className="lending-filter">
            <label>Filter by Status:</label>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Records</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <table>
            <thead>
              <tr>
                <th>Borrower</th>
                <th>Amount Lent</th>
                <th>Interest Rate</th>
                <th>Repayment Period</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredLending.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.borrower}</td>
                  <td>KSh {loan.amount.toLocaleString()}</td>
                  <td>{loan.interest}</td>
                  <td>{loan.period}</td>
                  <td>
                    <span className={`lending-status ${loan.status.toLowerCase()}`}>
                      {loan.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredLending.length === 0 && (
                <tr>
                  <td colSpan="5">No lending records found.</td>
                </tr>
              )}
            </tbody>
          </table>

        </div>

      </main>
    </div>
  )
}

export default MyLending
