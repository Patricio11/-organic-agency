import "./documents.scss"
import { RiFilePdfLine } from 'react-icons/ri';
const Documents = ({documents,baseMediaUrl, setShowUploadModal}) =>{
    return (
        <div className="top documents">
        <div className="mainCenter">
            <div onClick={()=>setShowUploadModal(true)} className="editBtn">Upload</div>
            <div className="itemsContainer">
                
                { 
                    documents.map((document, idx) => (
                    
                        <a 
                            href = {baseMediaUrl + document.filename} 
                            key={idx} 
                            style={{
                                display:'flex', 
                                gap:'0.3em', 
                                alignItems:'center', 
                                textDecoration:'none'
                            }}
                        >
                            <RiFilePdfLine/>
                            <span>{document.doc_type}</span>
                        </a>
                    ))
                }
            </div>
        </div>
    </div>
    

    
    )
}

export default Documents;