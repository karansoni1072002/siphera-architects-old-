import './App.css'
import { Routes, Route } from 'react-router-dom'
import AdminLoginPage from './pages/AdminPages/AdminLoginPage'
import PublicNavbar from './components/PublicComponents/PublicNavbar'
import HomePage from './pages/PublicPages/HomePage'
import ContactPage from './pages/PublicPages/ContactPage'
// import AdminRegisterPage from './components/AdminComponents/AdminRegisterPage'
function App() {

  return (
    <>
      <PublicNavbar />
      <Routes>
        <Route path='/login' element={<AdminLoginPage />} />
        {/* <Route path='/register' element={<AdminRegisterPage />} /> */}
        {/* <Route path='/' element={ } /> */}
        <Route path='/' element={<HomePage />} />
        <Route path='/contact' element={<ContactPage />} />
      </Routes>
    </>
  )
}

export default App
