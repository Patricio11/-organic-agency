import "./talent.scss"
import NavBar from "../../components/navBar/NavBar";
import SingleTalent from "../../components/singleTalent/SingleTalent";
import Footer from "../../components/footer/Footer";


const Talent = () => {
    return (
        <>
            <div className="talent">
                <NavBar />
                <SingleTalent />
            </div>
            <Footer />
        </>
    )
}

export default Talent;