import ImgCard from "../imgCard/ImgCard";
import "./polaroids.scss"
import { DragDropContext,  Droppable } from 'react-beautiful-dnd'

const Polaroids = ({polaroids,baseMediaUrl, setShowUploadModal, handleDeleteMedia,
handleUpdateMediaPosition}) =>{
    
    const onDragEnd = async result =>{
        const { destination, source} = result;
        if(!destination) return;
        if(destination.droppableId === source.draggableId && destination.index === source.index)return;
        
        const newList = [...polaroids]
        const [removed] = newList.splice(source.index, 1)
        newList.splice(destination.index, 0, removed)

        handleUpdateMediaPosition(newList)
        

    }
    // TO SORT THE RECORDS
    polaroids?.sort((a, b) => b.position - a.position)

    return (
       
        <div className="top polaroids">
            <DragDropContext 
                onDragEnd={onDragEnd}
            >   
                <div className="mainCenter">
                    <div onClick={()=>setShowUploadModal(true)} className="editBtn">Upload</div>
                    <Droppable 
                        droppableId="polaroids001"
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
                                        
                                        polaroids?.map((polaroid, idx) => (
                                                        
                                            <ImgCard 
                                                handleDeleteMedia={(event,mediaId) => handleDeleteMedia(event, mediaId)} 
                                                baseMediaUrl={baseMediaUrl} 
                                                sourceId = {polaroid._id} 
                                                source = {polaroid.filename} 
                                                idx = {idx}
                                                key={polaroid._id}
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

export default Polaroids;