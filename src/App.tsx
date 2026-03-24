import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './auth/auth.page'
import StudentProtectedPage from './student/student-protected.page'
import LecturerProtectedPage from './lecturer/lecturer-proteced.page'
import { Toaster } from 'sonner'
import LecturerDashboardPage from './lecturer/dashboard/lecturer-dashboard.page'
import CourseListPage from './lecturer/courseList/courseList.page'
import AddSubjectChild from './lecturer/courseList/subPages/addSubjectChild'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/login" element={<AuthPage />} />

        <Route path='/student' element={<StudentProtectedPage />}>

        </Route>

        <Route path='/lecturer' element={<LecturerProtectedPage />}>
          <Route path='' element={<LecturerDashboardPage />} index />

          <Route path='courses' element={<CourseListPage />}>
              <Route path='addSubject' element={<AddSubjectChild />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}