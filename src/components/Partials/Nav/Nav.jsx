import { NavLink } from "react-router-dom"
import Logo from '../../../Assets/Images/Logo.svg'
import { Search } from "../../pages/Search/Search"
import './Nav.scss'

export const Nav = () => {
    return (
        <nav>
            <img src={Logo} alt="HomeLands-logo" />
            <ul>
                <li><NavLink to={'/'}>Forside</NavLink></li>
                <li><NavLink to={'/forsalelist'}>Boliger til salg</NavLink></li>
                <li><NavLink to={'/login'}>Login</NavLink></li>
                <Search />
            </ul>
        </nav>
    )
}