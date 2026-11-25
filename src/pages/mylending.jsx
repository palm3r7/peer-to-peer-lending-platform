
import './mylending.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function MyLending() {

  const [filter, setFilter] = useState('All')
  const [lending, setLending] = useState([])

  const navigate = useNavigate()

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
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

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/')
  }

  const filteredLending = lending.filter((loan) => {
    if (filter === 'All') {
      return true
    }

    return loan.status === filter
  })

  const totalLent = lending.reduce((total, loan) => {
    return total + Number(loan.amount)
  }, 0)

  return (
    <div className="mylend-container">

      {/* Sidebar */}
      <aside className="mylending-sidebar">

        <h2>PeerLend</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/browseloans">Browse Loan Requests</Link>
          <Link to="/requestloan">Request a Loan</Link>
          <Link to="/myloans">My Borrowing</Link>
          <Link to="/mylending" className="active">My Lending</Link>
          <Link to="/repayment">Repayments</Link>
          <Link to="/profile">My Profile</Link>
        </nav>

        <button
          className="mylending-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

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
                <th>Date Created</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredLending.map((loan) => (

                <tr key={loan.loan_id}>

                  <td>{loan.borrower_name}</td>

                  <td>
                    KSh {Number(loan.amount).toLocaleString()}
                  </td>

                  <td>{loan.interest_rate}%</td>

                  <td>{loan.repayment_period} months</td>

                  <td>{loan.created_at}</td>

                  <td>
                    <span className={`lending-status ${loan.status.toLowerCase()}`}>
                      {loan.status}
                    </span>
                  </td>

                </tr>

              ))}

              {filteredLending.length === 0 && (

                <tr>
                  <td colSpan="6">No lending records found.</td>
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
