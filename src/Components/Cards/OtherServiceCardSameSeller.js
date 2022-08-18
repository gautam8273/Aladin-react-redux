import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAnotherServiceFromSameSellerAction, getServiceListAction, userAddToWishListAction, userRemoveToWishListAction } from '../../Store/Actions/action';

const OtherServiceCardSameSeller = ({ anotherService }) => {

    const dispatch = useDispatch();
    // console.log("anotherService==>", anotherService)

    const userGetWishList = useSelector(state => state.reducerUserGetWishList?.userGetWishList);
    // console.log("userGetWishList==>", userGetWishList)

    const ServiceDetails = useSelector(state => state.reducerGetServiceDetailsPage?.getSericeDetails)
    // console.log("ServiceDetails==.", ServiceDetails)


    const otherService = useSelector(state => state.reducergetAnotherServiceFromSameSeller?.anotherserviceSameSeller);
    // console.log("otherService==>", otherService)

    const { serviceId, sellerName } = useParams();
    // console.log("sellerName==>", sellerName)






    //refresh card-onclick-- otherServiceCardSameSeller.js
    const [sellId, setSellId] = useState();
    // console.log("sellId==>", sellId)

    //refresh card-onclick-- otherServiceCardSameSeller.js 
    useEffect(() => {
        if (serviceId && sellId) {
            let countryListName = JSON.parse(localStorage.getItem("countryList"))
            getAnotherServiceFromSameSellerAction(dispatch, serviceId, sellId, countryListName.name)
        }
    }, [dispatch, sellId, serviceId])

    //refresh card-onclick-- otherServiceCardSameSeller.js
    if (!sellId) {
        userGetWishList.forEach(element => {
            // console.log("element==>", element)
            if (serviceId == element.serviceId) {
                setSellId(element.sellerId)
            }
        })
    }



    // wishlist
    const [wishBtn, setWishBtn] = useState(anotherService.wishlist);
    // console.log(anotherService.wishlist)
    // console.log("wishBtn==>", wishBtn)

    const wishListButton = (id) => {
        // console.log("id==>", id)
        let wish = {
            serviceId: id
        }

        if (!wishBtn) {
            userAddToWishListAction(dispatch, wish)
            // setWishBtn(true)
        }
        else {
            userRemoveToWishListAction(dispatch, wish)
            // setWishBtn(false)
        }
        setWishBtn(prev => !prev)
    }

    useEffect(() => {

    }, [serviceId, sellerName])

    return (
        <>


            <div className="card-wrap">

                <Link to={`/service-detail/${anotherService.serviceId}/${anotherService.sellerData[0].firstName}`}>
                    <div className="service-image"><img
                        src={anotherService.path + anotherService.serviceCover} alt="service-image" />
                    </div>
                </Link>
                <div className="service-card">
                    <div className="service-name">{anotherService.categoryName}</div>
                    <div className="location">{anotherService.title}</div>
                    <div className="address">{anotherService.description}</div>
                    <div className="seller-rating">
                        <div className="rating-wrap">
                            <div className="rating-image"><span style={{
                                display: "inline-block",
                                direction: "ltr"
                            }}><span
                                style={{
                                    cursor: "inherit",
                                    display: "inline-block",
                                    position: "relative"
                                }}><span
                                    style={{ visibility: "hidden" }}><img
                                            src="/static/media/icon-star-empty.52a69168e7bc50857a6426be4eaee425.svg"
                                            className="icon" /></span><span
                                                style={{
                                                    display: "inline-block",
                                                    position: "absolute",
                                                    overflow: "hidden",
                                                    top: "0px",
                                                    left: "0px",
                                                    width: "100%"
                                                }}><img
                                            src="/static/media/icon-star-2.3ab379ed68837c4045b127c3c9741767.svg"
                                            className="icon" /></span></span><span
                                                style={{
                                                    cursor: "inherit",
                                                    display: "inline-block",
                                                    position: "relative"
                                                }}><span
                                                    style={{ visibility: "hidden" }}><img
                                            src="/static/media/icon-star-empty.52a69168e7bc50857a6426be4eaee425.svg"
                                            className="icon" /></span><span
                                                style={{
                                                    display: "inline-block",
                                                    position: "absolute",
                                                    overflow: "hidden",
                                                    top: "0px",
                                                    left: "0px",
                                                    width: "100%"
                                                }}><img
                                            src="/static/media/icon-star-2.3ab379ed68837c4045b127c3c9741767.svg"
                                            className="icon" /></span></span><span
                                                style={{
                                                    cursor: "inherit",
                                                    display: "inline-block",
                                                    position: "relative"
                                                }}><span
                                                    style={{ visibility: "hidden" }}><img
                                            src="/static/media/icon-star-empty.52a69168e7bc50857a6426be4eaee425.svg"
                                            className="icon" /></span><span
                                                style={{
                                                    display: "inline-block",
                                                    position: "absolute",
                                                    overflow: "hidden",
                                                    top: "0px",
                                                    left: "0px",
                                                    width: "100%"
                                                }}><img
                                            src="/static/media/icon-star-2.3ab379ed68837c4045b127c3c9741767.svg"
                                            className="icon" /></span></span><span
                                                style={{
                                                    cursor: "inherit",
                                                    display: "inline-block",
                                                    position: "relative"
                                                }}><span><img
                                                    src="/static/media/icon-star-empty.52a69168e7bc50857a6426be4eaee425.svg"
                                                    className="icon" /></span><span
                                                        style={{
                                                            display: "inline-block",
                                                            position: "absolute",
                                                            overflow: "hidden",
                                                            top: "0px",
                                                            left: "0px",
                                                            width: "0%"
                                                        }}><img
                                            src="/static/media/icon-star-2.3ab379ed68837c4045b127c3c9741767.svg"
                                            className="icon" /></span></span><span
                                                style={{
                                                    cursor: "inherit",
                                                    display: "inline-block",
                                                    position: "relative"
                                                }}><span><img
                                                    src="/static/media/icon-star-empty.52a69168e7bc50857a6426be4eaee425.svg"
                                                    className="icon" /></span><span
                                                        style={{
                                                            display: "inline-block",
                                                            position: "absolute",
                                                            overflow: "hidden",
                                                            top: "0px",
                                                            left: "0px",
                                                            width: "0%"
                                                        }}><img
                                            src="/static/media/icon-star-2.3ab379ed68837c4045b127c3c9741767.svg"
                                            className="icon" /></span></span></span></div>
                            <div className="rating-number">{anotherService.totalReview} reviews</div>
                        </div>
                    </div>
                    <div className="services-block">
                        <div className="price">${anotherService.minPrice}</div>
                        <button className="wishlist-btn"
                            onClick={() => { wishListButton(anotherService.serviceId) }}
                        // onClick={() => wishListButton(anotherService.serviceId)}
                        >
                            {/* <i className="icon-heart filledOther" ></i> */}
                            <i className={`${wishBtn ? "icon-heart filledOther" : "icon-heart btnWishOther"}`}>{wishBtn}</i>
                        </button>
                    </div>
                </div>

            </div>

        </>
    )
}

export default OtherServiceCardSameSeller;






    // const [wishBtn, setWishBtn] = useState()
    // console.log("wishBtn==>", wishBtn)

    // if (!wishBtn) {
    //     userGetWishList.forEach(ele => {
    //         // console.log("ele===>", ele)
    //         if (serviceId == ele.serviceId) {
    //             setWishBtn(ele.wishlist)
    //             setSellId(ele.sellerId)
    //         }
    //     })
    // }

    // const wishListButton = (id) => {
    //     console.log("wishListButton==>", id)

    //     let wish = {
    //         serviceId: id
    //     }

    //     setWishBtn(prev => !prev)
    //     if (!wishBtn) {
    //         userAddToWishListAction(dispatch, wish, wishBtn)
    //     }
    //     else {
    //         userRemoveToWishListAction(dispatch, wish, wishBtn)

    //     }

    // }

