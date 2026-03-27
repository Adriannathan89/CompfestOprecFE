import { Route } from "react-router-dom"
import AddSubjectPage from "../lecturer/Subject/addSubject.page"
import SubjectDetailedPage from "../lecturer/Subject/subjectDetailed.page"

export const SubjectRoutes = (
    <>
        <Route path='subject/new' element={<AddSubjectPage />} />
        <Route path='subject/:subjectId' element={<SubjectDetailedPage />} />
    </>
)