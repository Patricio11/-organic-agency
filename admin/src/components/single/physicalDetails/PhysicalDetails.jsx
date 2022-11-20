import { useState } from "react"
import axios from "axios"
import "./physicalDetails.scss"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"


const PhysicalDetails = ({talentData, talentGender}) =>{
    const location = useLocation();
    const talent_id = location.pathname.split('/').pop(); 
    const apiUrl = "http://localhost:8800/api" //API main URL

    const [sizesUpdated, setSizesUpdated] = useState(false)
    const [height, setHight] = useState('')
    const [chest, setChest] = useState('')
    const [suit, setSuit] = useState('')
    const [collar, setCollar] = useState('')
    const [bust, setBust] = useState('')  
    const [waist, setWaist] = useState('')  
    const [hips, setHips] = useState('')
    const [dress, setDress] = useState('')
    const [shoe, setShoe] = useState('')  
    const [hair, setHair] = useState('')
    const [eyes, setEyes] = useState('')

    const[theAllSizes, setTheAllSizes] = useState([]);

    useEffect(()=>{
        if (talentData) {
            
            talentData.map((talentSize)=>{
                let theKey1 = Array.from(Object.entries(talentSize))[0][0]
                let theValues2 = Array.from(Object.entries(talentSize))[0][1]
              
                return setTheAllSizes(prev=>({...prev, [theKey1]: theValues2}))
            });
           
        }
      
    },[talentData])

    useEffect(()=>{
        console.log("talentData Effect")
        console.log(talentData)

        if (talentData) {
            talentData.map((talentSize) => (

                talentSize.height ?
                setHight(talentSize.height)
                : talentSize.chest?
                setChest(talentSize.chest)
                :talentSize.suit ?
                setSuit(talentSize.suit):
                talentSize.collar ?
                setCollar(talentSize.collar)
                :talentSize.bust ?
                setBust(talentSize.bust)
                :talentSize.waist ?
                setWaist(talentSize.waist)
                :talentSize.hips ?
                setHips(talentSize.hips)
                :talentSize.dress ?
                setDress(talentSize.dress)
                :talentSize.shoe ?
                setShoe(talentSize.shoe)
                :talentSize.hair ?
                setHair(talentSize.hair)
                :talentSize.eyes?
                setEyes(talentSize.eyes)
                :''
                
            ))
        }
    },[talentData]);

    const handleSizeChange = (e) =>{
        setTheAllSizes(prev=>({...prev, [e.target.id]: e.target.value}))

    }

    
    const handleTalentSizesUpdate = async (e) =>{
        e.preventDefault()
        

      
        const newSizesList = await Promise.all( 
            Object.entries(theAllSizes).map(
                (sizeSingle)=>{
                    let allSizes = [];
                    let sizeKey = sizeSingle[0]
                    let sizeValue = sizeSingle[1]
                    allSizes.push({[sizeKey]:sizeValue})

                    return allSizes[0]
            
                }
            )
        )
        // const newSizesList = await Promise.all( 
        //     Object.entries(theAllSizes).map(
        //         async(sizeSingle)=>{
        //             let allSizes = [];
        //             let sizeKey = sizeSingle[0]
        //             let sizeValue = sizeSingle[1]
        //             allSizes.push({[sizeKey]:sizeValue})

        //             return allSizes[0]
            
        //         }
        //     )
        // )

        const updatedSizes = {
            'sizes': newSizesList,
        }
        const resoultSizes = await axios.put(`${apiUrl}/talents/${talent_id}`, updatedSizes);//sending register request to the API to register a user
        console.log(resoultSizes.data.sizes)
        setSizesUpdated(true)
    }
    
    return (
        <div className="top physicalDetails">
            <div className="mainCenter">
                <div className="editBtn"></div>
                <div className="item">
                    
                <form>
                
                    <div className="formFields">
                        <div className="fieldsContainer">
                            <div className="fieldItem">
                                <label htmlFor="height">Height</label>
                                {
                                    height?
                                    <input type="text" id="height" defaultValue={height}  onChange={handleSizeChange}/>
                                    :<input type="text" id="height"  onChange={handleSizeChange}/>
                                }
                            </div>
                            <div className="fieldItem">
                                <label htmlFor="bust">{talentGender !== 1 ? 'Bust':'Collar'}</label>
                                {
                                    talentGender !== 1 ?
                                        bust ? <input type="text" id="bust"  defaultValue={bust}  onChange={handleSizeChange}/>
                                        :<input type="text" id="bust" onChange={handleSizeChange}/>
                                    :
                                        collar ? <input type="text" id="collar"  defaultValue={collar}  onChange={handleSizeChange}/>
                                        :<input type="text" id="collar" onChange={handleSizeChange}/>
                                }
                            
                            </div>
                            <div className="fieldItem">
                                <label htmlFor="waist">Waist</label>
                                {
                                    waist ? 
                                        <input type="text" id="waist"  defaultValue={waist}  onChange={handleSizeChange}/>
                                        :<input type="text" id="waist"  onChange={handleSizeChange}/>
                                }
                            </div>
                            <div className="fieldItem">
                                <label htmlFor="hips">{talentGender !== 1 ?'Hips':'Chest'}</label>
                                {
                                    talentGender !== 1 ? 
                                        hips ? 
                                            <input type="text" id="hips" defaultValue={hips}  onChange={handleSizeChange}/>
                                            :<input type="text" id="hips"  onChange={handleSizeChange}/>
                                    :
                                    chest ? 
                                        <input type="text" id="chest" defaultValue={chest}  onChange={handleSizeChange}/>
                                        :<input type="text" id="chest"  onChange={handleSizeChange}/>
                                }
                            </div>
                            
                        </div>
                        <div className="fieldsContainer">
                            <div className="fieldItem">
                                <label htmlFor="dress">{talentGender !== 1 ?'Dress':'Suit'}</label>
                                {
                                    talentGender !== 1 ? 
                                        dress ? 
                                            <input type="text" id="dress"  defaultValue={dress}  onChange={handleSizeChange}/>
                                            :<input type="text" id="dress"  onChange={handleSizeChange}/>
                                        :
                                            suit ? 
                                                <input type="text" id="suit"  defaultValue={suit}  onChange={handleSizeChange}/>
                                                :<input type="text" id="suit"  onChange={handleSizeChange}/>
                                }
                            </div>
                            <div className="fieldItem">
                                <label htmlFor="shoe">Shoe</label>
                                {
                                    shoe ? 
                                        <input type="text" id="shoe" defaultValue={shoe}  onChange={handleSizeChange}/>
                                        :<input type="text" id="shoe"   onChange={handleSizeChange}/>
                                }
                            </div>
                            <div className="fieldItem">
                                <label htmlFor="hair">Hair</label>
                                {
                                    hair ? 
                                        <input type="text" id="hair" defaultValue={hair}  onChange={handleSizeChange}/>
                                        :<input type="text" id="hair"  onChange={handleSizeChange}/>
                                }
                            </div>
                            <div className="fieldItem">
                                <label htmlFor="eyes">Eyes</label>
                                {
                                    eyes ? 
                                        <input type="text" id="eyes"  defaultValue={eyes}  onChange={handleSizeChange}/>
                                        : <input type="text" id="eyes" onChange={handleSizeChange}/>
                                }
                                    {/* talentData.length > 0 ?
                                    talentData.map((heig,idx)=>(
                                        heig.eyes ? 
                                        <input type="text" id="eyes" key={idx} defaultValue={heig['eyes']}  onChange={handleSizeChange}/>
                                        : heig.eyes=== undefined ? <input type="text" id="eyes" key={idx}  onChange={handleSizeChange}/> : ''
                                    )) : <input type="text" id="eyes" onChange={handleSizeChange}/>
                                } */}
                            </div>
                            
                        </div>
                             
                        <div className="createBtnContainer">
                            <button className="createBtn" onClick={handleTalentSizesUpdate}>Update Talent</button>
                            {
                                sizesUpdated ? <span className="sizesUpdated" >Sizes updated</span> : null
                            }
                        </div>
                    </div>
                </form>
                
                </div>
            </div>
        </div>
    )
}

export default PhysicalDetails;