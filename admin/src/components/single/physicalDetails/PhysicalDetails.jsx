import { useState } from "react"
import axios
 from "axios"
import "./physicalDetails.scss"
import { useLocation } from "react-router-dom"


const PhysicalDetails = ({talentData}) =>{
    const location = useLocation();
    const talent_id = location.pathname.split('/').pop(); 
    const apiUrl = "http://localhost:8800/api" //API main URL

    const [sizeInfo, setSizeInfo] = useState([])
    // const [sizeInfoNew, setSizeInfoNew] = useState([])
    const handleSizeChange = (e) =>{
       
        setSizeInfo(prev=>({...prev, [e.target.id]: e.target.value}))

        console.log(sizeInfo);
    }
    console.log(sizeInfo)
    const handleTalentSizesUpdate = async (e) =>{
        e.preventDefault()
        
        console.log('After click')
        
        console.log(sizeInfo)
        console.log("Inside the map")
        const newSizesList = await Promise.all( Object.entries(sizeInfo).map(async(sizeSingle)=>{
            let allSizes = [];
            let sizeKey = sizeSingle[0]
            let sizeValue = sizeSingle[1]
            // let newSizesEnter = {[sizeKey]:sizeValue};
            allSizes.push({[sizeKey]:sizeValue})
           
            
            return allSizes[0]
            
            
        }))
        
        console.log(newSizesList);
        
        const updatedSizes = {
            'sizes': newSizesList,
        }
        
        console.log(updatedSizes)
        

        // const resSizes = await axios.put(`${apiUrl}/talents/social/${talent_id}`, sizeInfo);//sending register request to the API to register a user
        const resSizes = await axios.put(`${apiUrl}/talents/${talent_id}`, updatedSizes);//sending register request to the API to register a user
        // const resSizes = await axios.put(`${apiUrl}/talents/social/${talent_id}`, updatedSizes);//sending register request to the API to register a user
        // setTalentData(resSizes.data)
        console.log(resSizes.data.sizes)

        // setSizeInfoNew([])
    }
    
    return (
        <div className="top physicalDetails">
            <div className="mainCenter">
                <div className="editBtn">Upload</div>
                <div className="item">
                    
                <form>
                
                    <div className="formFields">
                        <div className="fieldsContainer">
                            <div className="fieldItem">
                                <label htmlFor="height">Height</label>
                                <input type="text" id="height"  onChange={handleSizeChange} placeholder={talentData.height}/>
                            </div>
                            <div className="fieldItem">
                                <label htmlFor="bust">Bust</label>
                                <input type="text" id="bust"  onChange={handleSizeChange} placeholder={talentData.bust}/>
                            </div>
                            <div className="fieldItem">
                                <label htmlFor="waist">Waist</label>
                                <input type="text" id="waist" onChange={handleSizeChange} placeholder={talentData.waist}/>
                            </div>
                            <div className="fieldItem">
                                <label htmlFor="hips">Hips</label>
                                <input type="text" id="hips" onChange={handleSizeChange} placeholder={talentData.hips}/>
                            </div>
                            
                        </div>
                        <div className="fieldsContainer">
                            <div className="fieldItem">
                                <label htmlFor="dress">Dress</label>
                                <input type="text" id="dress"  onChange={handleSizeChange} placeholder={talentData.height}/>
                            </div>
                            <div className="fieldItem">
                                <label htmlFor="shoe">Shoe</label>
                                <input type="text" id="shoe"  onChange={handleSizeChange} placeholder={talentData.bust}/>
                            </div>
                            <div className="fieldItem">
                                <label htmlFor="hair">Hair</label>
                                <input type="text" id="hair" onChange={handleSizeChange} placeholder={talentData.waist}/>
                            </div>
                            <div className="fieldItem">
                                <label htmlFor="eyes">Eyes</label>
                                <input type="text" id="eyes" onChange={handleSizeChange} placeholder={talentData.hips}/>
                            </div>
                            
                        </div>
                             
                        
                        <div className="createBtnContainer">

                            <button className="createBtn" onClick={handleTalentSizesUpdate}>Update Talent</button>
                        </div>
                    </div>
                </form>
                
                </div>
            </div>
        </div>
    )
}

export default PhysicalDetails;