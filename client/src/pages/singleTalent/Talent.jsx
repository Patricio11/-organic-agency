import "./talent.scss"
import NavBar from "../../components/navBar/NavBar";
import SingleTalent from "../../components/singleTalent/SingleTalent";
import Footer from "../../components/footer/Footer";

import axios from 'axios'
import { useState ,useEffect } from "react";
import { useLocation } from "react-router-dom";

const Talent = () => {

    const location = useLocation();//to get the url main path to be able to get the id
    const talent_id = location.pathname.split('/').pop(); // using pop() funtion to get last element form the split
 
    const apiUrl = process.env.REACT_APP_API_URL //API main URL
    const apiImgUrl = process.env.REACT_APP_API_IMG_URL //API main URL
    const baseMediaUrlVideos = `${apiImgUrl}/uploads/videos/`
    // const {data, loading/*, error*/} = useFetch(
    //     `${apiUrl}/talents/find/${talent_id}`
    // )

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    // useEffect(()=>{
       
    //     setLoading(true)
    //     const axiosInstance = axios.create({
    //         baseURL: process.env.REACT_APP_API_URL
    //     })
    //     const fetchTalent = async () =>{
    //         const res = await axiosInstance.get(`/talents/${talent_id}`);
    //         setData(res.data)
    //     }
    //     setLoading(false)
    //     fetchTalent()
    // },[])
    
    useEffect(()=>{
        setLoading(true)
        const axiosInstance = axios.create({
            baseURL: apiUrl
        })
        const fetchTalent = async () =>{
            const res = await axiosInstance.get(`/talents/find/${talent_id}`);
            setData(res.data)
        }
        setLoading(false)
        fetchTalent()
    },[talent_id, apiUrl])

    console.log(data)

    return (
        <>
            <div className="talent">
                <NavBar />
                <SingleTalent 
                    data={data} 
                    loading={loading} 
                    baseMediaUrlVideos={baseMediaUrlVideos}
                    apiImgUrl={apiImgUrl}
                />
            </div>
            <Footer />
        </>
    )
}

export default Talent;