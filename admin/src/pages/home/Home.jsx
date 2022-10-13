import './home.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from '../../components/widgets/Widget';

const Home = () => {
    return(
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <div className="widgets">
                    <Widget type="talents" />
                    <Widget type="presentations" />
                </div>
            </div>
        </div>
    )
}

export default Home;