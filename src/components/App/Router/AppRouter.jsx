import { Routes, Route } from 'react-router-dom'
import { ForSaleList } from '../../pages/ForSale/ForSaleList';
import { ForSaleDetails } from '../../pages/ForSale/ForSaleDetails';
import { Home } from '../../pages/Home/Home'
import { Login } from "../../pages/Login/Login";
import { NoPage } from '../../pages/NoPage';
import { PutComment } from '../../pages/Login/PutComment';
import { SearchResult } from '../../pages/Search/SearchResult';



export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path='/forsalelist'>
                <Route index element={<ForSaleList />} />
                <Route path=':home_id' element={<ForSaleDetails />} />
            </Route>
            <Route path='/login'element={<Login />} />
            <Route path='/putcomment/:id' element={<PutComment />} />
            <Route path='/search' element={<SearchResult />} />
            <Route path='*' element={<NoPage />} />
        </Routes>
    )
}