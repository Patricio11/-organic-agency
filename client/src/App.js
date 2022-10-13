import "./app.scss"
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import Talent from "./pages/singleTalent/Talent";
import Talents from "./pages/talents/Talents";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={<Home />}
            ></Route>
          </Route>
          <Route path="talents">
            <Route
              index
              element={<Talents />}
            ></Route>
       
            <Route 
              path="all"
              element={<Talents />}
            ></Route>
            <Route 
              path=":talentId"
              element={<Talent />}
            ></Route>
          </Route>
          <Route path="about">
            <Route
              index
              element={<About />}
            ></Route>
          </Route>
          <Route path="contact">
            <Route
              index
              element={<Contact />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
