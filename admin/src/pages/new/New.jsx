import './new.scss';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import axios from 'axios';


const New = ({inputs, title}) =>{
    const apiUrl = "http://localhost:8800/api" //API main URL
    
    const [file, setFile] = useState("");
    
    const [info, setInfo] = useState({})

    const handleChange = (e) =>{
        setInfo(prev=>({...prev, [e.target.id]: e.target.value}))
    }

    const handleSaveUser = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append("file", file);//transforming the file into formData
        data.append("upload_preset", "upload")//providing the upload_preset and the folder name(upload) where will be stored in couldinary
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/patrydev11/image/upload", 
                data
            );

            const {url} = uploadRes.data // destruturing the uploadRes.data object to get only the (url)
            
            const newUser = {
                ...info,
                img: url
            };//getting all the user info from the form and the image url  to be saved(created)

            await axios.post(`${apiUrl}/auth/register`, newUser);//sending register request to the API to register a user
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className='top'>
                    <h1>{title}</h1>
                </div>
                <div className='bottom'>
                    <div className="left">
                        <img 
                            // Using URL.createObjectURL() method to creat new local path for the file to display(preview)
                            src={ file ? URL.createObjectURL(file) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'}
                            alt=''
                        />
                    </div>
                    <div className="right">
                        <form >
                            <div className="formInput">
                                <label htmlFor="file">
                                   Image:  <DriveFolderUploadOutlinedIcon className='icon' />
                                </label>
                                <input type="file" onChange={(e)=>setFile(e.target.files[0])} id="file"  style={{display:'none'}}/>
                            </div>

                            {
                                inputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label htmlFor="">{input.label}</label>
                                        <input 
                                            type={input.type} 
                                            onChange={handleChange} 
                                            placeholder={input.placeholder} 
                                            id={input.id}
                                        />
                                    </div>
                                ))
                            }
                           
                            <button onClick={handleSaveUser}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default New;