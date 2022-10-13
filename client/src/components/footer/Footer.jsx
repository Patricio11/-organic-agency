import "./footer.scss"
import InfoIcon from '@mui/icons-material/Info';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import { Link } from "react-router-dom";
const Footer =()=>{
    return (
        <div className="footer">
            <div className="ftop">
                <Link to="/about" className="fIcon">
                    <InfoIcon />
                </Link>
                <Link to="/contact" className="fIcon">
                    <PhoneEnabledOutlinedIcon />
                </Link>
            </div>
            <div className="sFooter">
                <span>© Copyright {new Date().getFullYear()} | Privacy Policy | Powered by PATRICIO MANUEL</span>
            </div>
        </div>
    )
}

export default Footer;