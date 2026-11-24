
import { Link } from "react-router-dom";
import { useState } from "react";
import "./myloans.css";

function MyLoans() {

  const [filter, setFilter] = useState("All");

  const loans = [
    {
      id: 1,
      amount: 10000,
      purpose: "School Fees",
      period: "3 Months",
      date: "10 Nov 2026",
      status: "Pending",
    },
    {
      id: 2,
      amount: 15000,
      purpose: "Business",
      period: "6 Months",
      date: "05 Nov 2026",
      status: "Approved",
    },
    {
      id: 3,
      amount: 5000,
      purpose: "Personal Expenses",
      period: "2 Months",
      date: "01 Nov 2026",
      status: "Rejected",
    },
  ];

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
          <Link to="/browse-loans">Browse Loan Requests</Link>
          <Link to="/request-loan">Request a Loan</Link>
          <Link to="/my-loans" className="active">My Borrowing</Link>
          <Link to="/my-lending">My Lending</Link>
          <Link to="/repayments">Repayments</Link>
          <Link to="/profile">My Profile</Link>
        </nav>

        <button className="myloans-logout">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="my-loans-main">

        <header className="loans-header">
          <div>
            <h1>My Loans</h1>
            <p>Track and manage your loan applications.</p>
          </div>

          <Link to="/request-loan" className="new-loan-btn">
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
                <tr key={loan.id}>
                  <td>#{loan.id}</td>
                  <td>KSh {loan.amount.toLocaleString()}</td>
                  <td>{loan.purpose}</td>
                  <td>{loan.period}</td>
                  <td>{loan.date}</td>

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


