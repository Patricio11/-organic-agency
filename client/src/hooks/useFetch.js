import { useEffect, useState } from "react";
import axios from "axios"
// import dotenv from "dotenv"

const useFetch = (url) =>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // dotenv.config()
    

    useEffect(()=>{
        const fetchData = async () => {
            const axiosInstance = axios.create({
                baseURL: process.env.REACT_APP_API_URL
            })
            setLoading(true);
            try {
                const res = await axiosInstance.get(url);
                console.log("I'm the response from fetch: "+res);
                setData(res.data);
            } catch (err) {
                setError(err)
            }
            setLoading(false);
        };
        fetchData();
    }, [url])//to run this useEffect any time the url changes

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            setError(err)
        }
        setLoading(false);
    };

    return {data, loading, error, reFetch}
};


export default useFetch;