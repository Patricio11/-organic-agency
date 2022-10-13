import { createContext, useEffect, useReducer } from "react"


const INITIAL_STATE = {
    //We gonna get the user data once we refresh from localstorage
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return {
                user: null,
                loading: action.payload,
                error: null
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    // To save the user in Loacal storage so if refresh will still the there his info
    useEffect(()=>{
        // You canot store object in localstorage so we gonna use JSON to stingify the pbkect
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user])
    return(
        <AuthContext.Provider 
            value={{ 
                user: state.user, 
                loading: state.loading, 
                error: state.error, 
                dispatch 
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}