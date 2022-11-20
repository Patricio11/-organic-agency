import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';

import PlaceIcon from '@mui/icons-material/Place';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { RiLinksLine,RiDeleteBinLine } from "react-icons/ri"
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { FaTiktok } from 'react-icons/fa'
import Portfolio from '../../components/single/portfolio/Portfolio';
import Polaroids from '../../components/single/polaroids/Polaroids';
import Videos from '../../components/single/videos/Videos';
import PhysicalDetails from '../../components/single/physicalDetails/PhysicalDetails';

import { /*Link,*/ Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
// import useFetch from "../../components/hooks/useFetch"

import axios from 'axios';
import Documents from '../../components/single/documents/Documents';
import { RiDeleteBack2Fill, RiEdit2Fill } from 'react-icons/ri';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ["WEBP","JPEG", "PDF", "M4V", "MP4"];

const Single = () => {
    const location = useLocation();
    
    const talent_id = location.pathname.split('/').pop(); // using pop() funtion to get last element form the split

    const [talentData, setTalentData] = useState([]);

    const apiImgUrl = process.env.REACT_APP_API_IMG_URL
    const apiUrl = process.env.REACT_APP_API_URL //API main URL
    const urlDomain = process.env.REACT_APP_API_IMG_URL

    useEffect(()=>{
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_URL
        })
        const fetchTalent = async () =>{
            const res = await axiosInstance.get(`/talents/find/${talent_id}`);
            setTalentData(res.data)
        }
        fetchTalent()
    },[talent_id])

    const [activedTab, setActiveTab] = useState('')
    
    useEffect(() => {
        // const talent_id = location.pathname.split('/').pop(); // using pop() funtion to get last element form the split
        let urlTab = location.hash;
        
        setActiveTab(urlTab.split('#')[1])
    },[location])
    

    
    const [showUploadModal, setShowUploadModal] = useState(false)

    const baseMediaUrl = `${apiImgUrl}/uploads/${activedTab}/`
    //UPLOAD 
    const [files, setFiles] = useState("");


    const handleCloseUploadModal = () => {
        // setInfo({});
        setFiles("");
        setShowUploadModal(false);
    }

    const [documentType, setDocumentType] = useState('')
    const handleDocType = (e)=>{
        setDocumentType(e.target.value)
    }
    
    const handleSaveUploads = async e => {
        e.preventDefault();
        // console.log(hashUrl.split('#'))
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) =>{//Transforming the object into Array using Object.values
                    const fileData = new FormData();
                    fileData.append(activedTab, file);
                    
                    const uploadRes = await axios.post(
                        `${apiUrl}/talents/upload/${activedTab}`, 
                        fileData
                    );

                    const pFileName = uploadRes.data;
                    const filesFilename = pFileName[0].filename;
                    console.log(pFileName[0])
                    return filesFilename;
                }
            ));
            
            const newList = list.map((listItem, idx)=>{
                let allFiles = [];

                allFiles.push(
                    {
                        "filename":listItem,
                        "position": parseInt(talentData.polaroids.length >= 0 ? talentData.polaroids.length + idx : 0)
                    }
                );

                return allFiles[0];
            })
            console.log('talentData.polaroids.length')
            console.log(talentData.polaroids.length)
            const newListDoc = list.map((listItem)=>{
                let allFiles = [];

                allFiles.push(
                    {
                        "filename":listItem,
                        doc_type: documentType
                    }
                );

                return allFiles[0];
            })

            //SAVE MEDIA BASED ONTHE ACTIVE TAB
            let talentMedia={};
            switch (activedTab) {
                case 'polaroids':
                        talentMedia = {
                            polaroids: newList
                        };
                    break;
                case 'portfoleo':
                        talentMedia = {
                            portfoleo: newList
                        };
                    break;
                case 'videos':
                        talentMedia = {
                            videos: newList
                        };
                    break;
                case 'documents':
                        talentMedia = {
                            documents: newListDoc
                            
                        };
                    break;
            
                default:
                    talentMedia={};
                    break;
            }
            
            let uploadedFiles = await axios.put(`${apiUrl}/talents/files/update/${talent_id}`, talentMedia);//sending register request to the API to register a user

            console.log("Updated")
            console.log(uploadedFiles.data)
            setTalentData(uploadedFiles.data)
        } catch (error) {
            console.log(error)
        }

        //CLEANING UP AFTER DREATING TALENT
        // setInfo({});
        setFiles('');
        
        // setUrlToFetch(`${apiUrl}/admin/`);
        setShowUploadModal(false)
        // refresh()
    }

    
    const handleDeleteMedia = async (mediaName,mediaId)=>{
        console.log("Inside the delete")
        console.log(mediaName)
        console.log(mediaId)
        let updatedMediaFile= await axios.get(`${apiUrl}/talents/files/delete?talentId=${talent_id}&fileId=${mediaId}&activeTab=${activedTab}&delFile=${mediaName}`);//sending register request to the API to register a user
        
        console.log(updatedMediaFile.data)
    
        setTalentData(updatedMediaFile.data)
    }

    const [infoToUpdate, setInfoToUpdate] = useState({})
    const [jobHistoryToUpdate, setJobHistoryToUpdate] = useState({})
    const [socialMediaToUpdate, setSocialMediaToUpdate] = useState({})
    const [showUpadateModal, setShowUpadateModal] = useState(false)
    const [showAddJobHistModal, setShowAddJobHistModal] = useState(false)
    const [showUpadateJobHistModal, setShowUpadateJobHistModal] = useState(false)

    const [dateOfBirth, setDateOfBirth] = useState()
    const [age, setAge] = useState()

    const[product, setProduct] = useState('')
    const[year, setYear] = useState('')
    const[duraction, setDuraction] = useState('')
    const[exclusivity, setExclusivity] = useState('')
    const[territories, setTerritories] = useState('')
    const[featured, setFeatured] = useState(false)
    
    const[jobHistoryId, setJobHistoryId] = useState('')
    
    const handleCloseUpdateModal = () => {
        setInfoToUpdate({});
        setShowUpadateModal(false);
        setShowAddJobHistModal(false)
        setShowUpadateJobHistModal(false)
        clearAllFields()
    }

    const handleChange = (e) =>{
        setInfoToUpdate(prev=>({...prev, [e.target.id]: e.target.value}))
    }
    const handleJobHistoryChange = (e) =>{
        setJobHistoryToUpdate(prev=>({...prev, [e.target.id]: e.target.value}))
    }
    const handleSocialMediaChange = (e) =>{
        setSocialMediaToUpdate(prev=>({...prev, [e.target.id]: e.target.value}))
    }
    const handleDateOfBirthAndAge = (e) =>{
        let dob = new Date(e.target.value);
        console.log(dob);
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms); 
      
       let age = Math.abs(age_dt.getUTCFullYear() - 1970);

       setDateOfBirth(e.target.value)
       setAge(age)
    }
    

    const [arts, setArts] = useState([])
    const [sports, setSports] = useState([])
    const [laguanges, setLaguanges] = useState([])
    const [otherQualities, setOtherQualities] = useState([])

    const [specialities, setSpecialities] = useState([])
    const handleSelectSpecialitis = (e) =>{
        // console.log(e.target.selectedOptions);//return an HTMLCollection needs to be converted into array
        const value = Array.from(
            e.target.selectedOptions, 
            (option)=>option.value
        );//Converting HTMLCollection into Array and getting only the value
        setSpecialities(value)
        console.log(value)
    }
    const handleArts = (e) =>{
        let arts = e.target.value
        let artsArray = arts.split(',')
        setArts(artsArray)
    }
    const handleLanguages = (e) =>{
        let arts = e.target.value
        let artsArray = arts.split(',')
        setLaguanges(artsArray)
    }
    const handleSports = (e) =>{
        let arts = e.target.value
        let artsArray = arts.split(',')
        setSports(artsArray)
    }
    const handleOtherQualities = (e) =>{
        let arts = e.target.value
        let artsArray = arts.split(',')
        setOtherQualities(artsArray)
    }
    const clearAllFields = () =>{
        setInfoToUpdate()
        setSocialMediaToUpdate()
        setShowUpadateModal()
        setDateOfBirth()
        setAge()
        setArts()
        setSports()
        setLaguanges()
        setOtherQualities()
        setSpecialities()

        setProduct('')
        setYear('')
        setDuraction('')
        setExclusivity('')
        setTerritories('')
        setFeatured(false)

        setJobHistoryId('')
    }
    
    const [file, setFile] = useState("")
    
    const handleUpdateTalent = async (e)=>{
        e.preventDefault()
        console.log(infoToUpdate)  

        const filedata = new FormData()
        filedata.append("profileImg", file);//transforming the file into formData

        try{
            const uploadRes = await axios.post(
                `${apiUrl}/talents/upload/profile`, 
                filedata
            );
            const pFileName = uploadRes.data.filename;

            const updateTalentInfo = {
                ...infoToUpdate, 
                dateOfBirth: dateOfBirth,
                age: age,
                specialities: specialities,
                sports: sports,
                arts: arts,
                languages: laguanges,
                otherQualities: otherQualities,
                profileImg: pFileName,
            };//getting all the user info from the form and the image url  to be saved(created)
            
            if(socialMediaToUpdate.length > 0) {
                const socials = {
                    socialMedia: socialMediaToUpdate,
                }
                const resSocials = await axios.put(`${apiUrl}/talents/social/${talent_id}`, socials);//sending register request to the API to register a user
                setTalentData(resSocials.data)
            }else{

                const res = await axios.put(`${apiUrl}/talents/${talent_id}`, updateTalentInfo);//sending register request to the API to register a user
                console.log("After creating")
                console.log(res.data )
                setTalentData(res.data)
            }
            
    
    
            setShowUpadateModal(false)
            clearAllFields()
        }catch(err){
            console.log(err)
        }
    }

    const handleAddTalentJobHistory = async (e)=>{
        e.preventDefault()

        const jobHistory = {
            jobHistory: jobHistoryToUpdate
        }
        
        const resJobHistory = await axios.put(`${apiUrl}/talents/social/${talent_id}`, jobHistory);//sending register request to the API to register a user
        setTalentData(resJobHistory.data)
        console.log(resJobHistory.data )
        setShowAddJobHistModal(false)
        clearAllFields()
    }

    const handleShowUpdateTalentJobHistory = (jobHistory)=>{
        setProduct(jobHistory.product)
        setYear(jobHistory.year)
        setDuraction(jobHistory.duraction)
        setExclusivity(jobHistory.exclusivity)
        setTerritories(jobHistory.territories)
        setFeatured(jobHistory.featured)
        setJobHistoryId(jobHistory._id)
        setShowUpadateJobHistModal(true)

    }

    const handleUpdateTalentJobHistory = async (e) => {
        e.preventDefault()
        const jobHistoryUpdate = {
            jobHistory: jobHistoryToUpdate,
        }
        const resJobHist = await axios.put(`${apiUrl}/talents/${talent_id}/update-jobHistory/${jobHistoryId}`, jobHistoryUpdate);//sending register request to the API to register a user
        setTalentData(resJobHist.data)
        clearAllFields()
        setShowUpadateJobHistModal(false)
    }
    
    const handleDeleteJobHistory = async (jobHistoryId)=>{
        // e.preventDefault()
        console.log(jobHistoryId)

        const jobHistory = {
            _id: jobHistoryId
        }
        
        const resJobHistory = await axios.put(`${apiUrl}/talents/${talent_id}/delete-jobHistory`, jobHistory);//sending register request to the API to register a user
        setTalentData(resJobHistory.data)
        console.log(resJobHistory.data )
        clearAllFields()
    }

    const handleDragedMediaChange =(file)=>{
        // prev=>({...prev, [e.target.id]: e.target.value})
        setFiles(file)
        // setFiles(prev=>([...prev, file]))
    }
  
    const handleUpdateMediaPosition = async (mediaFileList) => {

        try {
            const mediaList = {
                mediaFileList: mediaFileList,
            }
           
            const updateFilesPosition = await axios.put(`${apiUrl}/talents/${talentData._id}/files/updatePosition/${activedTab}`, mediaList);

            setTalentData(updateFilesPosition.data)
        } catch (err) {
            console.log(err)
        }
    }
    const handleDeleteTalent = async (id)=>{
        
        try {
            await axios.delete(`${apiUrl}/admin/talents/${id}`)
            Navigate('/talents')
            
        } catch (err) {
            console.log(err)
        }
    }
    return(
        
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                {
                    // loading ? "Loading" : 
                    <div className="singleWapper">

                        {   
                            showUploadModal &&
                                <div className="mainModal uploadTalentMediaModal">
                                    <div className="modalWrapper">
                                        <div className="topModal">
                                            <h2>Upload {activedTab}</h2>
                                            <CloseIcon onClick={handleCloseUploadModal} className="closeIcon" />
                                        </div>
                                        <div className="modalBody">
                                            <form  className='uploadMediaForm'>
                                                <div className="filesUploadContainer">
                                                    {
                                                        activedTab==="documents" &&
                                                        <select id="doc_type" onChange={handleDocType}>
                                                            <option value="zcard">zCard</option>
                                                            <option value="driver's licence">Driver's licence</option>
                                                            <option value="peper Work">Peper Work</option>
                                                        </select>
                                                    }
                                                    <FileUploader 
                                                        multiple={true} 
                                                        handleChange={handleDragedMediaChange} 
                                                        name="file" 
                                                        types={fileTypes} 
                                                        fileOrFiles={null}
                                                    />
                                                    {/* <p>{files ? `File name: ${files[0].name}` : "no files uploaded yet"}</p> */}
                                                    {/* <input className='uploadButton' type="file" id="file"  multiple name={activedTab} onChange={(e)=>setFiles(e.target.files)}/> */}
                                                </div>
                                                <div className="uploadPreview" >

                                                    {
                                                        
                                                        files !== "" ?
                                                          Array.from(files).map((singleFile, index)=>{
                                                                return(

                                                                    <div className="uploadPreview_Item" key={index}>
                                                                        {
                                                                           singleFile.name.split('.').pop() === "webp" ? 
                                                                            <img  src={ URL.createObjectURL(singleFile)} alt="" />
                                                                            :
                                                                            singleFile.name.split('.').pop() === "mp4" ? 
                                                                            <video src={ URL.createObjectURL(singleFile)} controls ></video>
                                                                            :
                                                                            singleFile.name.split('.').pop() === "m4v" ? 
                                                                            <video src={ URL.createObjectURL(singleFile)} controls ></video>
                                                                            :
                                                                            singleFile.name.split('.').pop() === "pdf" ?
                                                                            <span>{singleFile.name}</span>:null
                                                                        }
                                                                    </div>

                                                                )
                                                            })
                                                        : null
                                                    }
                                                </div>
                                                <button onClick={handleSaveUploads} className='saveUpload'>Save</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                        }
                        {/* <Navbar /> */}

                        {
                            showUpadateModal &&
                            <div className="mainModal updateTalentModal">
                                <div className="modalWrapper">
                                    <div className="topModal">
                                        <h2>Update Personal Details</h2>
                                        <CloseIcon onClick={handleCloseUpdateModal} className="closeIcon" />
                                    </div>
                                    <div className="modalBody">
                                        <form >
                                            <div className="selectedProfile">
                                                <img  src={ file ? URL.createObjectURL(file) : `${apiImgUrl}/uploads/profiles/${talentData.profileImg}`} alt="" />
                                                <label htmlFor="file" className="fileUploadLabel"><AddAPhotoOutlinedIcon /> Add Profile Picture</label>
                                                <input type="file" className='updatedProfile' id="file" name="profileImg" onChange={(e)=>setFile(e.target.files[0])}  />
                                            </div>
                                            <div className="formFields">
                                                <div className="fieldsContainer">
                                                    <div className="fieldItem">
                                                        <label htmlFor="name">Name</label>
                                                        <input type="text" id="name" defaultValue={talentData.name}  onChange={handleChange} />
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="surname">Surname</label>
                                                        <input type="text" id="surname"  defaultValue={talentData.surname}  onChange={handleChange} />
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="dateOfBirth">Date of birth</label>
                                                        <input type="date" id="dateOfBirth" defaultValue={talentData.dateOfBirth} onChange={handleDateOfBirthAndAge} />
                                                    </div>
                                                    
                                                </div>
                                                <div className="fieldsContainer">
                                                    <div className="fieldItem">
                                                        <label htmlFor="gender">Gender</label>
                                                        <select id="gender" defaultValue={talentData.gender}  onChange={handleChange}>
                                                            <option defaultValue >Select...</option>
                                                            <option value="2">Women</option>
                                                            <option value="1">Men</option>
                                                            <option value="0">Non-Binay</option>
                                                        </select>
                                                    </div>
                                                    
                                                    <div className="fieldItem">
                                                        <label htmlFor="specialities">Specialities</label>
                                                        <select id="specialities" multiple  onChange={handleSelectSpecialitis}>
                                                            <option defaultValue={talentData.specialities} >Select...</option>
                                                            <option value="Hands">Hands</option>
                                                            <option value="Legs&Feet">Legs{'&'}Feet</option>
                                                            <option value="Women Classics">Women Classics</option>
                                                            <option value="Women Twins Classics">Women Twins Classics</option>
                                                            <option value="Men Real Families">Men Real Families</option>
                                                        </select>
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="age">Age</label>
                                                        <input disabled type="text" id="age" defaultValue={ age !== "" ? age : talentData.age }/>
                                                    </div>
                                                    
                                                </div>
                                                <div className="fieldsContainer">
                                                    <div className="fieldItem">
                                                        <label htmlFor="phone">Phone number</label>
                                                        <input type="text" id="phone" defaultValue={talentData.phone} onChange={handleChange} />
                                                    </div>
                                                    
                                                    <div className="fieldItem">
                                                        <label htmlFor="email">Email</label>
                                                        <input type="email" id="email" defaultValue={talentData.email} onChange={handleChange} />
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="country">Country</label>
                                                        <input type="text" id="country" defaultValue={talentData.country} onChange={handleChange}/>
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="city">City</label>
                                                        <input type="text" id="city" defaultValue={talentData.city} onChange={handleChange} />
                                                    </div>
                                                    
                                                </div>
                                                <div className="fieldsContainer">
                                                    <div className="fieldItem">
                                                        <label htmlFor="arts">Arts <small>{'Separate with comma(,)'}</small></label>
                                                        <input type="text" id="arts" defaultValue={talentData.arts} onChange={handleArts} />
                                                    </div>
                                                    
                                                    <div className="fieldItem">
                                                        <label htmlFor="email">Languages <small>{'Separate with comma(,)'}</small></label>
                                                        <input type="languages" id="languages" defaultValue={talentData.languages} onChange={handleLanguages} />
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="sports">Sports <small>{'Separate with comma(,)'}</small></label>
                                                        <input type="text" id="sports" defaultValue={talentData.sports} onChange={handleSports}/>
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="otherQualities">Others <small>{'Separate with comma(,)'}</small></label>
                                                        <input type="text" id="otherQualities" defaultValue={talentData.otherQualities} onChange={handleOtherQualities}/>
                                                    </div>

                                                </div>
                                                <div className="fieldsContainer">
                                                    <div className="fieldItem">
                                                        <label htmlFor="country">Instagram</label>
                                                        <input type="text" id="instagram" defaultValue={talentData.instagram} onChange={handleSocialMediaChange}/>
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="email">Tiktik</label>
                                                        <input type="text" id="tiktok" defaultValue={talentData.tiktok} onChange={handleSocialMediaChange} />
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="facebook">Facebook</label>
                                                        <input type="text" id="facebook" defaultValue={talentData.facebook} onChange={handleSocialMediaChange} />
                                                    </div>
                                                </div>                                                   
                                                
                                                <div className="fieldsCheckContainer">
                                                    <div className="fieldCheckItem">
                                                        <input type="checkbox" id="featured" defaultChecked={talentData.featured} value={!talentData.featured} onChange={handleChange} />
                                                        <label htmlFor="featured">isFeatured</label>
                                                    </div>
                                                    <div className="fieldCheckItem">
                                                        <input type="checkbox" id="isMainboard" defaultChecked={talentData.isMainboard} value={!talentData.isMainboard} onChange={handleChange} />
                                                        <label htmlFor="isMainboard">isMainboard</label>
                                                    </div>
                                                    <div className="fieldCheckItem">
                                                        <input type="checkbox" id="isInfluencer" defaultChecked={talentData.isInfluencer} value={!talentData.isInfluencer} onChange={handleChange} />
                                                        <label htmlFor="isInfluencer">isInfluencer</label>
                                                    </div>
                                                    <div className="fieldCheckItem">
                                                        <input type="checkbox" id="isActor" defaultChecked={talentData.isActor} value={!talentData.isActor} onChange={handleChange} />
                                                        <label htmlFor="isActor">isActor</label>
                                                    </div>

                                                    <div className="fieldCheckItem">
                                                        <input type="checkbox" id="isTimeless" defaultChecked={talentData.isTimeless} value={!talentData.isTimeless} onChange={handleChange} />
                                                        <label htmlFor="isTimeless">isTimeless</label>
                                                    </div>
                                                    <div className="fieldCheckItem">
                                                        <input type="checkbox" id="isImage" defaultChecked={talentData.isImage} value={!talentData.isImage} onChange={handleChange} />
                                                        <label htmlFor="isImage">isImage</label>
                                                    </div>

                                                    

                                                </div>
                                                
                                                <div className="createBtnContainer">

                                                    <button className="createBtn" onClick={handleUpdateTalent}>Update Talent</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            showAddJobHistModal &&
                            <div className="mainModal updateTalentModal">
                                <div className="modalWrapper">
                                    <div className="topModal">
                                        <h2>Add Job History</h2>
                                        <CloseIcon onClick={handleCloseUpdateModal} className="closeIcon" />
                                    </div>
                                    <div className="modalBody">
                                        <form>
                                            <div className="formFields">
                                                <div className="fieldsContainer">
                                                    <div className="fieldItem">
                                                        <label htmlFor="product">Product</label>
                                                        <input type="text" id="product"  onChange={handleJobHistoryChange}/>
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="year">Year</label>
                                                        <input type="text" id="year"  onChange={handleJobHistoryChange}/>
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="duraction">Duraction</label>
                                                        <input type="text" id="duraction" onChange={handleJobHistoryChange} />
                                                    </div>
                                                </div>
                                                <div className="fieldsContainer">
                                                    
                                                    <div className="fieldItem">
                                                        <label htmlFor="exclusivity">Exclusivity</label>
                                                        <input type="text" id="exclusivity" onChange={handleJobHistoryChange}/>
                                                    </div>
                                                    
                                                    <div className="fieldItem">
                                                        <label htmlFor="territories">Territories</label>
                                                        <input type="text" id="territories" onChange={handleJobHistoryChange} />
                                                    </div>

                                                    <div className="fieldItem">
                                                        <label htmlFor="featured">Featured</label> 
                                                        <select id="featured" onChange={handleJobHistoryChange}>
                                                            <option value={true} >Yes</option>
                                                            <option value={false}>No</option>
                                                        </select>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div className="createBtnContainer">

                                                    <button className="createBtn" onClick={handleAddTalentJobHistory}>Add Job History</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            showUpadateJobHistModal &&
                            <div className="mainModal updateTalentModal">
                                <div className="modalWrapper">
                                    <div className="topModal">
                                        <h2>Update Job History</h2>
                                        <CloseIcon onClick={handleCloseUpdateModal} className="closeIcon" />
                                    </div>
                                    <div className="modalBody">
                                        <form>
                                            <div className="formFields">
                                                <div className="fieldsContainer">
                                                    <div className="fieldItem">
                                                        <label htmlFor="product">Product</label>
                                                        <input type="text" id="product" defaultValue={product}  onChange={handleJobHistoryChange}/>
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="year">Year</label>
                                                        <input type="text" id="year" defaultValue={year}  onChange={handleJobHistoryChange}/>
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="duraction">Duraction</label>
                                                        <input type="text" id="duraction" defaultValue={duraction} onChange={handleJobHistoryChange} />
                                                    </div>
                                                </div>
                                                <div className="fieldsContainer">
                                                    
                                                    <div className="fieldItem">
                                                        <label htmlFor="exclusivity">Exclusivity</label>
                                                        <input type="text" id="exclusivity" defaultValue={exclusivity} onChange={handleJobHistoryChange}/>
                                                    </div>
                                                    
                                                    <div className="fieldItem">
                                                        <label htmlFor="territories">Territories</label>
                                                        <input type="text" id="territories" defaultValue={territories} onChange={handleJobHistoryChange} />
                                                    </div>

                                                    <div className="fieldItem">
                                                        <label htmlFor="featured">Featured</label> 
                                                        <select id="featured" value={featured} onChange={handleJobHistoryChange}>
                                                            <option value={true} >Yes</option>
                                                            <option value={false}>No</option>
                                                        </select>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div className="createBtnContainer">
                                                    <button className="createBtn" onClick={handleUpdateTalentJobHistory}>Update Job History</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="top">
                            <div className="mainCenter mainTop">
                                
                                <h1 className="tile">Information</h1>
                                <div className="singleActions">
                                <span 
                                    onClick={()=>{navigator.clipboard.writeText(`${urlDomain}/talent/${talentData._id}`)}}
                                    className="copyLink iconBtn"
                                > 
                                    <RiLinksLine /> 
                                    <span className='iconText'>Copy Link</span>
                                </span>
                                <span 
                                    onClick={()=>handleDeleteTalent(talentData._id)}
                                    className="deleteBtn iconBtn"> 
                                    <RiDeleteBinLine /> 
                                    <span className='iconText'>Delete</span>
                                </span>
                                </div>
                                <div className="item">
                                    <div className="left">
                                        <div className="imgContainer">
        
                                            <img  
                                                src={ 
                                                    talentData.profileImg ? 
                                                    `${apiImgUrl}/uploads/profiles/${talentData.profileImg}` : 
                                                    'https://via.placeholder.com/250x350'
                                                } alt="" 
                                            />
                                        </div>
                                        
                                        {/* <img src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="itemImg" /> */}
                                    
                                        <div className="details">
                                            <div className="editBtn" onClick={()=>setShowUpadateModal(true)}>Edit</div>
                                            <h1 className="talentName">{talentData.name} {talentData?.surname}</h1>
                                            <div className="detailsItem">
                                                <span className="itemValue"><PlaceIcon/> {talentData?.country}, {talentData.city}</span>
                                                <span className='genderAge' style={{textTransform:'capitalize'}}> {talentData.gender === 1 ? 'Men' : talentData.gender === 2 ? 'Women' : 'Non-Binary'} {talentData.age} years old</span>
                                            </div>
                                            <div className="detailsItem">
                                                
                                                <span className="itemValue">{talentData.email && <MailOutlineIcon/>}{talentData.email}</span>
                                            </div>
                                            <div className="detailsItem">
                                                
                                                <span className="itemValue">{talentData.phone && <PhoneIcon/>} {talentData.phone}</span>
                                            </div>
                                            <div className="detailsItem socialContainer">
                                                
                                                <span className="itemValue ">
                                                    {
                                                        talentData.socialMedia !==undefined && talentData.socialMedia.length > 0 &&

                                                        talentData.socialMedia.map((socialItem)=>(
                                                            
                                                            <a 
                                                                key={socialItem._id}
                                                                style={{textDecoration:'none'}} 
                                                                href={
                                                                    socialItem.facebook ? 'https://'+socialItem.facebook : 
                                                                    socialItem.tiktok ? 'https://'+socialItem.tiktok :
                                                                    socialItem.instagram ? 'https://'+socialItem.instagram : ''
                                                                } 
                                                                target="_blank" rel="noopener noreferrer"
                                                            >
                                                                {
                                                                    socialItem.facebook ? 
                                                                        <FacebookIcon className='socialIcon' /> : 
                                                                    socialItem.tiktok ?
                                                                        <FaTiktok className='socialIcon' /> :
                                                                    socialItem.instagram ?
                                                                        <InstagramIcon className='socialIcon' /> :
                                                                    ''
                                                                }
                                                                
                                                            </a>
                                                        ))
                                                    }
                                                    
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <h1 className='tile'>Job History</h1>
                                        <div className="editBtn" onClick={()=>setShowAddJobHistModal(true)}>+ Add</div>
                                        {
                                            talentData.jobHistory !==undefined && talentData.jobHistory.length > 0 &&
                                            talentData.jobHistory.map((jobHistoryItem)=>(
                                                <div className="singleJobHistoryContainer" key={jobHistoryItem._id}>
                                                    <div className="jobHtitle">
                                                        <span className='jobName'>{jobHistoryItem.product}</span>
                                                        <div className='jobHistoryActions'>
                                                            <RiEdit2Fill onClick={()=>handleShowUpdateTalentJobHistory(jobHistoryItem)}/>
                                                            <RiDeleteBack2Fill className='deleteJobHistoryIcon' onClick={()=>handleDeleteJobHistory(jobHistoryItem._id)}/>
                                                        </div>
                                                    </div>
                                                    <div className="jobHDetails">
                                                        <div className="jobTop">
                                                            <span>Year <br/> <span className='jbInfo'>{jobHistoryItem.year}</span></span>
                                                            <span>Duraction <br/> <span className='jbInfo'>{jobHistoryItem.duraction}</span></span>
                                                            <span>Exclusive <br/> <span className='jbInfo'>{jobHistoryItem.exclusivity}</span></span>
                                                        </div>
                                                        <div className="jobBottom">
                                                            <span style={{flex:3,textAlign:'left'}}>Territories  <br/>
                                                                <span className='jbInfoTerritories'>

                                                                    {

                                                                        jobHistoryItem.territories.map((territory, idx)=>(
                                                                            <span className='jbInfo' key={idx}>{territory}</span>
                                                                        ))
                                                                    }
                                                                </span>
                                                            </span>
                                                            <span>Featured <br/> <span className='jbInfo'> {jobHistoryItem.featured === true ? 'Yes':'No'}</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
        
                                <div className="actionTabs">
                                    <a 
                                        href='#portfoleo' 
                                        className={
                                            activedTab==="portfoleo"?'actionTabitem active':'actionTabitem'
                                        }
                                    >Portfoleo</a>
                                    <a 
                                        href='#polaroids' 
                                        className={
                                            activedTab==="polaroids"?'actionTabitem active':'actionTabitem'
                                        }
                                    >Polaroids</a>
                                    <a 
                                        href='#videos' 
                                        className={
                                            activedTab==="videos"?'actionTabitem active':'actionTabitem'
                                        }
                                    >Videos</a>
                                    <a 
                                        href='#physical_details' 
                                        className={
                                            activedTab==="physical_details"?'actionTabitem active':'actionTabitem'
                                        }
                                    >Sizes</a>
                                    <a 
                                        href='#documents' 
                                        className={
                                            activedTab==="documents"?'actionTabitem active':'actionTabitem'
                                        }
                                    >Documents</a>
                                    
                                </div>
                            </div>
                        </div>
                        {
                            activedTab==="portfoleo" ? 
                                <Portfolio 
                                    portfoleo={talentData.portfoleo} 
                                    baseMediaUrl={baseMediaUrl}  
                                    setShowUploadModal={setShowUploadModal} 
                                    handleDeleteMedia={(event,mediaId) => handleDeleteMedia(event, mediaId)}
                                    handleUpdateMediaPosition={(mediaList) => handleUpdateMediaPosition(mediaList)}
                                /> :
                            activedTab==="polaroids" ? 
                                <Polaroids 
                                    polaroids={talentData.polaroids} 
                                    baseMediaUrl={baseMediaUrl} 
                                    setShowUploadModal={setShowUploadModal}
                                    handleDeleteMedia={(event,mediaId) => handleDeleteMedia(event, mediaId)}
                                    handleUpdateMediaPosition={(mediaList) => handleUpdateMediaPosition(mediaList)}
                                /> : 
                            activedTab==="videos" ? 
                                <Videos 
                                    videos={talentData.videos} 
                                    baseMediaUrl={baseMediaUrl} 
                                    setShowUploadModal={setShowUploadModal}
                                    handleDeleteMedia={(event,mediaId) => handleDeleteMedia(event, mediaId)}
                                    handleUpdateMediaPosition={(mediaList) => handleUpdateMediaPosition(mediaList)}
                                /> :
                            activedTab==="physical_details" ? 
                            <PhysicalDetails talentData={talentData.sizes} talentGender={talentData.gender} /> :
                            activedTab==="documents" && 
                            <Documents 
                                documents={talentData.documents}
                                baseMediaUrl={baseMediaUrl} 
                                setShowUploadModal={setShowUploadModal}
                                // handleDeleteMedia={(event,mediaId) => handleDeleteMedia(event, mediaId)}
                            /> 
                        }
                    </div>
                }
                
                
            </div>
        </div>
    )
}

export default Single;