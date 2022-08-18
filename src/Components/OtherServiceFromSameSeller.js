import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick/lib/slider';
import OtherServiceCardSameSeller from './Cards/OtherServiceCardSameSeller'
import { getAnotherServiceFromSameSellerAction } from '../Store/Actions/action';

const OtherServiceFromSameSeller = () => {

    const dispatch = useDispatch();

    const ServiceDetails = useSelector(state => state.reducerGetServiceDetailsPage?.getSericeDetails)
    // console.log("ServiceDetails==.", ServiceDetails)

    const anotherService = useSelector(state => state.reducergetAnotherServiceFromSameSeller?.anotherserviceSameSeller);
    // console.log("anotherService==>", anotherService)

    const { sellerName, serviceId } = useParams();
    // console.log(" sellerName + serviceId ", sellerName, serviceId)

    // for seller id--- refresh otherServiceCards  on service details page wishlist(remove only)
    const [sellId, setSellId] = useState(ServiceDetails?.sellerId);

    useEffect(() => {
        if (serviceId && sellId) {
            let countryListName = JSON.parse(localStorage.getItem("countryList"))
            getAnotherServiceFromSameSellerAction(dispatch, serviceId, sellId, countryListName.name)
        }
    }, [dispatch, sellId, serviceId])


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
                    <h2>Other Services from This Seller</h2>
                </div>
                <div className='service_block'>
                    <Slider {...settings}>
                        {
                            anotherService ? anotherService.map((items, index) => {
                                return (
                                    <OtherServiceCardSameSeller anotherService={items} key={index} />
                                )
                            }) : null
                        }
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default OtherServiceFromSameSeller