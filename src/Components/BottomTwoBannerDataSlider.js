import React from 'react'
import { useSelector } from 'react-redux'
import Slider from 'react-slick/lib/slider';

const BottomTwoBannerDataSlider = () => {

    const bottomBannerImages = useSelector(state => state.reducerGetHomePage?.homePageData);
    // console.log("bottomBannerImages===>", bottomBannerImages)


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
            <aside className="ads-banners last">
                <div className="container">


                    <Slider {...settings}>
                        {
                            bottomBannerImages && bottomBannerImages.bottomAdvertiserBannerData?.map((items, index) => {
                                // console.log("items==>", items)
                                return (
                                    <div key={index}>
                                        <div className="card" >
                                            <div className="ad-img"><img
                                                src={bottomBannerImages.bannerImagePath + items.webImage} alt="ad" />
                                            </div>
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

export default BottomTwoBannerDataSlider