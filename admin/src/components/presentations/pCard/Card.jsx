// import { useState } from 'react'
import './card.scss'
import { RiDeleteBinLine } from "react-icons/ri"
import axios from 'axios'


// const Card = ({presentation, setSelectedPresentation, setGetPresentation, setShowPresentationModal, baseMediaUrl}) => {
const Card = (props) => {
  // const [presentation, setPresentation] = useState(props.presentation)
  const presentation = props.presentation
  const apiUrl = process.env.REACT_APP_API_URL //API main URL
  // const apiUrl = "http://localhost:8800/api" //API main URL
  const handlePresentation = (presentation) =>{
    console.log(presentation)
    props.setSelectedPresentation(presentation)
    props.setShowPresentationModal(true)
  }

  console.log(presentation.roles.length)
  const handleDelete = async (pId) => {
    console.log(apiUrl)
    console.log('Delete: '+pId)
    try {
      const res = await axios.delete(`${apiUrl}/presentation/${pId}`)
      props.setGetPresentation(res.data)
    } catch (error) {
      console.log(error)
    }
    
  }
  
  return (
    <div className='pCard' 
      
    >
      <span onClick={()=>handleDelete(presentation._id)} className='deleteIcon'>
        <RiDeleteBinLine />
      </span>
      <div className="pCardWrapper" onClick={()=>handlePresentation(presentation)}>
        <div className="pCardImg">
          <img src={props.baseMediaUrl + props.presentation.productImage} alt="presentation" />
        </div>
        <div className="pCardInfo">
          <span>Project: {presentation.name}</span>
          {
            presentation.roles &&
              <span>Roles: {presentation.roles.length}</span>
          }
          {
            presentation.roles.talents &&
              <span>Talents: {presentation.roles.talents.length}</span>
          }
          
        </div>
      </div>
      
    </div>
  )
}

export default Card