import '../presentation/presentation.scss'
import SinglePresentation from '../../components/presentations/single/SinglePresentation'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'



const PublicPresentation = () => {
  const [getPresentation, setGetPresentation] = useState([])
  // const [talents, setTalents] = useState([])
  // const apiImgUrl = "http://localhost:8800" //API main URL
  // const apiUrl = "http://localhost:8800/api" //API main URL
  const apiUrl = process.env.REACT_APP_API_URL //API main URL
  const apiImgUrl = process.env.REACT_APP_API_IMG_URL
  const baseMediaUrl = `${apiImgUrl}/uploads/presentation/`
  const { presentationId } = useParams()

  useEffect(()=>{
    const fetchPresentation = async () =>{
      const res = await axios.get(`${apiUrl}/presentation/${presentationId}`);
      console.log('Res')
      console.log(res)
      setGetPresentation(res.data)
    }
      fetchPresentation()
  },[presentationId, apiUrl])

  return (
    <div>
      {
        getPresentation.length !== 0 &&
        <SinglePresentation 
          presentation = {getPresentation}
          baseMediaUrl = {baseMediaUrl}
          apiImgUrl={apiImgUrl}
          isPublicP={true}
        />
      }
    </div>
  )
}

export default PublicPresentation

