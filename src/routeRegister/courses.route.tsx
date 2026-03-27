import { Route } from "react-router-dom"
import CourseListPage from "../lecturer/courseList/courseList.page"
import AddSubjectChild from "../lecturer/courseList/subPages/addSubjectChild"
import OpenClassChild from "../lecturer/courseList/subPages/openClassChild"
import TimelineChild from "../lecturer/courseList/subPages/timelineChild"

export const CoursesRoutes = (
    <>
        <Route path='courses' element={<CourseListPage />}>
            <Route index element={<TimelineChild />} />
            <Route path='timeline' element={<TimelineChild />} />
            <Route path='subjects' element={<AddSubjectChild />} />
            <Route path='open-class' element={<OpenClassChild />} />
        </Route>
    </>
)