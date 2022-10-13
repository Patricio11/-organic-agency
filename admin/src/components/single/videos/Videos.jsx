import ImgCard from "../imgCard/ImgCard"
import "./videos.scss"


const Videos = ({videos,baseMediaUrl, setShowUploadModal}) =>{
    return (
        <div className="top videos">
            <div className="mainCenter">
                <div onClick={()=>setShowUploadModal(true)} className="editBtn">Upload</div>
                <div className="itemsContainer">
                    
                    { 
                        videos.map((video, idx) => (
                            <ImgCard baseMediaUrl={baseMediaUrl} source = {video.filename} key={idx} type="video"/>
                        ))
                    }
                
                </div>
            </div>
        </div>
    )
}

export default Videos