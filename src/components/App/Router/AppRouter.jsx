import { Routes, Route } from 'react-router-dom'
import { ForSaleList } from '../../pages/ForSale/ForSaleList';
import { Home } from '../../pages/Home/Home'
import { Login } from "../../pages/Login/Login";
import { NoPage } from '../../pages/NoPage';


export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path='/forsalelist' element={<ForSaleList />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NoPage />} />
        </Routes>
    )
}