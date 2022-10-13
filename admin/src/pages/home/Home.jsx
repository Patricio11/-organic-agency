import './home.scss';
import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
import Widget from '../../components/widgets/Widget';
// import Featured from '../../components/featured/featured';
// import Chart from '../../components/chart/Chart';
// import ListTable from '../../components/table/ListTable';

const Home = () => {
    return(
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                {/* <Navbar /> */}

                <div className="widgets">
                    <Widget type="talents" />
                    <Widget type="presentations" />
                </div>

                {/* <div className="charts">
                    <Featured />
                    <Chart aspect={2 / 1} title="Last 6 Months (Revenue)"/>
                </div> */}

                {/* <div className="listContainer">
                    <div className="listTitle">Latest Transactions</div>
                    <ListTable />
                </div> */}
            </div>
        </div>
    )
}

export default Home;