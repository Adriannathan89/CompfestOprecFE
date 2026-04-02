import { Route } from "react-router-dom";
import StudentFormDetailPage from "../lecturer/studentForms/studentFormDetailPage";
import InputStudentScoreFormChild from "@/lecturer/studentForms/subPages/inputStudentScoreChild";

export const StudentFormRoutes = (
    <>
        <Route path='student-form/:studentTakingFormId' element={<StudentFormDetailPage />}>
            <Route index element={<InputStudentScoreFormChild />} />
        </Route>
    </>
)