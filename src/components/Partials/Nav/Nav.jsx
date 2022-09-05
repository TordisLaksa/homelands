import { NavLink } from "react-router-dom"

export const Nav = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to={'/'}>Home</NavLink></li>
                {/* <li><NavLink to={'/about'}>About</NavLink></li> */}
            </ul>
        </nav>
    )
}