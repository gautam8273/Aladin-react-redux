import React from 'react';
import { useSelector } from 'react-redux';
import Slider from "react-slick";

const Trending = () => {

    const trendingData = useSelector(state => state.reducerGetHomePage?.homePageData);
    // console.log("trendingData===>", trendingData);


    // for slider
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
    };


    return (
        <>
            <section className="trending-services">
                <div className="container">
                    <h2>Trending</h2>

                    <Slider {...settings}>
                        {
                            trendingData && trendingData.subcategoryData?.map((items, index) => {
                                // console.log("items==>", items)
                                return (
                                    <div className="card" key={index}>

                                        <div className="service-img"><img
                                            src="https://inszn-ecom.s3.amazonaws.com/986075f1-aee4-427c-841d-b300a8f42dfd.jpeg" alt="service" style={{ width: "500px", height: "350px" }} />
                                        </div>
                                        <div className="service-name">
                                            <h3>{items.name}</h3>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </Slider>

                    {/* <button type="button" data-role="none"
                        className="slick-arrow slick-prev slick-disabled" style={{ display: "block" }}>
                        Previous
                    </button>

                    <button type="button" data-role="none" className="slick-arrow slick-next" style={{ display: "block" }}>
                        Next</button> */}

                </div>
            </section>
        </>
    )
}

export default Trending