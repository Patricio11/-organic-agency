import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';




const Featured = () =>{
    

    return(
        <div className="featured">
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertIcon fontSize="smal"/>

            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <h1>70%</h1>
                </div>
                <p className="title">Total seles made today</p>
                <p className="amount">$420</p>
                <p className="desc">Previous transactions processing. Last payments may not be included</p>

                <div className="summary">
                    <div className="item">
                        <div className="itemTile">Tarfet</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownOutlinedIcon fontSize="small" />
                            <div className="resultAmount">$12.4K</div>   
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTile">Last Week</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">$15.7K</div>   
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTile">Last Month</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">$15.7K</div>   
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default Featured;