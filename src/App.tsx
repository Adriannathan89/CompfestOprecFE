import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import AuthPage from './auth/auth.page'
import StudentProtectedPage from './student/student-protected.page'
import LecturerProtectedPage from './lecturer/lecturer-proteced.page'
import LecturerDashboardPage from './lecturer/dashboard/lecturer-dashboard.page'
import CourseListPage from './lecturer/courseList/courseList.page'
import AddSubjectChild from './lecturer/courseList/subPages/addSubjectChild'
import AddSubjectPage from './lecturer/addSubject/addSubject.page'
import OpenClassChild from './lecturer/courseList/subPages/openClassChild'
import MyClassChild from './lecturer/courseList/subPages/myClassChild'
import NewClassPage from './lecturer/newClass/newClass.page'
import StudentDashboardPage from './student/dashboard/dashboard.page'
import AcademicPage from './student/academic/academic.page'
import IRSPage from './student/IRS/IRS.page'
import ChangeIrsChild from './student/IRS/subpages/changeIrsChild'
import ViewIrsChild from './student/IRS/subpages/viewIrsChild'
import DropIrsChild from './student/IRS/subpages/dropIrsChild'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/login" element={<AuthPage />} />

        <Route path='/student' element={<StudentProtectedPage />}>
          <Route path='' element={<StudentDashboardPage />} index />
          <Route path='academic' element={<AcademicPage />} />
          <Route path='irs' element={<IRSPage />}>
            <Route path='change' element={<ChangeIrsChild />} />
            <Route path='view' element={<ViewIrsChild />} />
            <Route path='drop' element={<DropIrsChild />} />
          </Route>
        </Route>

        <Route path='/lecturer' element={<LecturerProtectedPage />}>
          <Route path='' element={<LecturerDashboardPage />} index />
          <Route path='add-subject' element={<AddSubjectPage />} />
          <Route path='class/new' element={<NewClassPage />} />

          <Route path='courses' element={<CourseListPage />}>
            <Route path='' element={<MyClassChild />} index />
            <Route path='subjects' element={<AddSubjectChild />} />
            <Route path='open-class' element={<OpenClassChild />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}