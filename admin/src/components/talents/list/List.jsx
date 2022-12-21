import Card from "../card/Card";
import "./list.scss";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { FiMove } from "react-icons/fi"
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import axios from "axios";

import { DragDropContext,  Droppable, Draggable } from 'react-beautiful-dnd'

const List = () => {
    const [seachTalent, setSeachTalent] = useState('')
    const [searchCategory, setSearchCategory] = useState('all')
    const apiImgUrl = process.env.REACT_APP_API_IMG_URL
    const apiUrl = process.env.REACT_APP_API_URL //API main URL

    const [getTalents, setGetTalents] = useState([]);

    
    useEffect(()=>{
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_URL
        })
        const fetchTalent = async () =>{
            const res = await axiosInstance.get(`/admin`);
            setGetTalents(res.data)
        }
        fetchTalent()
    },[])
    

     //SEACH TALENTS
    const handleAdminSeachCategory =(e) =>{
        setSearchCategory(e.target.value)
    } 
    const handleAdminSeach =(e) =>{
        setSeachTalent(e.target.value)
    } 
    console.log(searchCategory);
    console.log(seachTalent);
    
    const handleSearchGender = (e)=>{

        setSearchCategory('gender')
        setSeachTalent(e.target.value)
    }
    const handleSearchAge = (e)=>{

        setSearchCategory('age')
        setSeachTalent(e.target.value)
    }

    // SEAHC OPTIONS
    useEffect(()=>{

        const fetchTalent = async () =>{
            const axiosInstance = axios.create({
                baseURL: process.env.REACT_APP_API_URL
            })
            
            if(searchCategory==='all'){
                const res = await axiosInstance.get(`/admin`);
                setGetTalents(res.data);
            }else if(searchCategory==='featured'){

                const res = await axiosInstance.get(`/talents/featured`);
                setGetTalents(res.data);
            }else{
                const res = await axiosInstance.get(`/admin/talents/search_result?search_category=${searchCategory}&search=${seachTalent}`);
                setGetTalents(res.data);
            }
          
        }
        fetchTalent()
 
    
    },[seachTalent, searchCategory])

    const handleDelete = async (id)=>{
        
        try {
            const res = await axios.delete(`${apiUrl}/admin/talents/${id}`)
            setGetTalents(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleFeatured = async (id, isFeatured)=>{
        const isTalentFeatured = !isFeatured;
        const featureTalent = {
            featured: isTalentFeatured,
        }


        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_URL
        })
        try {
            await axiosInstance.put(`/talents/${id}`, featureTalent)

            if(searchCategory==='featured'){
                const res = await axiosInstance.get(`/talents/featured`);
                setGetTalents(res.data);
            }else{
                const res = await axiosInstance.get(`/admin`);
                setGetTalents(res.data);
            }
        } catch (err) {
            console.log(err)
        }

    }
    

    const [showRegisterModal, setShowRegisterModal] = useState(false)


    //CREATE TALENT
    const [file, setFile] = useState("");
    
    const [info, setInfo] = useState({})
    const [dateOfBirth, setDateOfBirth] = useState()
    const [age, setAge] = useState()
    
    const handleCloseRgisterModal = () => {
        setInfo({});
        setFile('');
        setAge('');
        setDateOfBirth('');
        setShowRegisterModal(false);
    }

    
    const handleChange = (e) =>{
        setInfo(prev=>({...prev, [e.target.id]: e.target.value}))
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

    // const [newFileNate, setNewFileNate] = useState('')
    const handleCreateTalent = async (e) => {
        e.preventDefault();
        const filedata = new FormData()
        filedata.append("profileImg", file);//transforming the file into formData
        // data.append("upload_preset", "upload")//providing the upload_preset and the folder name(upload) where will be stored in couldinary
        try {
            const uploadRes = await axios.post(
                `${apiUrl}/talents/upload/profile`, 
                filedata
            );
          
            const pFileName = uploadRes.data.filename
            const newTalent = {
                ...info,
                dateOfBirth: dateOfBirth,
                age: age, 
                profileImg: pFileName
            };//getting all the user info from the form and the image url  to be saved(created)
            
            const res = await axios.post(`${apiUrl}/talents`, newTalent);//sending register request to the API to register a user
            console.log("After creating")
            console.log(res.data )
            setGetTalents(res.data)
        } catch (error) {
            console.log(error)
        }

        //CLEANING UP AFTER DREATING TALENT
        setInfo({});
        setFile('');
        setShowRegisterModal(false)
    }

    //SORT FEATURED TALENTS
    const handleUpdateTalentPosition = async (talentListNewOrder) => {

        
        try {
            const talentListOrder = {
                talentList: talentListNewOrder,
            }
            console.log(talentListOrder)
            const axiosInstance = axios.create({
                baseURL: process.env.REACT_APP_API_URL
            })
            const updateFilesPosition = await axiosInstance.put(`/talents/featuredPosition`, talentListOrder);

            setGetTalents(updateFilesPosition.data)
        } catch (err) {
            console.log(err)
        }
    }
    const onDragEnd = async result =>{
        const { destination, source} = result;
        if(!destination) return;
        if(destination.droppableId === source.draggableId && destination.index === source.index)return;
        
        const newList = [...getTalents]
        const [removed] = newList.splice(source.index, 1)
        newList.splice(destination.index, 0, removed)

        
        handleUpdateTalentPosition(newList)
    }
    
    
    if(searchCategory === 'featured'){
        getTalents?.sort((a, b) => b.position - a.position)   
    }
    return (
        <div className="list">
            {
                showRegisterModal &&
                <div className="registerTalentModal">
                    <div className="modalWrapper">
                        <div className="topModal">
                            <h2>Personal Details</h2>
                            <CloseIcon onClick={handleCloseRgisterModal} className="closeIcon" />
                        </div>
                        <div className="modalBody">
                            <form>
                                <div className="selectedProfile">
                                    <img  src={ file ? URL.createObjectURL(file) : 'https://via.placeholder.com/250x350'} alt="" />
                                    <label htmlFor="file" className="fileUploadLabel"><AddAPhotoOutlinedIcon /> Add Profile Picture</label>
                                    <input type="file" id="file" name="profileImg" onChange={(e)=>setFile(e.target.files[0])}  />
                                </div>
                            
                                <div className="formFields">

                                    <div className="fieldsContainer">
                                        <div className="fieldItem">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" id="name"  onChange={handleChange}/>
                                        </div>
                                        <div className="fieldItem">
                                            <label htmlFor="surname">Surname</label>
                                            <input type="text" id="surname"  onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="fieldsContainer">
                                        <div className="fieldItem">
                                            <label htmlFor="dateOfBirth">Date of birth</label>
                                            <input type="date" id="dateOfBirth" onChange={handleDateOfBirthAndAge} />
                                        </div>
                                        <div className="fieldItem">
                                            <label htmlFor="age">Age</label>
                                            <input disabled type="text" id="age" value={age} style={{width:'40%', padding:'0.5em'}}/>
                                        </div>
                                        <div className="fieldItem">
                                            <label htmlFor="gender">Gender</label>
                                            <select id="gender" onChange={handleChange}>
                                                <option defaultValue >Select...</option>
                                                <option value="2">Women</option>
                                                <option value="1">Men</option>
                                                <option value="0">Non-Binay</option>
                                            </select>
                                            
                                        </div>
                                    </div>
                                    <div className="fieldsContainer">
                                        <div className="fieldItem">
                                        
                                            <label htmlFor="country">Country</label>
                                            <input type="text" id="country" onChange={handleChange}/>
                                            
                                        </div>
                                        <div className="fieldItem">
                                            <label htmlFor="city">City</label>
                                            <input type="text" id="city" onChange={handleChange} />
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

                                        
                                    </div>
                                    
                                    <div className="createBtnContainer">

                                        <button className="createBtn" onClick={handleCreateTalent}>Create</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }

            <div className="listActionSection">
                <div className="searchTalent">
                    <select name="" className="searchCategory" onChange={handleAdminSeachCategory}>
                        <option value="all">All</option>
                        <option value="featured">Featured</option>
                        <option value="gender">Gender</option>
                        <option value="age">Age</option>
                        <option value="city">City</option>
                        <option value="languages">Language</option>
                        <option value="sports">Sports</option>
                    </select>
                    {
                        searchCategory === 'age' &&
                        <select name="" className="searchAgeCategory" onChange={handleSearchAge}>
                            <option value="">Equal</option>
                            <option value="lt">Less then</option>
                            <option value="gt">Greater then</option>
                        </select>
                    }
                    {
                        searchCategory === 'gender' &&
                        
                        <select id="gender" onChange={handleSearchGender} className="searchAgeCategory">
                            <option defaultValue >Select...</option>
                            <option value="2">Women</option>
                            <option value="1">Men</option>
                            <option value="0">Non-Binay</option>
                        </select>
                    }
                    {
                        searchCategory === 'gender' ? searchCategory === 'age' :  
                        <>
                        
                            <input 
                            onChange={handleAdminSeach}
                            type="text" 
                            name="search" 
                            id="searchT" 
                            className="searchInput" 
                            placeholder="Seach Talent"
                            />
                            <SearchOutlined className="sIcon"/>
                        
                        </>
                       
                    }
                </div>
                <button 
                    onClick={()=>setShowRegisterModal(true)}
                    className="createTalentBtn"
                ><PersonAddAltIcon /> Create Talente</button>
            </div>
            <DragDropContext
                onDragEnd={onDragEnd}
            >

                <div className="lWrapper talentsListWrapper">
                    {
                        // loading ? "Is Loading" : 
                        <Droppable 
                            droppableId="talents001"
                            direction="horizontal"
                        >
                            {
                                (provided) => (
                                    <div className="lCardContainer"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {
                                            getTalents?.map((talent, idx) => (
                                                <Draggable
                                                    draggableId={talent._id}
                                                    key={talent._id}
                                                    index={idx}
                                                >
                                                    {
                                                        (provided)=>(
                                                            
                                                            <div 
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className="talentCardContainer" 
                                                            >
                                                                <div className={searchCategory !== 'featured' ? 'moveContainer inactive' : 'moveContainer'}>
                                                                    <span 
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <FiMove className="imgDeleteBtnGrab"/>
                                                                    </span>
                                                                </div>
                                                                
                                                                <div className="actionContauner">
                                                                    <MoreVertIcon className="actionIcon" />
                                                                    <div className="actionOptions">
                                                                        <span onClick={()=>handleFeatured(talent._id, talent.featured)} className={talent.featured ? 'optionItem active' : 'optionItem'}>Feature</span>
                                                                        {/* <span className="optionItem">Edit</span> */}
                                                                        <span onClick={()=>handleDelete(talent._id)} className="optionItem">Delete</span>
                                                                    </div>
                                                                </div>
                                                                
                                                                <Card singleCard={talent} apiImgUrl={apiImgUrl}/>
                                                            
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                )
                            }
                        </Droppable>
                    }
                </div>
            </DragDropContext>
        </div>
    )
}

export default List