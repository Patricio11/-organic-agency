import "./imageSlider.scss"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
// import { useState } from "react";

const ImageSlider = ({slideNumber, setSlideNumber, photos, baseMediaUrlPortfolio, setOpenSlider}) => {

    const handleSliderMove = (direction) =>{

        let newSildeNumber;
       
        if(direction === 'left'){
            newSildeNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1;
        }else{
            newSildeNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
        }
        setSlideNumber(newSildeNumber);
    }

    console.log('The Array of photos');
    console.log(photos);
    console.log('The slider  NUmber');
    console.log(slideNumber);

    return (
        <div className="imageSlider">
            <CloseIcon onClick={()=>setOpenSlider(false)} className="slidClose" />
            <ArrowBackIosNewIcon className="slidArrows" onClick={()=>handleSliderMove("left")} />
            <div className="sliderWrapper">
                <img src={baseMediaUrlPortfolio + photos[slideNumber].filename} alt="" className="sliderImg" />
            </div>
            <ArrowForwardIosIcon className="slidArrows" onClick={()=>handleSliderMove("right")}/>
        </div>
    )
}

export default ImageSlider;