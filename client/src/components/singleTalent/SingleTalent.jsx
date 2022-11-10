
import SliderList from "../talents/imageSlider/sliderList/SliderList";
import useFetch from "../../hooks/useFetch.js"
import "./singleTalent.scss"
import { useLocation } from "react-router-dom";

const SingleTalent = () => {
    const location = useLocation();//to get the url main path to be able to get the id
    const talent_id = location.pathname.split('/').pop(); // using pop() funtion to get last element form the split
 
    const apiUrl = process.env.REACT_APP_API_URL //API main URL
    const apiImgUrl = process.env.REACT_APP_API_IMG_URL //API main URL
    const {data, loading/*, error*/} = useFetch(
        `${apiUrl}/talents/find/${talent_id}`
    )
    const baseMediaUrlVideos = `${apiImgUrl}/uploads/videos/`

    data.polaroids?.sort((a, b) => b.position - a.position)
    data.videos?.sort((a, b) => b.position - a.position)
    return (
        
        <div className="sTalentContainer">
            {
                loading ? "It is Loading" :
                    <div className="sTalentWapper">

                        <div className="tDetails">
                            <div className="name">{data.name}</div>
                            <div className="sizes">
                                {
                                    data.sizes &&
                                    data.sizes.map((theSize, idx)=>(

                                        <span key={idx}>
                                            <span className="sizeKey">
                                                {Array.from(Object.entries(theSize))[0][0]}:
                                            </span>
                                            <span className="sizeValue">
                                                {Array.from(Object.entries(theSize))[0][1]}
                                            </span>
                                        </span>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="tMedia">
                            <div className="profile">
                                {
                                    data.documents && data.documents.doc_type === 'zCard' ? 
                                    <a href={`${apiImgUrl}/uploads/documents/${data.documents.filename}`}>Download Z-card</a> : null
                                }
                                <div className="pContainer">

                                    <div className="left">
                                       <div className="left_wrapper">
                                            <img  
                                                src={ 
                                                    data.profileImg ? 
                                                    `${apiImgUrl}/uploads/profiles/${data.profileImg}` : 
                                                    'https://via.placeholder.com/250x350'
                                                } alt="" 
                                            />
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="right_wrapper">

                                            {
                                                data.polaroids && data.polaroids.length > 0 && data.polaroids !== undefined &&
                                                data.polaroids.map((polaroid)=>(
                                                    <div className="polaroidContainer" key={polaroid._id}>
                                                        <img  
                                                            src={`${apiImgUrl}/uploads/polaroids/${polaroid.filename}`} alt="" 
                                                        />
                                                        {/* <img src="https://static.wixstatic.com/media/5e0110_6cba58f457ed4ed7807e1c93dc9c1df7~mv2.jpg/v1/fill/w_1940,h_2461,al_c,q_90,enc_auto/Gabriela%20copy_edited.jpg" alt="" /> */}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="videoSection">
                                <div className="vWrapper">

                                    <div className="vContainer">
                                        {
                                            data.videos && data.videos.length > 0 && data.videos !== undefined &&
                                            data.videos.map((video)=>(
                                                <div className="videoContainer" key={video._id}>
                                                   <video src={baseMediaUrlVideos + video.filename} preload="metadata" muted loop controls  width="470" height="548"></video>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>


                            {/* <div className="portfoleo"> */}
                            <div className="videoSection">
                                <SliderList 
                                    baseMediaUrlPortfolio = {`${apiImgUrl}/uploads/portfoleo/`}
                                    portfoleo = {data.portfoleo?.sort((a, b) => b.position - a.position)}
                                />
                                
                            </div>
                        </div>
                    </div>
            }


        </div>
    )
}

export default SingleTalent;