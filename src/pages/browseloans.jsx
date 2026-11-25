
import './browseloans.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function BrowseLoans() {

  const [selectedLoan, setSelectedLoan] = useState('')
  const [loans, setLoans] = useState([])

  const navigate = useNavigate()

  useEffect(() => {

    fetch('http://localhost/peer%20to%20peer%20lending%20platform/backend/getloans.php')
      .then(response => response.json())
      .then(data => {
        setLoans(data)
      })
      .catch(error => {
        console.log('Error fetching loans:', error)
      })

  }, [])

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/')
  }

  function handleSelect(id) {

    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
      alert('Please log in first')
      return
    }

    fetch('http://localhost/peer%20to%20peer%20lending%20platform/backend/selectloan.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        request_id: id,
        lender_id: user.user_id
      })
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message)

        if (data.message === 'Loan selected successfully') {
          setSelectedLoan(id)

          // Refresh the loan requests
          fetch('http://localhost/peer%20to%20peer%20lending%20platform/backend/getloans.php')
            .then(response => response.json())
            .then(data => {
              setLoans(data)
            })
        }
      })
      .catch(error => {
        console.log('Error selecting loan:', error)
      })

  }

  return (
    <div className="browse-container">

      {/* Sidebar */}
      <aside className="browseloans-sidebar">
        <h2>PeerLend</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/browseloans" className="active">Browse Loan Requests</Link>
          <Link to="/requestloan">Request a Loan</Link>
          <Link to="/myloans">My Borrowing</Link>
          <Link to="/mylending">My Lending</Link>
          <Link to="/repayment">Repayments</Link>
          <Link to="/profile">My Profile</Link>
        </nav>

        <button
          className="browseloans-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

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
                <tr key={loan.request_id}>
                  <td>{loan.borrower_name}</td>
                  <td>KSh {loan.amount}</td>
                  <td>{loan.purpose}</td>
                  <td>{loan.repayment_period}</td>
                  <td>
                    <button onClick={() => handleSelect(loan.request_id)}>
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          {selectedLoan !== '' && (
            <p>
              You selected loan request number {selectedLoan}.
            </p>
          )}

        </div>

      </main>
    </div>
  )
}

export default BrowseLoans
