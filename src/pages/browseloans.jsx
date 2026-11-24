
import './browseloans.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function BrowseLoans() {

  const [selectedLoan, setSelectedLoan] = useState('')

  const loans = [
    {
      id: 1,
      borrower: 'John Kamau',
      amount: 5000,
      purpose: 'Education',
      period: '3 Months'
    },
    {
      id: 2,
      borrower: 'Mary Wanjiku',
      amount: 10000,
      purpose: 'Business',
      period: '6 Months'
    },
    {
      id: 3,
      borrower: 'Peter Otieno',
      amount: 3000,
      purpose: 'Personal Expenses',
      period: '2 Months'
    }
  ]

  function handleSelect(id) {
    setSelectedLoan(id)
  }

  return (
    <div className="browse-container">

      {/* Sidebar */}
      <aside className="browseloans-sidebar">
        <h2>PeerLend</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/browse-loans" className="active">Browse Loan Requests</Link>
          <Link to="/request-loan">Request a Loan</Link>
          <Link to="/my-loans">My Borrowing</Link>
          <Link to="/my-lending">My Lending</Link>
          <Link to="/repayments">Repayments</Link>
          <Link to="/profile">My Profile</Link>
        </nav>

        <button className="browseloans-logout">Logout</button>

      </aside>

      {/* Main Content */}
      <main className="lending-main">

        <h1>Browse Loan Requests</h1>
        <p>View loan requests from borrowers and choose one to fund.</p>

        <div className="lending-content">

          <h2>Available Loan Requests</h2>

          <table>
            <thead>
              <tr>
                <th>Borrower</th>
                <th>Amount Required</th>
                <th>Purpose</th>
                <th>Repayment Period</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.borrower}</td>
                  <td>KSh {loan.amount}</td>
                  <td>{loan.purpose}</td>
                  <td>{loan.period}</td>
                  <td>
                    <button onClick={() => handleSelect(loan.id)}>
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          {selectedLoan !== '' && (
            <p> You selected loan request number {selectedLoan}. </p>
          )}

        </div>

      </main>
    </div>
  )
}

export default BrowseLoans

