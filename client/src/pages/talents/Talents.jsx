import "./talents.scss"
import NavBar from "../../components/navBar/NavBar";
import List from "../../components/talents/list/List";
import Footer from "../../components/footer/Footer";

const Talents = () => {
     
    return (
        <>
            <div className="talents">
                <NavBar />
                <List />
            </div>
            <Footer />
        </>
        
    )
}

export default Talents;