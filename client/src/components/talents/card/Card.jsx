import "./card.scss"

// import { Navigate } from "react-router-dom";

const Card = ({singleCardTalent, apiImgUrl}) => {
    const baseMediaUrlVideos = `${apiImgUrl}/uploads/videos/`
    
    console.log(singleCardTalent.videos.length > 0)
    return (
        <div className="card" >
            <div className="cardContainer">
                <img  
                    src={ 
                        singleCardTalent.profileImg ? 
                        `${apiImgUrl}/uploads/profiles/${singleCardTalent.profileImg}` : 
                        'https://via.placeholder.com/250x350'
                    } alt="" 
                />
                {
                   singleCardTalent.videos.length > 0 && singleCardTalent.videos !== undefined && 
                   <video style={{display:'none'}} src={baseMediaUrlVideos + singleCardTalent.videos[0].filename} autoPlay muted ></video>
                }

                <div className="talentName">
                    {singleCardTalent.name} {singleCardTalent.surname.slice(0, 1)}
                </div>
            </div>
        </div>
    )
}

export default Card;