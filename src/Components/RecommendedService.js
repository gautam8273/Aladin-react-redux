import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick/lib/slider';
import RecommendedCardService from './Cards/RecommendedCardService'
import { getRecommendedServiceAction } from '../Store/Actions/action';

const RecommendedService = () => {

    const dispatch = useDispatch();

    const ServiceDetails = useSelector(state => state.reducerGetServiceDetailsPage?.getSericeDetails)
    // console.log("ServiceDetails==.", ServiceDetails)

    // const anotherService = useSelector(state => state.reducergetAnotherServiceFromSameSeller?.anotherserviceSameSeller);
    // console.log("anotherService==>", anotherService)

    const recommendedData = useSelector(state => state.reducerGetRecommendedService?.recommendedServiceData);
    // console.log("recommendedData===>", recommendedData)

    const { serviceId } = useParams();
    // console.log("serviceId==>", serviceId)

    const [catId, setCatId] = useState(ServiceDetails?.categoryId);
    const [subCatId, setSubCatId] = useState(ServiceDetails?.subcategoryId);
    // console.log("catId==>", catId)



    useEffect(() => {
        if (serviceId && catId && subCatId) {
            let countryListName = JSON.parse(localStorage.getItem("countryList"))
            getRecommendedServiceAction(dispatch, serviceId, catId, subCatId, countryListName)
        }
    }, [dispatch, serviceId, catId])


    // for slider
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
    };

    return (
        <>
            <div className="simple-sliders">
                <div className="slider-heading">
                    <h2>Recommended Services</h2>
                </div>
                <div className='service_block'>
                    <Slider {...settings}>
                        {
                            recommendedData ? recommendedData.map((data, index) => {
                                return (
                                    <RecommendedCardService dataInfo={data} key={index} />
                                )
                            }) : null
                        }

                    </Slider>
                </div>
            </div>
        </>
    )
}

export default RecommendedService