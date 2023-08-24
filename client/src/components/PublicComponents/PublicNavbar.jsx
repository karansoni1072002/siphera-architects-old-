import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'
import '../Stylesheets/Public.css'
import images from '../../assets/images'

const PublicNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg MyNavBar" >
            <div className="container-fluid" id='NavDiv' >
                <NavLink className="navbar-brand" id='BrandLogo' to="/"><img src={images.SipheraLogo} alt="" /></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto" id='NavUl'>
                        <li className="nav-item">
                            <NavLink className="nav-link active" id='test' aria-current="page" to="/portfolio">PORTFOLIO</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/about">ABOUT</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/services">SERVICES</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/contact">CONTACT</NavLink>
                        </li>
                    </ul>
                    <div className="NavButton">
                        <ul className="navbar-nav ">
                            <li className='nav-item ButtonLi'>
                                <button className='btn btn-outline-light' id='button'>Book A Call</button>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-nav NavSocial">
                        <li className='nav-item social-li'>
                            <NavLink className='nav-social' id='nav-logo'><img src={images.linkedinLogo} alt="" /></NavLink>
                        </li>
                        <li className='nav-item social-li'>
                            <NavLink className='nav-social' id='nav-logo'><img src={images.instagramLogo} alt="" /></NavLink>
                        </li>
                        <li className='nav-item social-li'>
                            <NavLink className='nav-social' id='nav-logo'><img src={images.facebookLogo} alt="" /></NavLink>
                        </li>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default PublicNavbar