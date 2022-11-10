import "./home.scss";
import logoTransp from "../../assets/organic-logo-t.png"
import Slider from "../../components/slider/Slider";
import { menuData } from "../../configs/navBarMenu";
import {Link} from "react-router-dom"

import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';

const Home = () => {

    return (
        <div className="home">
            <Slider />
            <div className="sContentContainer">
                <div className="sContent">
                    <div className="logo">
                        <img src={logoTransp} alt="" className="logo" />
                    </div>
                    <div className="sMenuContainer">
                        {
                            menuData.map((menuItem, index) => (
                                <Link to={menuItem.link} key={index} className="menuItem">
                                    {menuItem.text}
                                </Link>
                            ))
                        }
                        {/* <div className="specialities">
                            <span className="menuItem">Specialities</span>
                            <div className="specialitiesWrapper" >
                                <Link to={'/talents/all?speciality=Hands'} className="menuItem">
                                    Hands 
                                </Link>
                                <Link to={'/talents/all?speciality=Legs&Feet'} className="menuItem">
                                    Legs{'&'}Feet
                                </Link>
                                <Link to={'/talents/all?speciality=Women Classics'} className="menuItem">
                                    Women Classics
                                </Link>
                                <Link to={'/talents/all?speciality=Women Twins Classics'} className="menuItem">
                                    Women Twins Classics
                                </Link>
                                <Link to={'/talents/all?speciality=Men Real Families'} className="menuItem">
                                    Men Real Families
                                </Link>
                            </div>
                        </div>  */}
                        <div className="contactUs">
                            <Link to="/contact" className="cIcon">
                                <PhoneEnabledOutlinedIcon />
                            </Link>
                            <a href="https://www.instagram.com/patriciopcm11" target="_blank" rel="noreferrer" className="cIcon">
                                <InstagramIcon />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="sFooter">
                    <span>© Copyright {new Date().getFullYear()} | Privacy Policy | Powered by PATRICIO MANUEL</span>
                </div>
            </div>
        </div>
    )
}

export default Home