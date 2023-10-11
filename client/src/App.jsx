import './App.css'
import { Routes, Route } from 'react-router-dom'
import AdminLoginPage from './pages/AdminPages/AdminLoginPage'
import PublicNavbar from './components/PublicComponents/PublicNavbar'
import HomePage from './pages/PublicPages/HomePage'
import ContactPage from './pages/PublicPages/ContactPage'
// import AdminRegisterPage from './components/AdminComponents/AdminRegisterPage'
import PortfolioCategoriesPage from './pages/PublicPages/PortfolioCategoriesPage'
import AdminCreateCategories from './pages/AdminPages/AdminCreateCategories'
import AdminAllCategories from './pages/AdminPages/AdminAllCategories'
import AdminRegisterPage from './pages/AdminPages/AdminRegisterPage'
import AdminCategoryShow from './pages/AdminPages/AdminCategoryShow'
import AdminAllProjects from './pages/AdminPages/AdminAllProjects'
import AdminCreateProjects from './pages/AdminPages/AdminCreateProjects'
import AdminProjectShow from './pages/AdminPages/AdminProjectShow'
import AdminDashboard from './pages/AdminPages/AdminDashboard'
import Test from './pages/PublicPages/Test'


function App() {

  return (
    <>
      <PublicNavbar />
      <Routes>
        <Route path='/admin/login' element={<AdminLoginPage />} />
        <Route path='/register' element={<AdminRegisterPage />} />
        {/* <Route path='/' element={ } /> */}
        <Route path='/' element={<HomePage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/portfolio' element={<PortfolioCategoriesPage />} />
        <Route path='/admin/category/new' element={<AdminCreateCategories />} />
        <Route path='/admin/category' element={<AdminAllCategories />} />
        <Route path='/admin/category/:categoryId' element={<AdminCategoryShow />} />
        <Route path='/admin/project' element={<AdminAllProjects />} />
        <Route path='/admin/project/new' element={<AdminCreateProjects />} />
        <Route path='/admin/project/:projectId' element={<AdminProjectShow />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </>
  )
}

export default App
