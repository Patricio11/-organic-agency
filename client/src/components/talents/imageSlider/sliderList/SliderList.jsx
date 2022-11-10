import "./sliderList.scss";
import { Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import ImageSlider from "../../../singleTalent/imageSlider/ImageSlider";
import { useState } from "react";


const SliderList = ({baseMediaUrlPortfolio, portfoleo}) =>{
    console.log(portfoleo)
    const [openSlider, setOpenSlider] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);

    const handleOpenSlider = (indx) =>{
        
        setSlideNumber(indx);
        setOpenSlider(true);
    }
    // portfoleo?.sort((a, b) => b.position - a.position)
    return (
        <div className="sList">
            { openSlider &&
                <ImageSlider 
                    slideNumber={slideNumber} 
                    photos={portfoleo} 
                    baseMediaUrlPortfolio={baseMediaUrlPortfolio}
                    setSlideNumber={setSlideNumber} 
                    setOpenSlider={setOpenSlider}

                />
            }
            <div className="sLWrapper">
                <Swiper  modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
                    className='sLContainer'
                >
                    
                    {
                        portfoleo && portfoleo.length > 0 && portfoleo !== undefined &&
                        portfoleo.map((pItem, idx) => (
                            <SwiperSlide  key={pItem._id} onClick={()=>handleOpenSlider(idx)}>
                                <div className="listItem" >
                                    <img src={baseMediaUrlPortfolio + pItem.filename} alt="" />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                
            </div>
        </div>
    )
}

export default SliderList;