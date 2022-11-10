import "./imgCard.scss"
import { RiDeleteBinLine} from "react-icons/ri"
import { FiMove } from "react-icons/fi"
import { Draggable} from 'react-beautiful-dnd'

const ImgCard = ({handleDeleteMedia,baseMediaUrl, source,sourceId, type, idx}) =>{
    return (
        <Draggable
            draggableId={sourceId}
            key={sourceId}
            index={idx}
        >
            {
                type!=='video' ?
                (provided) => (
                    
                    <div 
                        ref={provided.innerRef}
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        className="imgCardContainer"
                    >
                        <div className="imgCardWrapper">
                            <div className="imgActionBtn">
                                <span className="setProfile active">Profile</span>
                                
                                <RiDeleteBinLine onClick={()=>handleDeleteMedia(source,sourceId)} className="imgDeleteBtn"/>
                                
                            </div>
                            
                            <img src={baseMediaUrl + source} alt="talent" />
                            
                        </div>
                    </div>
                ) : 
                (provided) => (
                    
                    <div 
                        ref={provided.innerRef}
                        {...provided.draggableProps} 
                        className="imgCardContainer"
                    >
                        <div className="imgCardWrapper">
                            <div className="imgActionBtn">
                                <RiDeleteBinLine onClick={()=>handleDeleteMedia(source,sourceId)} className="imgDeleteBtn"/>
                                <span 
                                    {...provided.dragHandleProps}
                                >

                                    <FiMove className="imgDeleteBtnGrab"/>
                                </span>
                            </div>
                            <video src={baseMediaUrl + source} controls></video>
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}

export default ImgCard