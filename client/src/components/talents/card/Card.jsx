import "./card.scss"


const Card = ({singleCardTalent, apiImgUrl}) => {
    const baseMediaUrlVideos = `${apiImgUrl}/uploads/videos/`
    
    const handlePalyVideo = (e) =>{
        e.target.play();
    }
    const handlePouseVideo = (e) =>{
        e.target.pause();
    }
    singleCardTalent.videos?.sort((a, b) => b.position - a.position)
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
                   <video style={{display:'none'}} onMouseOver={handlePalyVideo} onClick={handlePouseVideo} onMouseLeave={handlePouseVideo} loop muted>
                        <source src={baseMediaUrlVideos + singleCardTalent.videos[0].filename} />
                   </video>
                }

                <div className="talentName">
                    {singleCardTalent.name} {singleCardTalent.surname.slice(0, 1)}
                </div>
            </div>
        </div>
    )
}

export default Card;