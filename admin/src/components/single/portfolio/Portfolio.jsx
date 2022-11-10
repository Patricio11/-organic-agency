import "./portfolio.scss";

import ImgCard from "../imgCard/ImgCard";
import { DragDropContext,  Droppable } from 'react-beautiful-dnd'

const Portfolio = ({portfoleo, baseMediaUrl, setShowUploadModal, handleDeleteMedia, handleUpdateMediaPosition}) =>{
    
    const onDragEnd = async result =>{
        const { destination, source} = result;
        if(!destination) return;
        if(destination.droppableId === source.draggableId && destination.index === source.index)return;
        
        const newList = [...portfoleo]
        const [removed] = newList.splice(source.index, 1)
        newList.splice(destination.index, 0, removed)

        handleUpdateMediaPosition(newList)
    }
    // TO SORT THE RECORDS
    portfoleo?.sort((a, b) => b.position - a.position)
    
    return (
        <div className="top portfolio">
            <DragDropContext 
                onDragEnd={onDragEnd}
            > 
                <div className="mainCenter">
                    <div onClick={()=>setShowUploadModal(true)} className="editBtn">Upload</div>
                    
                    <Droppable 
                        droppableId="portfolio001"
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
                                        portfoleo.map((singlePortfoleo, idx) => (
                                            <ImgCard 
                                                handleDeleteMedia={(event,mediaId) => handleDeleteMedia(event, mediaId)} 
                                                baseMediaUrl={baseMediaUrl} 
                                                sourceId = {singlePortfoleo._id} 
                                                source = {singlePortfoleo.filename} 
                                                idx = {idx}
                                                key={singlePortfoleo._id}
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

export default Portfolio;