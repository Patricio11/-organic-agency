import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navBar/NavBar";
import "./about.scss"

const About = () =>{
    return (
        <div className="about">
            <NavBar />
            <div className="aWrapper">
                <h2>About us</h2>
                <p>
                Founded in 2020, Organic Talent Management is a dynamic Cope Town based modelling agency that proudly represents models, actors, kids from all backgrounds and champions diversity, authentically. The agency is highly committed to its ethos of fairness, friendliness and efficiency in business, obtaining most new clients and models through referral. Our reputation is based on trust and has been hard-won. What drives us is that enough is never enough, so we are constantly striving to improve. 
                </p>
                <p>Organic Talent Management believes in the (next) generation and developing the next superstars, (within the) model industry.</p>
            </div>
            <Footer />
        </div>

    )
}

export default About;