
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Authentication/Login'

import User from './Pages/Dashboard/User'
import NotFound from "./Pages/NotFound/NotFound"
import Dashboard from './Pages/Dashboard/Dashboard'
import CourseList from './Pages/Courses/CourseList'
import CourseCategory from './Pages/Courses/CourseCategory'
import EnrollmentList from './Pages/Enrollment/EnrollmentList'
import EnrollmentCourse from './Pages/Enrollment/EnrollmentCourse'
import AssessmentList from './Pages/Assessment/AssessmentList'
import Certificate from './Pages/Certificate/Certificate'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import ProtectedWrapper from './Utils/ProtectedRoute'


function App() {


  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Routes>

          <Route path='/' element={<ProtectedWrapper><Dashboard /></ProtectedWrapper>} />
          <Route path='/login' element={<Login />} />
          <Route path='/Courses/CourseList' element={<ProtectedWrapper><CourseList /></ProtectedWrapper>} />
          <Route path='/Courses/Categories' element={<ProtectedWrapper><CourseCategory /></ProtectedWrapper>} />
          <Route path='/Enrollment/List' element={<ProtectedWrapper><EnrollmentList /></ProtectedWrapper>} />
          <Route path='/Course/Enrollment' element={<ProtectedWrapper><EnrollmentCourse /></ProtectedWrapper>} />
          <Route path='/Assessment/List' element={<ProtectedWrapper><AssessmentList /></ProtectedWrapper>} />
          <Route path='/Certificate' element={<ProtectedWrapper><Certificate /></ProtectedWrapper>} />

          <Route path='/Users' element={<ProtectedWrapper><User /></ProtectedWrapper>} />
          <Route path='*' element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
