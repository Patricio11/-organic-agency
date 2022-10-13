import './presentation.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import List from '../../components/presentations/pList/List'

const Presentaion = () => {
  return (
    <div className="presentaion">
        <Sidebar />
        <div className="presentaionWapper">
            <div className="presentaionContainer">
                <List />
            </div>
        </div>
    </div>
  )
}

export default Presentaion