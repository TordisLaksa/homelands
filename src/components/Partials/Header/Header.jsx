import { Nav } from "../Nav/Nav"
import { BurgerMenu } from '../../App/BurgerMenu/BurgerMenu'
import HeaderShape from '../../../Assets/Images/Header.svg'
import './Header.scss';

export const Header = () => {
    return (
        <header>
            <BurgerMenu />
            <Nav />
            <img id='headerShape' src={HeaderShape} alt="the-dark-background-defining-the-shape" />
        </header>
    )
}