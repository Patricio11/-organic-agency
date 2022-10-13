// import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import List from "../../components/talents/list/List";
import "./talents.scss"

const Talents = () =>{
    return (
        <div className="talents">
            <Sidebar />
            <div className="talentWapper">
                {/* <Navbar /> */}

                <div className="talentsContainer">
                    <List />
                </div>
            </div>
        </div>
    )
}

export default Talents;