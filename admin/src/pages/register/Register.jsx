import './register.scss'
import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext";

const Register = () => {
    const [registerSuccess, setRegisterSuccess] = useState(false)

    const [credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
        isAdmin: true
    })

    const {loading/*, error,*/, dispatch} = useContext(AuthContext);

    // const navigate = useNavigate() // declaring UseNavidate hook To redirect the user after success login

    const handleChange = (e) => {
        //Using the spread array operator e gonna create array of the input vaules based to they ID
        setCredentials(prev=>({ ...prev, [e.target.id]: e.target.value}))
    };

    const handleLogin = async (e) =>{
        e.preventDefault();//To prevent the page from reloading or refresh
        dispatch({type:"LOGIN_START", payload: true});// This just update out Loading state

        // const apiUrl = process.env.REACT_APP_API_URL//API main URL
        // const apiUrl = "http://localhost:8800/api" //API main URL

        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_URL
        })

        try {
            const res = await axiosInstance.post(`/auth/register`, credentials); //passing credentials to login(username password)
            console.log(res)
            console.log(res.data)
            setRegisterSuccess(true)
            // navigate("/login")//redirect to home page after login?
            //Check if is admin the user
            // if(res.data.isAdmin){
            //     //after success we going to dispatch other actions (the login success) the payload the data
            //     dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            //     navigate("/")//redirect to home page after login
            // }else{
            //     dispatch({
            //         type:"LOGIN_FAILURE", 
            //         payload: {message: "You are not allowed!"}
            //     });
            // }
        } catch (err) {
            //To update our Loagin and send the error as response with payload
            dispatch({type:"LOGIN_FAILURE", payload: err.response.data});
        }
    }

  return (
    <div className="login">
        <div className="lContainer">
            <input type="text" onChange={handleChange} placeholder="Username" id="username" className="lInput" />
            <input type="email" onChange={handleChange} placeholder="Email" id="email" className="lInput" />
            <input type="password" onChange={handleChange} placeholder="Password" id="password" className="lInput" />
            <button disabled={loading} onClick={handleLogin} className="lButton">Register</button>
            {/* {error && <span>{error.message}</span>}
            {loading && <span>"It is Loading"</span>} */}
            {registerSuccess && <span>Registration Success! Please <Link to="/login">Login</Link> </span>}
        </div>
    </div>
  )
}

export default Register