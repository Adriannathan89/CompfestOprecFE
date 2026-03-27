import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import AuthPage from './auth/auth.page'
import StudentProtectedPage from './student/student-protected.page'
import StudentDashboardPage from './student/dashboard/dashboard.page'
import LecturerProtectedPage from './lecturer/lecturer-proteced.page'
import LecturerDashboardPage from './lecturer/dashboard/lecturer-dashboard.page'
import { CoursesRoutes }  from './routeRegister/courses.route'
import { SubjectRoutes } from './routeRegister/subject.route'
import { ClassRoutes } from './routeRegister/class.route'
import { IRSRoutes } from './routeRegister/irs.route'
import { AcademicRoutes } from './routeRegister/academic.route'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} index />
        <Route path="/login" element={<AuthPage />} />

        <Route path='/student' element={<StudentProtectedPage />}>
          <Route index element={<StudentDashboardPage />} />
          { AcademicRoutes }
          { IRSRoutes }
        </Route>
        
        <Route path='/lecturer' element={<LecturerProtectedPage />}>
          <Route index element={<LecturerDashboardPage />} />
          { ClassRoutes }
          { SubjectRoutes }
          { CoursesRoutes }
          </Route>
      </Routes>
    </BrowserRouter>
  )
}