import './singlePresentation.scss'
import { RiCloseLine,RiLinksLine,RiUserAddLine, RiDeleteBinLine, RiStopCircleLine } from "react-icons/ri"
// import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react'
import axios from 'axios';
import dayjs from 'dayjs'
import Card from '../../talents/card/Card';
// import { RiUserAddLine } from "react-icons/ri"



const SinglePresentation = props => {
  //const apiUrl = process.env.REACT_APP_API_URL //API main URL
  const apiUrl = props.apiUrl //API main URL
  const apiImgUrl = props.apiImgUrl
  const urlDomain = 'https://admin.organictalentmanagement.co.za'
  // const roleName=''
  // const date=dayjs(Date.now()).format('MM/DD/YYYY')

  const [showAddRoleModal, setShowAddRoleModal] = useState(false)
  const [presentation, setPresentation] = useState(props.presentation)
  const [roleToAdd, setRoleToAdd] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [showAddTalentModal, setShowAddTalentModal]= useState(false)
  const [talents/*, setTalents*/] = useState(props.talents)
  const pId = presentation._id


  
  
  const handleClose = () => {
    props.setSelectedPresentation('')
    props.setShowPresentationModal(false)
  }
  const handleCloseRoleModal = () => {
    setShowAddRoleModal(false)
  }
  const handleCloseAddTalentModal = () => {
    setSelectedRole('')
    setShowAddTalentModal(false)
  }
  const handleChange = (e) => {
    setRoleToAdd((prev)=>({...prev, [e.target.id]: e.target.value}))
  }
  

  const handleCreateRole = async (e) =>{
    e.preventDefault()
    try{
      const jobRoleToAdd = {
        roles: roleToAdd
      }
      const addPRole = await axios.put(`${apiUrl}/presentation/${pId}/update`, jobRoleToAdd)
      console.log(addPRole.data)
      setPresentation(addPRole.data)
    }catch(err){
      console.log(err)
    }

    setRoleToAdd('')
  }
  const handleSelectedRole = (sRole)=>{
    setSelectedRole(sRole)
    setShowAddTalentModal(true)
  }
  // const handleRemoveSelectedRole = (sRole)=>{
  //   setSelectedRole(sRole._id)
  // }

  
  const removePresentationRole = async (roleId) => {

    try{
      const removePRole = await axios.put(`${apiUrl}/presentation/${pId}/remove/role/${roleId}`)
      console.log('removePRole.data')
      console.log(removePRole.data)
      setPresentation(removePRole.data)
    }catch(err){
      console.log(err)
    }
  }
  const addTalentToRole = async (talentId) => {
    
    const talentToAdd = {
      talents: talentId
    }

    try{
      const addPRole = await axios.put(`${apiUrl}/presentation/${pId}/update/role/${selectedRole._id}`, talentToAdd)
      console.log('addPRole')
      console.log(addPRole)
      setPresentation(addPRole.data)
    }catch(err){
      console.log(err)
    }
  }
  const removeTalentToRole = async (roleId, talentId) => {
    console.log("The roleToDelete"+roleId)
    const talentToAdd = {
      talents: talentId
    }

    try{
      const addPRole = await axios.put(`${apiUrl}/presentation/${pId}/remove/role/${roleId}/talent`, talentToAdd)
      console.log('addPRole')
      console.log(addPRole)
      setPresentation(addPRole.data)
    }catch(err){
      console.log(err)
    }
  }

  console.log(props.presentation)
  return (
    <div className='presentationModal'>

      {
        showAddRoleModal &&
          <div className="registerTalentModal">
            <div className="modalWrapper">
                <div className="topModal">
                    <h2>Add Role</h2>
                    <CloseIcon onClick={handleCloseRoleModal} className="closeIcon" />
                </div>
                <div className="modalBody">
                    <form>
                      <div className="formFields">

                        <div className="fieldsContainer">
                          <div className="fieldItem">
                            <label htmlFor="name">Role Name</label>
                            <input type="text" id="name"  onChange={handleChange}/>
                          </div>
                          <div className="fieldItem">
                            <label htmlFor="date">Role Date</label>
                            <input type="date" id="date"  onChange={handleChange} />
                          </div>
                        </div>
                          
                        <div className="createBtnContainer">

                          <button className="createBtn" onClick={handleCreateRole}>Create</button>
                        </div>
                      </div>
                    </form>
                </div>
            </div>
          </div>
      }
      {
        showAddTalentModal &&
          <div className="registerTalentModal addTalentModal">
            <div className="modalWrapper">
                <div className="topModal">
                  <h2>Add Talent To {selectedRole.name}</h2>
                  <CloseIcon onClick={handleCloseAddTalentModal} className="closeIcon" />
                </div>
                <div className="modalBody">
                  {/* <form>
                    <div className="formFields">

                      <div className="fieldsContainer">
                        <div className="fieldItem">
                          <input type="text" id="search"  onChange={handleChange} placeholder='Search talent'/>
                        </div>
                      </div>
                        
                    </div>
                  </form> */}
                  <div className="talents">
                    {
                      talents?.map((talent) => (
                        <div className="talentCardContainer" key={talent._id}>
                          <Card 
                            singleCard={talent} 
                            apiImgUrl={apiImgUrl} 
                            isPresentation={true} 
                            // setSelectedTalent={setSelectedTalent}
                            addTalentToRole = {addTalentToRole}
                          />
                        </div>
                      ))
                    }
                      
                  </div>
                </div>
            </div>
          </div>
      }
      <div className="pModalWapper">
        <div className="pModalHeader">
          <div className="pModalLogo">
            <img src={props.baseMediaUrl + props.presentation.productImage} alt="presentation" />
          </div>

          {
            props.isPublicP !== true &&
            <span onClick={handleClose}>
              <RiCloseLine  />
            </span>
          }
        </div>
        {
          props.isPublicP !== true &&
          <div className="pModalActions">
            <span 
              onClick={()=>{navigator.clipboard.writeText(`${urlDomain}/public/presentation/${presentation._id}`)}}
              className="copyLink iconBtn"> 
              <RiLinksLine /> 
              <span className='iconText'>Copy Link</span>
            </span>
            <span className="AddRole iconBtn" onClick={()=>setShowAddRoleModal(true)}> 
              <RiUserAddLine /> <span className='iconText'>Add Role</span>
            </span>
          </div>
        }
        <div className="pModalBoday">
          {
            props.isPublicP === true ?
            props.presentation && 
            props.presentation.roles.map((role)=>(

              <div className='presentationRole' key={role._id}>
                <div className="roleWapper">
                  <div className="roleInfo">
                    
                    <span>{role.name}</span>
                    <span className='roleDate'>{dayjs(role.date).format('MM/DD/YYYY') }</span>
                  </div>
                  <div className="roleAction">
                  </div>
                  {/* <span>{role.talents.length}</span> */}
                </div>
                <div className="roleTalents">
                  {
                    role.talents.map((talent, index)=>(
                      <div className="talentCardContainer" key={talent._id}>
                       
                        {/* <span className='removeTalentBtn' onClick={()=>removeTalentToRole(role._id, talent._id)}> <RiStopCircleLine /> <span>Remove Talent</span> </span> */}
                        <Card 
                          singleCard={talent} 
                          apiImgUrl={apiImgUrl} 
                          isTalentRole={true} 
                          publicTalent={true}
                        />
                      </div>
                    ))
                  }
                </div>
                
              </div>
            ))
            :
            presentation && 
            presentation.roles.map((role)=>(

              <div className='presentationRole' key={role._id}>
                <div className="roleWapper">
                  <div className="roleInfo">
                    
                    <span>{role.name}</span>
                    <span className='roleDate'>{dayjs(role.date).format('MM/DD/YYYY') }</span>
                  </div>
                  <div className="roleAction">
                    <span className='roleActionBtn' onClick={()=>handleSelectedRole(role)}><RiUserAddLine/> <span>Add Talent</span></span>
                    <span className='roleActionBtn' onClick={()=>removePresentationRole(role._id)}><RiDeleteBinLine/> <span>Remove Role</span> </span>
                  </div>
                  {/* <span>{role.talents.length}</span> */}
                </div>
                <div className="roleTalents">
                  {
                    role.talents.map((talent, index)=>(
                      <div className="talentCardContainer" key={talent._id}>
                        <span className='removeTalentBtn' onClick={()=>removeTalentToRole(role._id, talent._id)}> <RiStopCircleLine /> <span>Remove Talent</span> </span>
                        <Card 
                          singleCard={talent} 
                          apiImgUrl={apiImgUrl} 
                        />
                      </div>
                    ))
                  }
                </div>
                
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SinglePresentation