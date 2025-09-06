import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Index'
import { AppProvider } from './context/AppContext'
import AuthProvider from './context/AuthContext'
import CreateTeam from './pages/apply/CreateTeam'
import LoginPage from './pages/login/Login'
import Team from './pages/apply/Team'
import Layout from './Layout'
import InviteJoin from './pages/apply/InviteJoin'
import ForgotPassword from './pages/forgotpassword/Index'
import ResetPassword from './pages/resetpassword/Index'
import SignUp from './pages/signup/Index'
import Timeline from './pages/timeline/Index'
import Announcement from './pages/announcement/Index'
import ProblemStatement from './pages/problemstatememt/Index'
import Resources from './pages/resources/Index'
import Sessions from './pages/sessions/Index'
import Mentors from './pages/mentors/Index'
import ContactUs from './pages/contactus/Index'
function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/apply' element={<CreateTeam />} />
            <Route path='/team' element={<Team />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/invite/:token' element={<InviteJoin />} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
            <Route path='/reset-password' element={<ResetPassword/>} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/timeline' element={<Timeline/>} />
            <Route path='/announcements' element={<Announcement/>} />
            <Route path='/problem-statement' element={<ProblemStatement/>} />
            <Route path='/resources' element={<Resources/>} />
            <Route path='/sessions' element={<Sessions/>} />
            <Route path='/mentors' element={<Mentors/>} />
            <Route path='/mentors' element={<Mentors/>} />
            <Route path='/contact-us' element={<ContactUs/>} />
          </Routes>
          </Layout>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  )
}

export default App
