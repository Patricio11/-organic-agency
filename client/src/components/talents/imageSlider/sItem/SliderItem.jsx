import "./sliderItem.scss"

const SliderItem = ({image}) =>{
    return (
        <div className="listItem">
            <img src={image} alt="" />
        </div>
    )
}

export default SliderItem;