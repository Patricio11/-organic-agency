import './navbar.scss';
import SearchOutlinedIncon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";



const Navbar = () =>{
    return(
        <div className='navBar'>
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder='Search...' />
                    <SearchOutlinedIncon />
                </div>
                <div className="nav-items">
                    <div className="item">
                        <LanguageOutlinedIcon className="item-icon" />
                        EN
                    </div>
                    <div className="item">
                        <DarkModeOutlinedIcon className="item-icon" />
                    </div>
                    
                    <div className="item">
                        <FullscreenExitOutlinedIcon className="item-icon" />
                    </div>
                    <div className="item">
                        <NotificationsNoneIcon className="item-icon" />
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <ChatBubbleOutlineIcon className="item-icon" />
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <ListOutlinedIcon className="item-icon" />
                        
                    </div>

                    <div className="item">
                        <img 
                            src="https://www.skorez.nl/userImages/patricio-manuel-developer2.jpg" 
                            alt="" 
                            className='user-avatar'
                        />
                    </div>




                </div>

            </div>
        </div>
    )
}

export default Navbar;