import './list.scss'
import Card from '../pCard/Card'
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import axios from "axios"
import SinglePresentation from '../single/SinglePresentation';


const List = () => {
  const [getPresentation, setGetPresentation] = useState([])
  const [file, setFile] = useState("");
  const [presentationInfo, setPresentationInfo] = useState({})
  const [showCreatePresentationModal, setShowCreatePresentationModal] = useState(false)
  const [showPresentationModal, setShowPresentationModal] = useState(false)
  const [selectedPresentation, setSelectedPresentation] = useState('')
  
  
  const [talents, setTalents] = useState([])
  const apiImgUrl = process.env.REACT_APP_API_IMG_URL
  const apiUrl = process.env.REACT_APP_API_URL //API main URL
  const baseMediaUrl = `${apiImgUrl}/uploads/presentation/`


  useEffect(()=>{
    const fetchPresentations = async () =>{
      const res = await axios.get(`${apiUrl}/presentation`);
      setGetPresentation(res.data)
    }
      fetchPresentations()
  },[])
  useEffect(()=>{
    const fetchTalents = async () =>{
      const res = await axios.get(`${apiUrl}/admin`);
      setTalents(res.data)
    }
    fetchTalents()
  },[])

  
  const handleChange = (e) =>{
    setPresentationInfo(prev=>({...prev, [e.target.id]: e.target.value}))
  }
  const handleCloseModal = () =>{
    setShowCreatePresentationModal(false)
    setFile('');
    setPresentationInfo({})
  }

  const handleCreatePresentation = async (e) => {

    e.preventDefault();
    const filedata = new FormData()
    filedata.append("jobLogo", file);//transforming the file into formData
 
    try {
      const uploadRes = await axios.post(
        `${apiUrl}/presentation/upload`, 
        filedata
      );
    
      const pFileName = uploadRes.data.filename
      const newPresentation = {
        ...presentationInfo,
        productImage: pFileName
      };//getting all the user info from the form and the image url  to be saved(created)
      
      const res = await axios.post(`${apiUrl}/presentation`, newPresentation);//sending register request to the API to register a user
      console.log("After creating")
      console.log(res.data )
      setGetPresentation(prev =>([...prev, res.data]))
    } catch (error) {
      console.log(error)
    }

    //CLEANING UP AFTER DREATING TALENT
    setFile('');
    setPresentationInfo({})
    
    setShowCreatePresentationModal(false)
  }
  
  return (
    <div className='list'>

      {
        showCreatePresentationModal &&
          <div className="registerTalentModal">
            <div className="modalWrapper">
                <div className="topModal">
                    <h2>Personal Details</h2>
                    <CloseIcon onClick={handleCloseModal} className="closeIcon" />
                </div>
                <div className="modalBody">
                    <form>
                      <div className="selectedProfile">
                        <img  src={ file ? URL.createObjectURL(file) : 'https://via.placeholder.com/250x350'} alt="" style={{height: '80%', objectFit:'contain'}}/>
                        <label htmlFor="file" className="fileUploadLabel"><AddAPhotoOutlinedIcon /> Add Product Logo</label>
                        <input type="file" id="file" name="productImage" onChange={(e)=>setFile(e.target.files[0])}  />
                      </div>
                  
                      <div className="formFields">

                        <div className="fieldsContainer">
                          <div className="fieldItem">
                            <label htmlFor="name">Job Name</label>
                            <input type="text" id="name"  onChange={handleChange}/>
                          </div>
                          <div className="fieldItem">
                            <label htmlFor="pDate">Presentation Date</label>
                            <input type="date" id="pDate"  onChange={handleChange}/>
                          </div>
                        </div>
                          
                        <div className="createBtnContainer">

                          <button className="createBtn" onClick={handleCreatePresentation}>Create</button>
                        </div>
                      </div>
                    </form>
                </div>
            </div>
          </div>
      }

      <div className="listActionSection">
        {/* <div className="searchTalent">
          <input 
          type="text" 
          name="search" 
          id="searchT" 
          className="searchInput" 
          placeholder="Seach Presentation"
          />  
        </div> */}
        <button
          onClick={()=>setShowCreatePresentationModal(true)}
            // onClick={handleRgisterModal}
          className="createTalentBtn"
        > Create Presentation</button>
      </div>
      <div className='lWrapper pCardListWapper'>
        {
          getPresentation.map((presentation) => (
            <Card 
              presentation={presentation} 
              key={presentation._id}
              style={{cursor:'pointer'}}
              setShowPresentationModal={setShowPresentationModal}
              baseMediaUrl = {baseMediaUrl}
              setSelectedPresentation = {setSelectedPresentation}
              setGetPresentation={setGetPresentation}
            />
          ))
        }
      </div>
        {
          showPresentationModal &&
          <SinglePresentation 
            setSelectedPresentation={setSelectedPresentation}
            setShowPresentationModal={setShowPresentationModal}
            presentation = {selectedPresentation}
            baseMediaUrl = {baseMediaUrl}
            apiImgUrl={apiImgUrl}
            apiUrl={apiUrl}
            talents={talents}
          />
        }
    </div>
  )
}

export default List