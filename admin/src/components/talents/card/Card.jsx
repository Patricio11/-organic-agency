import "./card.scss"
// import dempTalent from "../../../images/home/image7.jpg"
// import testingV from "../../../videos/testing.mp4"
// import { Navigate } from "react-router-dom";

import { Link } from "react-router-dom";


const Card = ({singleCard, apiImgUrl, isPresentation, isTalentRole, addTalentToRole}) => {
 
    const handleSelectTalent = (talentId)=>{
       addTalentToRole(talentId)
       console.log('In the card')
       console.log(talentId)
    }
    return (
        <div className="card">
            {
                isPresentation === true ? 
                <div className="cardContainer"
                    onClick={()=>handleSelectTalent(singleCard._id)}
                >
                    <img  
                        src={ 
                            singleCard.profileImg ? 
                            `${apiImgUrl}/uploads/profiles/${singleCard.profileImg}` : 
                            'https://via.placeholder.com/250x350'
                        } alt="" 
                    />
                    {/* <img src="https://media.mixfame.com/headshot/rend/fill210x297/5/d/a/201811301715-ac16ce2c..2e16d0ba.fill-210x297.jpg" alt="" /> */}
                    {/* <video style={{display:'none'}} src={testingV} autoPlay muted ></video> */}

                    <div className="talentName">
                        {singleCard.name} {singleCard.surname.slice(0, 1)}
                        <small>{singleCard.phone}</small>
                    </div>
                </div>
                :
                isTalentRole === true ? 
                <a href={`https://organictalentmanagement.co.za/talents/${singleCard._id}`}>
                    <div className="cardContainer">
                        <img  
                            src={ 
                                singleCard.profileImg ? 
                                `${apiImgUrl}/uploads/profiles/${singleCard.profileImg}` : 
                                'https://via.placeholder.com/250x350'
                            } alt="" 
                        />
                        <div className="talentName">
                            {singleCard.name} {singleCard.surname.slice(0, 1)}
                            <small>{singleCard.phone}</small>
                        </div>
                    </div>
                </a>
                :
                <Link to={`/talents/${singleCard._id}`} >
                    <div className="cardContainer">
                        <img  
                            src={ 
                                singleCard.profileImg ? 
                                `${apiImgUrl}/uploads/profiles/${singleCard.profileImg}` : 
                                'https://via.placeholder.com/250x350'
                            } alt="" 
                        />
                        {/* <img src="https://media.mixfame.com/headshot/rend/fill210x297/5/d/a/201811301715-ac16ce2c..2e16d0ba.fill-210x297.jpg" alt="" /> */}
                        {/* <video style={{display:'none'}} src={testingV} autoPlay muted ></video> */}

                        <div className="talentName">
                            {singleCard.name} {singleCard.surname.slice(0, 1)}
                            <small>{singleCard.phone}</small>
                        </div>
                    </div>
                </Link>
            }
            
        </div>
    )
}

export default Card;