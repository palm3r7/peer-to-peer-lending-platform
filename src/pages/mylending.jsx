
import './mylending.css'
import { Link } from 'react-router-dom'

function MyLending() {
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

        <div className="lending-content">
          <h2>My Lending Activities</h2>

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
              <tr>
                <td>No lending records yet</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div>
  )
}

export default MyLending
