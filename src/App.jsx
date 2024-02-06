
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


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Courses/CourseList' element={<CourseList />} />
          <Route path='/Courses/Categories' element={<CourseCategory />} />
          <Route path='/Enrollment/List' element={<EnrollmentList />} />
          <Route path='/Course/Enrollment' element={<EnrollmentCourse />} />
          <Route path='/Assessment/List' element={<AssessmentList />} />
          <Route path='/Certificate' element={<Certificate />} />

          <Route path='/Users' element={<User />} />
          <Route path='*' element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
