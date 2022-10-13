import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
// import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
// import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

import {Link} from 'react-router-dom';
const Sidebar = () =>{
    return(
        <div className='sideBar'>
            <div className="top">
                <Link to="/" style={{textDecoration:'none'}}>
                    <span className="logo">Orgamic M</span>
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
                    {/* <Link to="/users" style={{textDecoration:'none'}}>
                        <li>
                            <PersonOutlineOutlinedIcon className="icon" />
                            <span>Users</span>
                        </li>
                    </Link> */}
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
                    {/* <li>
                        <LocalShippingIcon className="icon" />
                        <span>Delivery</span>
                    </li>
                    <p className="title">Useful</p>
                    <li>
                        <AssessmentIcon className="icon" />
                        <span>Status</span>
                    </li>
                    <li>
                        <NotificationsNoneOutlinedIcon className="icon" />
                        <span>Notifications</span>
                    </li>
                    <p className="title">Service</p>
                    <li>
                        <CallToActionOutlinedIcon className="icon" />
                        <span>System Health</span>
                    </li>
                    <li>
                        <PsychologyOutlinedIcon className="icon" />
                        <span>Logs</span>
                    </li>
                    <li>
                        <SettingsApplicationsIcon className="icon" />
                        <span>Settings</span>
                    </li>
                    <p className="title">User</p>
                    <li>
                        <AccountCircleOutlinedIcon className="icon" />
                        <span>Profile</span>
                    </li> */}
                    {/* <li>
                        <ExitToAppOutlinedIcon className="icon" />
                        <span>Logout</span>
                    </li> */}
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