import FooterLogo from '../../../Assets/Images/SmallLogo.svg'
import TwitterIcon from '../../../Assets/Images/TwitterIcon.svg'
import FacebookIcon from '../../../Assets/Images/FacebookIcon.svg'
import './Footer.scss';


export const Footer = () => {
    return (
        <footer>
            <article id='FooterContact'>
                <img src={FooterLogo} alt="HomeLands-Logo" />
                <div>
                    <p>Øster Uttrupvej 5</p>
                    <p>9000 Aalborg</p>
                </div>
                <div>
                    <a href='mailto:info$homelands.dk'>Email: info@homelands.dk</a>
                    <a href='tel:11-22-33-44'>Telefon: +45 11 22 33 44</a>
                </div>
            </article>
            <article id='FooterSocialMedia'>
                <a href="https://www.twitter.com" target='_blank' rel="noreferrer"><img src={TwitterIcon} alt="twitter-icon" /></a>
                <a href="https://www.facebook.com" target='_blank' rel="noreferrer"><img src={FacebookIcon} alt="facebook-icon" /></a>
            </article>
        </footer>
    )
}