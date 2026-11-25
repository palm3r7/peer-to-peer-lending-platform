
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./myloans.css";

function MyLoans() {

  const [filter, setFilter] = useState("All");
  const [loans, setLoans] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {

      fetch(`http://localhost/peer%20to%20peer%20lending%20platform/backend/getmyloans.php?user_id=${user.user_id}`)
        .then(response => response.json())
        .then(data => {
          setLoans(data);
        })
        .catch(error => {
          console.log("Error fetching loans:", error);
        });

    }

  }, []);

  function handleLogout() {
    localStorage.removeItem('user');
    navigate('/');
  }

  const filteredLoans = loans.filter((loan) => {
    if (filter === "All") {
      return true;
    }

    return loan.status === filter;
  });

  return (
    <div className="myloan-container">

      {/* Sidebar */}
      <aside className="myloans-sidebar">

        <h2>PeerLend</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/browseloans">Browse Loan Requests</Link>
          <Link to="/requestloan">Request a Loan</Link>
          <Link to="/myloans" className="active">My Borrowing</Link>
          <Link to="/mylending">My Lending</Link>
          <Link to="/repayment">Repayments</Link>
          <Link to="/profile">My Profile</Link>
        </nav>

        <button
          className="myloans-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="my-loans-main">

        <header className="loans-header">

          <div>
            <h1>My Loans</h1>
            <p>Track and manage your loan applications.</p>
          </div>

          <Link to="/requestloan" className="new-loan-btn">
            + Request New Loan
          </Link>

        </header>

        {/* Loan Summary */}
        <div className="loan-summary">

          <div className="summary-card">
            <h3>Total Applications</h3>
            <h2>{loans.length}</h2>
          </div>

          <div className="summary-card">
            <h3>Pending</h3>
            <h2>
              {loans.filter(loan => loan.status === "Pending").length}
            </h2>
          </div>

          <div className="summary-card">
            <h3>Approved</h3>
            <h2>
              {loans.filter(loan => loan.status === "Approved").length}
            </h2>
          </div>

        </div>

        {/* Loan Applications Table */}
        <div className="loans-table-container">

          <h2>Loan Applications</h2>

          <div className="loan-filter">

            <label>Filter by Status:</label>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Loans</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

          </div>

          <table>

            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Period</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredLoans.map((loan) => (

                <tr key={loan.request_id}>

                  <td>#{loan.request_id}</td>

                  <td>
                    KSh {Number(loan.amount).toLocaleString()}
                  </td>

                  <td>{loan.purpose}</td>

                  <td>{loan.repayment_period} months</td>

                  <td>{loan.created_at}</td>

                  <td>
                    <span className={`loan-status ${loan.status.toLowerCase()}`}>
                      {loan.status}
                    </span>
                  </td>

                </tr>

              ))}

              {filteredLoans.length === 0 && (

                <tr>
                  <td colSpan="6">No loan applications found.</td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

export default MyLoans;
