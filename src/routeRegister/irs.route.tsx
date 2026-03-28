import { Route } from "react-router-dom"
import IRSPage from "../student/IRS/IRS.page"
import ChangeIrsChild from "../student/IRS/subpages/changeIrsChild"
import RootIrsChild from "../student/IRS/subpages/rootIrsChild"
import FinalizeIrsChild from "@/student/IRS/subpages/finalizeChild"

export const IRSRoutes = (
    <>
        <Route path='irs' element={<IRSPage />}>
            <Route index element={<RootIrsChild />} />
            <Route path='change' element={<ChangeIrsChild />} />
            <Route path='finalize' element={<FinalizeIrsChild />} />
        </Route>
    </>
)