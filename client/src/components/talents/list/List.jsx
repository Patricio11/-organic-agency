import Card from "../card/Card"
import "./list.scss"
import SearchOutlined from "@mui/icons-material/SearchOutlined"
import { Link, useLocation } from "react-router-dom"
import useFetch from "../../../hooks/useFetch.js"
import { useEffect, useState } from "react"


const List = () => {
    const apiUrl = process.env.REACT_APP_API_URL //API main URL
    const apiImgUrl = process.env.REACT_APP_API_IMG_URL //API main URL
    const [urlToFetch, setUrlToFetch] = useState()
    const {data, loading/*, error*/} = useFetch(urlToFetch)

    const [seachTalent, setSeachTalent] = useState('')
    useEffect(()=>{
        setUrlToFetch(`${apiUrl}/talents/search_result?search=${seachTalent}`)
    },[seachTalent,apiUrl])

    const handleSeach =(e) =>{
        setSeachTalent(e)
        console.log(seachTalent)
    } 
   
    const location = useLocation();

    useEffect(() => {
        const getTalentByCategories = () => {

            const urlParams = new URLSearchParams(window.location.search);
    
            urlParams.has('gender') ? 
                setUrlToFetch(`${apiUrl}/talents/all?gender=${urlParams.get('gender')}`) :
            // urlParams.has('influencers') ?
            //     setUrlToFetch(`${apiUrl}/talents/all?influencers=true`) :
            // urlParams.has('speciality') ?
            //     setUrlToFetch(`${apiUrl}/talents/all?speciality=${urlParams.get('speciality')}`) :
                setUrlToFetch(`${apiUrl}/talents/featured`)
        }
        getTalentByCategories()
    }, [location, apiUrl]);
    // useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search);

    //     urlParams.has('gender') ? 
    //         setUrlToFetch(`${apiUrl}/talents/all?gender=${urlParams.get('gender')}`) :
    //     urlParams.has('influencers') ?
    //         setUrlToFetch(`${apiUrl}/talents/all?influencers=true`) :
    //     urlParams.has('speciality') ?
    //         setUrlToFetch(`${apiUrl}/talents/all?speciality=${urlParams.get('speciality')}`) :
    //         setUrlToFetch(`${apiUrl}/talents/featured`)
    // }, [location, apiUrl]);

    return (
        <div className="list">
            <div className="searchTalent">
                <input 
                    onChange={(e)=>handleSeach(e.target.value)}
                    type="text" 
                    name="search" 
                    id="searchT" 
                    className="searchInput" 
                />
                <SearchOutlined className="sIcon"/>
            </div>
            {/* <span className="lTitle">Continue to watch</span> */}
            <div className="lWrapper">
                {
                    loading ? "Is Loading" : 
                    <div className="lCardContainer">
                        {
                            data.map((talent) => (
                                <Link to={`/talents/${talent._id}`} key={talent._id}>
                                    <Card singleCardTalent={talent} apiImgUrl={apiImgUrl}/>
                                </Link>
                            ))
                        }
                        
                        
                    </div>
                }
            </div>
        </div>
    )
}

export default List