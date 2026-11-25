
import './repayment.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Repayments() {

  const [repayments, setRepayments] = useState([])
  const [paymentAmounts, setPaymentAmounts] = useState({})
  const [paymentHistory, setPaymentHistory] = useState([])

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  function fetchRepayments() {

    if (user) {

      fetch(`http://localhost/peer%20to%20peer%20lending%20platform/backend/getrepayments.php?user_id=${user.user_id}`)
        .then(response => response.json())
        .then(data => setRepayments(data))
        .catch(error => console.log('Error fetching repayments:', error))

      fetch(`http://localhost/peer%20to%20peer%20lending%20platform/backend/getpaymenthistory.php?user_id=${user.user_id}`)
        .then(response => response.json())
        .then(data => setPaymentHistory(data))
        .catch(error => console.log('Error fetching payment history:', error))

    }

  }

  useEffect(() => {
    fetchRepayments()
  }, [])

  const totalBorrowed = repayments.reduce(
    (total, loan) => total + Number(loan.amount), 0
  )

  const totalPaid = repayments.reduce(
    (total, loan) => total + Number(loan.paid), 0
  )

  const totalBalance = totalBorrowed - totalPaid

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/')
  }

  function handlePayment(loanId) {

    const amount = Number(paymentAmounts[loanId])

    if (!amount || amount <= 0) {
      alert('Please enter a valid payment amount')
      return
    }

    fetch('http://localhost/peer%20to%20peer%20lending%20platform/backend/addrepayment.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        loan_id: loanId,
        amount_paid: amount
      })
    })
      .then(response => response.json())
      .then(data => {

        alert(data.message)

        if (data.message === 'Payment recorded successfully') {

          setPaymentAmounts({
            ...paymentAmounts,
            [loanId]: ''
          })

          fetchRepayments()

        }

      })
      .catch(error => console.log('Error recording payment:', error))

  }

  return (
    <div className="repayments-container">

      <aside className="repayments-sidebar">

        <h2>PeerLend</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/browseloans">Browse Loan Requests</Link>
          <Link to="/requestloan">Request Loan</Link>
          <Link to="/myloans">My Borrowing</Link>
          <Link to="/mylending">My Lending</Link>
          <Link to="/repayment">Repayments</Link>
          <Link to="/profile">Profile</Link>
        </nav>

        <button className="repayments-logout" onClick={handleLogout}>
          Logout
        </button>

      </aside>

      <main className="repayments-main">

        <h1>Repayments</h1>

        <p>View and record your loan repayments.</p>

        <div className="repayments-summary">

          <div className="repayment-card">
            <h3>Total Borrowed</h3>
            <p>KSh {totalBorrowed.toLocaleString()}</p>
          </div>

          <div className="repayment-card">
            <h3>Total Paid</h3>
            <p>KSh {totalPaid.toLocaleString()}</p>
          </div>

          <div className="repayment-card">
            <h3>Remaining Balance</h3>
            <p>KSh {totalBalance.toLocaleString()}</p>
          </div>

        </div>

        <div className="repayments-list">

          <h2>Loan Repayment Details</h2>

          {repayments.length === 0 ? (

            <p>You have no active loans to repay.</p>

          ) : (

            repayments.map(loan => (

              <div className="repayment-item" key={loan.loan_id}>

                <h3>Loan #{loan.loan_id}</h3>

                <p>
                  Loan Amount: KSh {Number(loan.amount).toLocaleString()}
                </p>

                <p>
                  Amount Paid: KSh {Number(loan.paid).toLocaleString()}
                </p>

                <p>
                  Balance: KSh {
                    (Number(loan.amount) - Number(loan.paid)).toLocaleString()
                  }
                </p>

                {Number(loan.amount) > Number(loan.paid) && (

                  <div>
                    <input
                      type="number"
                      placeholder="Enter payment amount"
                      value={paymentAmounts[loan.loan_id] || ''}
                      onChange={(e) => setPaymentAmounts({
                        ...paymentAmounts,
                        [loan.loan_id]: e.target.value
                      })}
                    />

                    <button onClick={() => handlePayment(loan.loan_id)}>
                      Record Payment
                    </button>
                  </div>

                )}

                {Number(loan.amount) <= Number(loan.paid) && (
                  <p>Loan fully repaid.</p>
                )}

              </div>

            ))

          )}

        </div>

        <div className="payment-history">

          <h2>Payment History</h2>

          {paymentHistory.length === 0 ? (

            <p>No payments have been recorded yet.</p>

          ) : (

            paymentHistory.map(payment => (

              <div className="payment-history-item" key={payment.repayment_id}>

                <h3>Loan #{payment.loan_id}</h3>

                <p>
                  Amount Paid: KSh {Number(payment.amount_paid).toLocaleString()}
                </p>

                <p>Payment Date: {payment.payment_date}</p>

              </div>

            ))

          )}

        </div>

      </main>

    </div>
  )
}

export default Repayments


