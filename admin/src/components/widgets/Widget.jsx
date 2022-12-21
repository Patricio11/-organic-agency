import "./widget.scss";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Widget = ({ type }) => {
    const [getTalents, setGetTalents] = useState([]);
    const [getPresentations, setPresentations] = useState([]);

    
    useEffect(()=>{
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_URL
        })
       
        const fetchTalent = async () =>{
            const res = await axiosInstance.get(`/admin`);
            const resP = await axiosInstance.get(`/presentation`);
            setPresentations(resP.data)
            setGetTalents(res.data)
        }
        fetchTalent()
    },[])

    let data;

    //Temporary
    const percentage = 20;

    switch (type) {
        case "talents":
            data={
                title: "Talents",
                isMoney: false,
                count: getTalents.length,
                link: "See all talents",
                linkTo: "/talents",
                icon: (
                    <PersonOutlineOutlinedIcon 
                        className="w-icon"
                        style={{
                            color:"crimson",
                            backgroundColor:"rgba(255, 0, 0, 0.2)"
                        }}
                    />
                )
            }
            break;
        case "presentations":
            data={
                title: "Presentations",
                count: getPresentations.length,
                isMoney: false,
                link: "View all presentations",
                linkTo:'/presentations',
                icon: (
                    <ShoppingCartOutlinedIcon 
                        className="w-icon"
                        style={{
                            color:"goldenrod",
                            backgroundColor:"rgba(218, 165, 32, 0.2)"
                        }}
                    />
                )
            }
            break;
    
        default:
            break;
    }
    return(
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"} {data.count}</span>
                <Link to={`${data.linkTo}`} className="link">
                {data.link}
                </Link>
                {/* <span ></span> */}
            </div>
            <div className="right">
                <div className="percentage positive">
                    
                </div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget;