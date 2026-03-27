import { Route } from "react-router-dom"
import IRSPage from "../student/IRS/IRS.page"
import ChangeIrsChild from "../student/IRS/subpages/changeIrsChild"
import ViewIrsChild from "../student/IRS/subpages/viewIrsChild"
import DropIrsChild from "../student/IRS/subpages/dropIrsChild"
import RootIrsChild from "../student/IRS/subpages/rootIrsChild"

export const IRSRoutes = (
    <>
        <Route path='irs' element={<IRSPage />}>
            <Route index element={<RootIrsChild />} />
            <Route path='change' element={<ChangeIrsChild />} />
            <Route path='view' element={<ViewIrsChild />} />
            <Route path='drop' element={<DropIrsChild />} />
        </Route>
    </>
)