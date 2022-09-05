import { Routes, Route } from 'react-router-dom'
import { Home } from '../../../pages/Home/Home'
// import { About } from "../../Pages/About/About";
import { NoPage } from '../../../pages/NoPage';


export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            {/* <Route path='/about' element={<About />} /> */}
            <Route path='*' element={<NoPage />} />
        </Routes>
    )
}