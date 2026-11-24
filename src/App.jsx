import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import RequestLoan from './pages/requestloan'
import MyLoans from "./pages/myloans";
import BrowseLoans from './pages/browseloans'
import Repayments from './pages/repayments'
import Profile from './Profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/requestloan" element={<RequestLoan />} />
      <Route path="/myloans" element={<MyLoans />} />
      <Route path="/browseloans" element={<BrowseLoans />} />
      <Route path="/repayments" element={<Repayments />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
