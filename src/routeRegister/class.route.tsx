import { Route } from "react-router-dom"
import DetailClassPage from "../lecturer/Class/detailClass.page"
import EditDetailClassChild from "../lecturer/Class/subPages/editDetailClassChild"
import NewClassPage from "../lecturer/Class/newClass.page"
import ClassParticipantsChild from "@/lecturer/Class/subPages/classParticipantsChild"
import EditClassScoringComponentSchild from "@/lecturer/Class/subPages/editClassScoringComponentSchild"

export const ClassRoutes = (
    <>
        <Route path='class/new' element={<NewClassPage />} />
        <Route path='class/:classId' element={<DetailClassPage />}>
            <Route index element={<EditDetailClassChild />} />
            <Route path='participants' element={<ClassParticipantsChild />} />
            <Route path='scoring-component' element={<EditClassScoringComponentSchild />} />
        </Route>
    </>
)