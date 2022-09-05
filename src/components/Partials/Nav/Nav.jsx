import { NavLink } from "react-router-dom"
import Logo from '../../../Assets/Images/Logo.svg'
import './Nav.scss'

export const Nav = () => {
    return (
        <nav>
            <ul>
                {/* <img src={Logo} alt="Logo" /> */}
                <li><NavLink to={'/'}>Home</NavLink></li>
                <li><NavLink to={'/login'}>Login</NavLink></li>
            </ul>
        </nav>
    )
}