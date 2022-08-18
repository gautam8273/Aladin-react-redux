import React from 'react';
import { useSelector } from 'react-redux';
import Slider from "react-slick";


const TwoImagesSlider = () => {

    const twoImagesSlider = useSelector(state => state.reducerGetHomePage?.homePageData);
    // console.log("twoImagesSlider==>", twoImagesSlider)

    // for slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
    };




    return (
        <>
            <aside className="ads-banners">
                <div className="container">

                    <Slider {...settings}>
                        {
                            twoImagesSlider && twoImagesSlider.topAdvertiserBannerData?.map((items, index) => {
                                // console.log("items==>", items)
                                return (
                                    <div className="card" key={index}>
                                        <div className="ad-img"><img
                                            src={twoImagesSlider.bannerImagePath + items.webImage}
                                            alt="ad" />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>

            </aside>
        </>
    )
}

export default TwoImagesSlider;