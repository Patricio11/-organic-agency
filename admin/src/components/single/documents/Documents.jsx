import "./documents.scss"

const Documents = ({documents,baseMediaUrl, setShowUploadModal}) =>{
    return (
        <div className="top documents">
        <div className="mainCenter">
            <div onClick={()=>setShowUploadModal(true)} className="editBtn">Upload</div>
            <div className="itemsContainer">
                
                { 
                    documents.map((document, idx) => (
                        <a href = {baseMediaUrl + document.filename} key={idx} >{document.filename}</a>
                    ))
                }
            </div>
        </div>
    </div>
    

    
    )
}

export default Documents;