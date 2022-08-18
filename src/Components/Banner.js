import React from 'react'
import { useSelector } from 'react-redux';
import Slider from "react-slick";

const Banner = () => {

    const BannerImages = useSelector(state => state.reducerGetHomePage?.homePageData);
    //  console.log("BannerImages==>,", BannerImages);


    // for slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 3
    };

    return (
        <>
            <section className="banner">
                <Slider {...settings}>
                    {
                        BannerImages && BannerImages.bannerData?.map((items, index) => {
                            // console.log("items==>", items)
                            return (
                                <div className="container" key={index}>
                                    <div className="banner-wrap">
                                        <div className="banner-right">
                                            <div className="img-wrap">
                                                <img
                                                    src={BannerImages.bannerImagePath + items.webImage}
                                                    alt="banner" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </section>
        </>
    )
}

export default Banner