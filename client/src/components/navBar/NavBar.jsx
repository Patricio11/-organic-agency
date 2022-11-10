import "./navBar.scss"
import logoT from "../../assets/organic-logo-t.png"
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link /*, useNavigate*/ } from "react-router-dom"
import { menuData } from "../../configs/navBarMenu"
import { useState } from "react";


const NavBar = () =>{

    const [phoneMenuOpen, setPhoneMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false);
    const logoBlack = "https://organictalentmanagement.co.za/static/media/organic-logo-bw.5b0c76ca583c75fa2250.jpg"
    
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => window.onscroll = null; // This is a cleanup funstion so it doesn't become a infinite loop
    }

    return (
        <div className={isScrolled ? "navBar scrolled" : "navBar"}>
            <div className="navContainer">
                <div className="logo">
                    <Link to="/">
                        {
                           isScrolled ?
                            <img src={logoBlack} style={{transition:'all .4s ease'}} alt="organic-modeling-agency" />
                           : 
                            <img src={logoT} style={{transition:'all .4s ease'}} alt="organic-modeling-agency" />
                        }
                    </Link>
                </div>
                <input type="checkbox" id="menu-bar" />
                <label htmlFor="menu-bar" className={phoneMenuOpen ? 'menu-btn open': 'menu-btn'} onClick={()=>setPhoneMenuOpen(!phoneMenuOpen)}>
                    <div  className={isScrolled ? "menu-btn_burger scrolledWhite" : "menu-btn_burger"}></div>
                </label>
                <nav id="main-nav" className={phoneMenuOpen ? 'adfNavbar open': 'adfNavbar'} >
                    <div className="nMenuItems">
                        {
                            menuData.map((menuItem, index) => (

                                <Link to={menuItem.link} key={index} className={isScrolled ? "menuItem scrolled" : "menuItem"}>
                                    {menuItem.text}
                                </Link>
                                // <span onClick={()=>navigate("/talents/all/?genre=women")}  key={index} className={isScrolled ? "menuItem scrolled" : "menuItem"}>
                                //      {menuItem.text}
                                // </span>
                            ))
                        } 
                        {/* <div className="specialities">
                            <span className={isScrolled ? "menuItem scrolled" : "menuItem"}>Specialities</span>
                            <div className={isScrolled ? "specialitiesWrapper scrolled" : "specialitiesWrapper"} >
                                <Link to={'/talents/all?speciality=Hands'} className={isScrolled ? "menuItem scrolled" : "menuItem"}>
                                    Hands 
                                </Link>
                                <Link to={'/talents/all?speciality=Legs&Feet'} className={isScrolled ? "menuItem scrolled" : "menuItem"}>
                                    Legs{'&'}Feet
                                </Link>
                                <Link to={'/talents/all?speciality=Women Classics'} className={isScrolled ? "menuItem scrolled" : "menuItem"}>
                                    Women Classics
                                </Link>
                                <Link to={'/talents/all?speciality=Women Twins Classics'} className={isScrolled ? "menuItem scrolled" : "menuItem"}>
                                    Women Twins Classics
                                </Link>
                                <Link to={'/talents/all?speciality=Men Real Families'} className={isScrolled ? "menuItem scrolled" : "menuItem"}>
                                    Men Real Families
                                </Link>
                            </div>
                        </div>  */}
                        <div className="contactUs">
                            <Link to="/contact" className={isScrolled ? "cIcon scrolled" : "cIcon"}>
                                <PhoneEnabledOutlinedIcon />
                            </Link>

                            <a 
                                href="https://instagram.com/organictalentmanagement?igshid=YmMyMTA2M2Y=" 
                                target="_blank" 
                                rel="noreferrer"
                                className={isScrolled ? "cIcon scrolled" : "cIcon"}
                            >
                                <InstagramIcon />
                            </a>
                            
                        </div>  
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default NavBar;