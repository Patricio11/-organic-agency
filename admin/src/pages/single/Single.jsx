import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
// import Navbar from '../../components/navbar/Navbar';
// import Chart from '../../components/chart/Chart';

import PlaceIcon from '@mui/icons-material/Place';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
// import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { FaTiktok } from 'react-icons/fa'
import Portfolio from '../../components/single/portfolio/Portfolio';
import Polaroids from '../../components/single/polaroids/Polaroids';
import Videos from '../../components/single/videos/Videos';
import PhysicalDetails from '../../components/single/physicalDetails/PhysicalDetails';
// import Actions from '../../components/single/actions/Actions';
import { /*Link,*/ useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
// import useFetch from "../../components/hooks/useFetch"

import axios from 'axios';
import Documents from '../../components/single/documents/Documents';
import { RiDeleteBack2Fill, RiEdit2Fill } from 'react-icons/ri';


const Single = () => {
    const location = useLocation();

    const talent_id = location.pathname.split('/').pop(); // using pop() funtion to get last element form the split
    // let urlTab = location.hash;
    // const [hashUrl, setHashUrl] = useState('');
    
    const [talentData, setTalentData] = useState([]);
    // const [urlToFetch, setUrlToFetch] = useState("");

    
    const apiImgUrl = process.env.REACT_APP_API_IMG_URL
    // const apiImgUrl = "http://localhost:8800" //API main URL
    const apiUrl = process.env.REACT_APP_API_URL //API main URL
    // const apiUrl = "http://localhost:8800/api" //API main URL
    // const {data, loading /*, error*/} = useFetch(
    //     `${apiUrl}/find/${talent_id}`
    // )
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
            
            const newList = list.map((listItem)=>{
                let allFiles = [];

                allFiles.push(
                    {
                        "filename":listItem
                    }
                );

                return allFiles[0];
            })
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
    // refresh()
        setTalentData(updatedMediaFile.data)
    }

    const [infoToUpdate, setInfoToUpdate] = useState({})
    const [jobHistoryToUpdate, setJobHistoryToUpdate] = useState({})
    const [socialMediaToUpdate, setSocialMediaToUpdate] = useState({})
    const [showUpadateModal, setShowUpadateModal] = useState(false)
    const [showUpadateJobHistModal, setShowUpadateJobHistModal] = useState(false)

    const [dateOfBirth, setDateOfBirth] = useState()
    const [age, setAge] = useState()
    
    const handleCloseUpdateModal = () => {
        setInfoToUpdate({});
        setShowUpadateModal(false);
        setShowUpadateJobHistModal(false)
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
    }
    
    const handleUpdateTalent = async (e)=>{
        e.preventDefault()
        console.log(infoToUpdate)  
        
        const updateTalentInfo = {
            ...infoToUpdate, 
            dateOfBirth: dateOfBirth,
            age: age,
            specialities: specialities,
            sports: sports,
            arts: arts,
            languages: laguanges,
            otherQualities: otherQualities
        };//getting all the user info from the form and the image url  to be saved(created)
        
        const socials = {
            socialMedia: socialMediaToUpdate,
        }


        const res = await axios.put(`${apiUrl}/talents/${talent_id}`, updateTalentInfo);//sending register request to the API to register a user
        console.log("After creating")
        console.log(res.data )
        const resSocials = await axios.put(`${apiUrl}/talents/social/${talent_id}`, socials);//sending register request to the API to register a user
        setTalentData(resSocials.data)
        setShowUpadateModal(false)
        clearAllFields()
    }
    const handleAddTalentJobHistory = async (e)=>{
        e.preventDefault()

        const jobHistory = {
            jobHistory: jobHistoryToUpdate
        }
        
        const resJobHistory = await axios.put(`${apiUrl}/talents/social/${talent_id}`, jobHistory);//sending register request to the API to register a user
        setTalentData(resJobHistory.data)
        console.log(resJobHistory.data )
        setShowUpadateJobHistModal(false)
        clearAllFields()
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
        // setShowUpadateJobHistModal(false)
        clearAllFields()
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
                                                <div className="selectedProfile">
                                                    {/* <img  src={ files ? URL.createObjectURL(files) : 'https://via.placeholder.com/250x350'} alt="" /> */}
                                                    {/* <label htmlFor="file" className="fileUploadLabel">
                                                        <span>
                                                            <AddAPhotoOutlinedIcon /> Add {activedTab} pictures
                                                        </span>
                                                    </label> */}
                                                    {
                                                        activedTab==="documents" &&
                                                        <select id="doc_type" onChange={handleDocType}>
                                                            <option value="zcard">zCard</option>
                                                            <option value="driver's licence">Driver's licence</option>
                                                            <option value="peper Work">Peper Work</option>
                                                        </select>
                                                    }
                                                    <input className='uploadButton' type="file" id="file"  multiple name={activedTab} onChange={(e)=>setFiles(e.target.files)}/>
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
                                        <form>
                                            <div className="formFields">
                                                <div className="fieldsContainer">
                                                    <div className="fieldItem">
                                                        <label htmlFor="name">Name</label>
                                                        <input type="text" id="name"  onChange={handleChange} placeholder={talentData.name}/>
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="surname">Surname</label>
                                                        <input type="text" id="surname"  onChange={handleChange} placeholder={talentData.surname}/>
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="dateOfBirth">Date of birth</label>
                                                        <input type="date" id="dateOfBirth" onChange={handleDateOfBirthAndAge} />
                                                    </div>
                                                    
                                                </div>
                                                <div className="fieldsContainer">
                                                    <div className="fieldItem">
                                                        <label htmlFor="gender">Gender</label>
                                                        <select id="gender" onChange={handleChange}>
                                                            <option defaultValue >Select...</option>
                                                            <option value="2">Women</option>
                                                            <option value="1">Men</option>
                                                            <option value="0">Non-Binay</option>
                                                        </select>
                                                    </div>
                                                    
                                                    <div className="fieldItem">
                                                        <label htmlFor="specialities">Specialities</label>
                                                        <select id="specialities" multiple  onChange={handleSelectSpecialitis}>
                                                            <option defaultValue >Select...</option>
                                                            <option value="Hands">Hands</option>
                                                            <option value="Legs&Feet">Legs{'&'}Feet</option>
                                                            <option value="Women Classics">Women Classics</option>
                                                            <option value="Women Twins Classics">Women Twins Classics</option>
                                                            <option value="Men Real Families">Men Real Families</option>
                                                        </select>
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="age">Age</label>
                                                        <input disabled type="text" id="age" value={age}/>
                                                    </div>
                                                    
                                                </div>
                                                <div className="fieldsContainer">
                                                    <div className="fieldItem">
                                                        <label htmlFor="phone">Phone number</label>
                                                        <input type="text" id="phone" onChange={handleChange} />
                                                    </div>
                                                    
                                                    <div className="fieldItem">
                                                        <label htmlFor="email">Email</label>
                                                        <input type="email" id="email" onChange={handleChange} />
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="country">Country</label>
                                                        <input type="text" id="country" onChange={handleChange}/>
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="city">City</label>
                                                        <input type="text" id="city" onChange={handleChange} />
                                                    </div>
                                                    
                                                </div>
                                                <div className="fieldsContainer">
                                                    <div className="fieldItem">
                                                        <label htmlFor="arts">Arts <small>{'Separate with comma(,)'}</small></label>
                                                        <input type="text" id="arts" onChange={handleArts} />
                                                    </div>
                                                    
                                                    <div className="fieldItem">
                                                        <label htmlFor="email">Languages <small>{'Separate with comma(,)'}</small></label>
                                                        <input type="languages" id="languages" onChange={handleLanguages} />
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="sports">Sports <small>{'Separate with comma(,)'}</small></label>
                                                        <input type="text" id="sports" onChange={handleSports}/>
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="otherQualities">Others <small>{'Separate with comma(,)'}</small></label>
                                                        <input type="text" id="otherQualities" onChange={handleOtherQualities}/>
                                                    </div>

                                                </div>
                                                <div className="fieldsContainer">
                                                    <div className="fieldItem">
                                                        <label htmlFor="country">Instagram</label>
                                                        <input type="text" id="instagram" onChange={handleSocialMediaChange}/>
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="email">Tiktik</label>
                                                        <input type="text" id="tiktok" onChange={handleSocialMediaChange} />
                                                    </div>
                                                    <div className="fieldItem">
                                                        <label htmlFor="facebook">Facebook</label>
                                                        <input type="text" id="facebook" onChange={handleSocialMediaChange} />
                                                    </div>
                                                </div>                                                   
                                                
                                                <div className="fieldsCheckContainer">
                                                    <div className="fieldCheckItem">
                                                        <input type="checkbox" id="featured" value={true} onChange={handleChange} />
                                                        <label htmlFor="featured">isFeatured</label>
                                                    </div>
                                                    <div className="fieldCheckItem">
                                                        <input type="checkbox" id="isMainboard" value={true} onChange={handleChange} />
                                                        <label htmlFor="isMainboard">isMainboard</label>
                                                    </div>
                                                    <div className="fieldCheckItem">
                                                        <input type="checkbox" id="isInfluencer" value={true} onChange={handleChange} />
                                                        <label htmlFor="isInfluencer">isInfluencer</label>
                                                    </div>
                                                    <div className="fieldCheckItem">
                                                        <input type="checkbox" id="isActor" value={true} onChange={handleChange} />
                                                        <label htmlFor="isActor">isActor</label>
                                                    </div>

                                                    <div className="fieldCheckItem">
                                                        <input type="checkbox" id="isTimeless" value={true} onChange={handleChange} />
                                                        <label htmlFor="isTimeless">isTimeless</label>
                                                    </div>
                                                    <div className="fieldCheckItem">
                                                        <input type="checkbox" id="isImage" value={true} onChange={handleChange} />
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
                            showUpadateJobHistModal &&
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
                                                        <input type="text" id="featured" onChange={handleJobHistoryChange} />
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
                        <div className="top">
                            <div className="mainCenter mainTop">
                                
                                <h1 className="tile">Information</h1>
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
                                        <div className="editBtn" onClick={()=>setShowUpadateJobHistModal(true)}>+ Add</div>
                                        {
                                            talentData.jobHistory !==undefined && talentData.jobHistory.length > 0 &&
                                            talentData.jobHistory.map((jobHistoryItem)=>(
                                                <div className="singleJobHistoryContainer" key={jobHistoryItem._id}>
                                                    <div className="jobHtitle">
                                                        <span className='jobName'>{jobHistoryItem.product}</span>
                                                        <div className='jobHistoryActions'>
                                                            <RiEdit2Fill />
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
                                                            <span>Featured <br/> <span className='jbInfo'> {jobHistoryItem.featured ? 'Yes':'No'}</span></span>
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
                                    >Physical Details</a>
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
                                /> :
                            activedTab==="polaroids" ? 
                                <Polaroids 
                                    polaroids={talentData.polaroids} 
                                    baseMediaUrl={baseMediaUrl} 
                                    setShowUploadModal={setShowUploadModal}
                                    handleDeleteMedia={(event,mediaId) => handleDeleteMedia(event, mediaId)}
                                /> : 
                            activedTab==="videos" ? 
                                <Videos 
                                    videos={talentData.videos} 
                                    baseMediaUrl={baseMediaUrl} 
                                    setShowUploadModal={setShowUploadModal}
                                    handleDeleteMedia={(event,mediaId) => handleDeleteMedia(event, mediaId)}
                                /> :
                            activedTab==="physical_details" ? 
                            <PhysicalDetails talentData={talentData.sizes} /> :
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