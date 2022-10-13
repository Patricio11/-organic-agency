import "./imgCard.scss"
import { RiDeleteBinLine } from "react-icons/ri"

const ImgCard = ({handleDeleteMedia,baseMediaUrl, source,sourceId, type}) =>{
    return (
        <div className="imgCardContainer">
            <div className="imgCardWrapper">
                <div className="imgActionBtn">
                    {
                        type!=='video' &&
                        <span className="setProfile active">Profile</span>
                    }
                    <RiDeleteBinLine onClick={()=>handleDeleteMedia(source,sourceId)} className="imgDeleteBtn"/>
                </div>
                {
                    type==='video' ? <video src={baseMediaUrl + source} controls></video> :
                    <img src={baseMediaUrl + source} alt="talent" />
                }
            </div>
        </div>
    )
}

export default ImgCard