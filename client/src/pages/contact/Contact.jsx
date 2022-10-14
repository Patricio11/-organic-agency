import "./contact.scss"
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";

const Contact = () =>{
    return (
        <>
            <div className="contact">
                <NavBar />
                <div className="cWrapper">
                    
                    <div className="cContainer">
                        <div className="cLeft">
                            <form>
                                <div className="formGroup">

                                    <input type="text" name="name" id="name" placeholder="Name" />
                                    <input type="email" name="email" id="email" placeholder="Email" />
                                </div>
                                <div className="formGroup">

                                    <textarea name="message" id="" cols="30" rows="10" placeholder="Message"></textarea>
                                </div>
                                <div className="formGroup">

                                    <button>Send</button>
                                </div>
                            </form>
                            
                        </div>
                        <div className="cRight">
                            <h1>Get in Touch!</h1>
                            <span>Email: info@organictalentmanagement.co.za</span>
                            <span>Tel: +27 (0)81 593 2176</span>
                            <span>Due to the Covid 19 pandemic we are working remotely; all meetings are by appointment.</span>
                        </div>
                    </div>

                    <div className="map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d144688.75649340206!2d18.494935757750014!3d-33.942441516149195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc500f8826eed7%3A0x687fe1fc2828aa87!2sCape%20Town!5e0!3m2!1sen!2sza!4v1665749850277!5m2!1sen!2sza" width="600" height="450" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="cMap"></iframe>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Contact;