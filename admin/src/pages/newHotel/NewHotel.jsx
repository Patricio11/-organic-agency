import './newHotel.scss';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import axios from 'axios';
import { hotelInputs } from '../../formSource';
import useFetch from '../../components/hooks/useFetch';


const NewHotel = () =>{
    const apiUrl = "http://localhost:8800/api" //API main URL
    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({})
    const [rooms, setRooms] = useState([])

    const handleChange = (e) =>{
        setInfo(prev=>({...prev, [e.target.id]: e.target.value}))
    }
    const {data, loading} = useFetch(`${apiUrl}/rooms`); //To get the data based on the url page
    
    const handleSelectRoom = (e) =>{
        // console.log(e.target.selectedOptions);//return an HTMLCollection needs to be converted into array
        const value = Array.from(
            e.target.selectedOptions, 
            (option)=>option.value
        );//Converting HTMLCollection into Array and getting only the value
        setRooms(value)
    }
    const handleSaveHotel = async (e) =>{
        // e.presentDefault();
        try {
            //Promise.all use when you want to (map) into a api request
            const imgUrlList = await Promise.all(
                //The files is not an arry we need to transform into array by using Object.values(filesVarieble)
                Object.values(files).map(async( file)=>{
                    const data = new FormData()
                    data.append("file", file);//transforming the file into formData
                    data.append("upload_preset", "upload")//providing the upload_preset and the folder name(upload) where will be stored in couldinary
                
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/patrydev11/image/upload", 
                        data
                    );//To save the image into the could server (cloudinary)
        
                    const {url} = uploadRes.data // destruturing the uploadRes.data object to get only the (url)
                    return url;
                }
            ));//To upload and get the list of (URL) of all uploaded images

            const newHotel = {
                ...info,
                rooms,
                photos: imgUrlList
            }//Creating an object that holds all the hotel info to be saved in DB
        
            await axios.post(`${apiUrl}/hotels`, newHotel)//Sending the axios request to save the Hotel
        } catch (error) {
            
        }
    }
    return(
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className='top'>
                    <h1>Add new Hotel</h1>
                </div>
                <div className='bottom'>
                    <div className="left">
                        <img 
                            // Using URL.createObjectURL() method to creat new local path for the file to display(preview)
                            src={ files ? URL.createObjectURL(files[0]) : 
                                'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                            }
                            alt=''
                        />
                    </div>
                    <div className="right">
                        <form >
                            <div className="formInput">
                                <label htmlFor="file">
                                   Image:  <DriveFolderUploadOutlinedIcon className='icon' />
                                </label>
                                <input type="file" multiple onChange={(e)=>setFiles(e.target.files)} id="file"  style={{display:'none'}}/>
                            </div>

                            {

                                hotelInputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label htmlFor="">{input.label}</label>
                                        <input 
                                            onChange={handleChange}
                                            type={input.type} 
                                            id={input.id} 
                                            placeholder={input.placeholder} 
                                        />
                                    </div>
                                ))
                            }
                            <div className="formInput">
                                <label htmlFor="">Featured</label>
                                <select onChange={handleChange} id="featured">
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>
                            <div className="selectRooms">
                                <label htmlFor="">Rooms</label>
                                <select id="rooms" multiple onChange={handleSelectRoom} >
                                    {
                                        loading ? "Loading" : data && data.map((room)=>(
                                            <option value={room._id} key={room._id} >{room.title}</option>
                                        ))
                                    }
                                </select>
                            </div>
                           
                            <button onClick={handleSaveHotel} >Save</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default NewHotel;