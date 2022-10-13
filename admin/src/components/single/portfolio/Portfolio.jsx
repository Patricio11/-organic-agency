import "./portfolio.scss";

import ImgCard from "../imgCard/ImgCard";

const Portfolio = ({portfoleo, baseMediaUrl, setShowUploadModal, handleDeleteMedia}) =>{
    
    
    return (
        <div className="top portfolio">
            <div className="mainCenter">
                <div onClick={()=>setShowUploadModal(true)} className="editBtn">Upload</div>
                <div className="itemsContainer">
                    
                    { 
                        portfoleo.map((singlePortfoleo) => (
                            <ImgCard handleDeleteMedia={(event,mediaId) => handleDeleteMedia(event, mediaId)} baseMediaUrl={baseMediaUrl} sourceId = {singlePortfoleo._id} source = {singlePortfoleo.filename} key={singlePortfoleo._id}/>
                            // <ImgCard handleDeleteMedia={event => handleDeleteMedia(event)} baseMediaUrl={baseMediaUrl} sourceId = {singlePortfoleo._id} source = {singlePortfoleo.filename} key={singlePortfoleo._id}/>
                        ))
                    }
                
                </div>
            </div>
        </div>
    )
}

export default Portfolio;