import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

import {Link} from 'react-router-dom';
const Sidebar = () =>{
    return(
        <div className='sideBar'>
            <div className="top">
                <Link to="/" style={{textDecoration:'none'}}>
                    <span className="logo">Orgamic Dashboard</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">Main</p>
                    <Link to="/" style={{textDecoration:'none'}}>

                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dshboard</span>
                        </li>
                    </Link>
                    <p className="title">Lists</p>
                    <Link to="/talents" style={{textDecoration:'none'}}>

                        <li>
                            <StoreIcon className="icon" />
                            <span>Talents</span>
                        </li>
                    </Link>
                    <Link to="/presentations" style={{textDecoration:'none'}}>

                        <li>
                            <CreditCardIcon className="icon" />
                            <span>Presentations</span>
                        </li>
                    </Link>
                    
                </ul>
            </div>
            <div className="bottom">
                <ExitToAppOutlinedIcon className="icon" />
                <span>Logout</span>
            </div>
        </div>
    )
}

export default Sidebar;