import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import { AuthContext } from "./components/context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Talents from "./pages/talents/Talents";
import Presentaion from "./pages/presentation/Presentaion";
import PublicPresentation from "./pages/singlePresentation/PublicPresentation"
import Register from "./pages/register/Register";

function App() {
  
  const ProtectedRoute = ({children}) => {
    const {user} = useContext(AuthContext);

    if(!user){
      return <Navigate to="/login"></Navigate>
    }

    return children;
  }
  return (
    <div className="App" style={{height:'100%'}}>
      <BrowserRouter>
      
        <Routes>
          <Route path="/">
            
            <Route path="login" element={ <Login />}></Route>
            <Route path="register" element={ <Register />}></Route>
            <Route 
              index 
              element={ 
                <ProtectedRoute>
                  <Home/>
                </ProtectedRoute>
              }
            ></Route>
            
            <Route path="talents">
              <Route 
                index 
                element={
                  <ProtectedRoute>
                    <Talents />
                  </ProtectedRoute>
                }
              ></Route>
              <Route 
                path=":talentId" 
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              ></Route>
            </Route>
            <Route path="presentations">
                <Route 
                  index 
                  element={
                    <ProtectedRoute>
                      <Presentaion/>
                    </ProtectedRoute>
                  }
                ></Route>
            </Route>
            {/* <Route path="rooms">
              <Route 
                index 
                element={
                  <ProtectedRoute>
                    <List columns={RoomColumns} />
                  </ProtectedRoute>
                }
              ></Route>
              <Route 
                path=":roomId" 
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              ></Route>
              <Route 
                path="new" 
                element={
                  <ProtectedRoute>
                    <New inputs={productInputs} title="Add new Room" />
                  </ProtectedRoute>
                }
              ></Route>
            </Route> */}
          </Route>
          <Route path="public/presentation/:presentationId" element={ <PublicPresentation />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
