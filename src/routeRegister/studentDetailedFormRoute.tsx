import StudentTakingClassFormDetailPage from "@/student/studentForm/studentTakingClassFormDetail.page"
import { Route } from "react-router"

export const StudentDetailedFormRoute = (
    <>
        <Route path="studentForm/:studentTakingFormId" element={<StudentTakingClassFormDetailPage />} />
    </>
)