import ImgCard from "../imgCard/ImgCard"
import "./videos.scss"
import { DragDropContext,  Droppable } from 'react-beautiful-dnd'


const Videos = ({videos,baseMediaUrl, setShowUploadModal, handleDeleteMedia, handleUpdateMediaPosition}) =>{
    
    const onDragEnd = async result =>{
        const { destination, source} = result;
        if(!destination) return;
        if(destination.droppableId === source.draggableId && destination.index === source.index)return;
        
        const newList = [...videos]
        const [removed] = newList.splice(source.index, 1)
        newList.splice(destination.index, 0, removed)

        handleUpdateMediaPosition(newList)
    }
    // TO SORT THE RECORDS
    videos?.sort((a, b) => b.position - a.position)
    
    return (
        <div className="top videos">
            <DragDropContext 
                onDragEnd={onDragEnd}
            > 
                <div className="mainCenter">
                    <div onClick={()=>setShowUploadModal(true)} className="editBtn">Upload</div>
                    <Droppable 
                        droppableId="videos001"
                        direction="horizontal"
                    >
                        {

                            (provided) => (
                        
                                <div 
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="itemsContainer"
                                >
                                
                                    { 
                                        
                                        videos.map((video, idx) => (
                                            <ImgCard 
                                                handleDeleteMedia={(event,mediaId) => handleDeleteMedia(event, mediaId)}
                                                baseMediaUrl={baseMediaUrl} 
                                                source = {video.filename} 
                                                sourceId = {video._id}
                                                key={idx} 
                                                type="video"
                                                idx = {idx}
                                            />
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )
                        }
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    )
}

export default Videos