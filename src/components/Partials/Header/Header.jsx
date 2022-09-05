import { Nav } from "../Nav/Nav"
import { BurgerMenu } from '../../App/BurgerMenu/BurgerMenu'
import HeaderShape from '../../../Assets/Images/Header.svg'

export const Header = () => {
    return (
        <header>
            <BurgerMenu />
            <Nav />
            <img src={HeaderShape} alt="the-dark-background-image-defining-the-shape" />
        </header>
    )
}