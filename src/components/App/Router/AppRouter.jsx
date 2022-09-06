import { Routes, Route } from 'react-router-dom'
import { ForSaleList } from '../../pages/ForSale/ForSaleList';
import { ForSaleDetails } from '../../pages/ForSale/ForSaleDetails';
import { Home } from '../../pages/Home/Home'
import { Login } from "../../pages/Login/Login";
import { NoPage } from '../../pages/NoPage';


export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path='/forsalelist'>
                <Route index element={<ForSaleList />}></Route>
                <Route path=':home_id' element={<ForSaleDetails />}></Route>
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NoPage />} />
        </Routes>
    )
}