import ImgCard from "../imgCard/ImgCard";
import "./polaroids.scss"

const Polaroids = ({polaroids,baseMediaUrl, setShowUploadModal, handleDeleteMedia}) =>{
    return (
        <div className="top polaroids">
            <div className="mainCenter">
                <div onClick={()=>setShowUploadModal(true)} className="editBtn">Upload</div>
                <div className="itemsContainer">
                    { 
                        polaroids.map((polaroid, idx) => (
                            // <ImgCard baseMediaUrl={baseMediaUrl} source = {polaroid.filename} key={idx}/>
                            <ImgCard 
                                handleDeleteMedia={(event,mediaId) => handleDeleteMedia(event, mediaId)} 
                                baseMediaUrl={baseMediaUrl} 
                                sourceId = {polaroid._id} 
                                source = {polaroid.filename} 
                                key={polaroid._id}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Polaroids;