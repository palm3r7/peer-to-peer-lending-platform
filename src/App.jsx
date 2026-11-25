import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import RequestLoan from './pages/requestloan'
import MyLoans from './pages/myloans'
import BrowseLoans from './pages/browseloans'
import MyLending from './pages/mylending'
import Repayment from './pages/repayment'
import Profile from './pages/profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/requestloan" element={<RequestLoan />} />
      <Route path="/myloans" element={<MyLoans />} />
      <Route path="/browseloans" element={<BrowseLoans />} />
      <Route path="/mylending" element={<MyLending />} />
      <Route path="/repayment" element={<Repayment />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App

