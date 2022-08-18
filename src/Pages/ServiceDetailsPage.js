import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import OtherServiceFromSameSeller from '../Components/OtherServiceFromSameSeller';
import RecommendedService from '../Components/RecommendedService';
import { addToCartAction, getAnotherServiceFromSameSellerAction, getCartDataAction, getlocalCartAction, getserviceDetailsAction, userAddToWishListAction, userGetWishListAction, userRemoveToWishListAction } from '../Store/Actions/action';
import starFill from '../../src/assets/images/icon-star.svg'
import { startConversationWithSellerAction } from '../Store/Actions/startConversationWithSellerAction';
import Review from '../Components/Review';
import fullStar from '../assets/images/icons/icon-star-2.svg';
import emptyStar from '../assets/images/icons/icon-star-empty.svg'

import Rating from "react-rating";
import ReviewListCard from '../Components/Cards/Review/ReviewListCard';


const ServiceDetailsPage = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userGetWishList = useSelector(state => state.reducerUserGetWishList?.userGetWishList);
    // console.log("userGetWishList==>", userGetWishList)

    const ServiceDetails = useSelector(state => state.reducerGetServiceDetailsPage?.getSericeDetails)
    // console.log("ServiceDetails==.", ServiceDetails)

    const anotherService = useSelector(state => state.reducergetAnotherServiceFromSameSeller?.anotherserviceSameSeller);
    // console.log("anotherService==>", anotherService)

    const cartDetails = useSelector(state => state.reducerGetCartData?.cartDetails);
    // console.log("cartDetails==>", cartDetails)


    const chatWithSellerStart = useSelector(state => state.reducerStartConversationWithSeller?.startConversationWithSeller);
    // console.log("chatWithSellerStart==>", chatWithSellerStart)

    // for review rating
    // const reviewRating = useSelector(state => state.reducerReviewRating?.getReviewRating);
    // console.log("r  eviewRating>>>>", reviewRating)

    // go to cart
    const [cartInfo, setCartInfo] = useState()
    // console.log("cartInfo==>", cartInfo)

    // for wishlist in service details page
    const [wishInfo, setWishInfo] = useState();
    // console.log("wishInfo===>", wishInfo)

    useEffect(() => {
        setWishInfo(ServiceDetails?.wishlist)
        let token = localStorage.getItem("loginData");
        if (token) {
            userGetWishListAction(dispatch)
        }

    }, [dispatch, anotherService])

    const { sellerName, serviceId } = useParams();
    // console.log("sellerName+serviceId==>", sellerName, serviceId)

    const [sellId, setSellId] = useState();
    // console.log("sellId==>", sellId)

    if (!sellId) {
        userGetWishList.forEach(element => {
            // console.log("element==>", element)
            if (serviceId == element.serviceId) {
                setSellId(element.sellerId)
            }
        })
    }

    useEffect(() => {
        if (serviceId && sellId) {
            let countryListName = JSON.parse(localStorage.getItem("countryList"))
            getAnotherServiceFromSameSellerAction(dispatch, serviceId, sellId, countryListName.name);

        }
    }, [dispatch, serviceId])


    useEffect(() => {
        if (serviceId) {
            let countryName = JSON.parse(localStorage.getItem("countryList"))
            getserviceDetailsAction(dispatch, serviceId, countryName.name)
        }
    }, [dispatch, serviceId])



    // add and remove wishlist on -----service details page
    const btnWishList = (id) => {
        // console.log("id===>", id)
        let wish = {
            serviceId: id
        }
        // console.log("wish==>", wish)

        if (!wishInfo) {
            userAddToWishListAction(dispatch, wish, wishInfo)

        }
        else {
            userRemoveToWishListAction(dispatch, wish, wishInfo)
        }
        setWishInfo(prev => !prev)
    }




    const addToCart = (id, ServiceDetails) => {
        // console.log("id===>", id)
        // console.log("ServiceDetails==>", ServiceDetails)
        ServiceDetails.quantity = 1;
        ServiceDetails.serviceTitle = ServiceDetails.title;

        let reqpayload = {
            serviceId: id,
            quantity: 1
        };
        // console.log("reqpayload==>", reqpayload)
        let reqpayload1 = {
            country: JSON.parse(localStorage.getItem("countryList")),
        };
        if (localStorage.getItem("loginData")) {
            if (!cartInfo) {

                addToCartAction(dispatch, reqpayload, reqpayload1);
                setCartInfo(true);
            }
        }
        else {
            // add to cart data send to localstorage ---in signout condition
            if (!cartInfo) {
                let itemaddtocart = JSON.parse(localStorage.getItem("alacart"));
                if (!itemaddtocart) {
                    localStorage.setItem("alacart", JSON.stringify([ServiceDetails]));
                } else {
                    localStorage.setItem("alacart", JSON.stringify([...itemaddtocart, ServiceDetails]));
                }
                setCartInfo(true);
            }
            getlocalCartAction(dispatch, id) // localstorage data saved in redux
        }
    }




    // useEffect(() => {
    //     if (
    //         !localStorage.getItem("loginData") &&
    //         !localStorage.getItem("alacart")
    //     ) {
    //         setCartInfo(false);
    //     }
    // }, []);


    // change go to cart button---- logout condition
    useEffect(() => {
        let addCartData = JSON.parse(localStorage.getItem("alacart"));
        // console.log("addCartData==>", addCartData)
        addCartData?.forEach(ele => {
            if (serviceId == ele._id) {
                // console.log("rrtetretetet", ele._id, serviceId)
                setCartInfo(true);
            }
        })
    }, [])



    // go to cart---login condition
    useEffect(() => {
        if (localStorage.getItem("loginData")) {

            setCartInfo(ServiceDetails?.cart)
        }
    }, [ServiceDetails])


    //chat with seller 
    const chatWithSeller = (id) => {
        // console.log("serviceId==>", serviceId)

        let serviceId = {
            serviceId: id
        }

        startConversationWithSellerAction(dispatch, serviceId, navigate)
    }


    return (
        <>
            {
                ServiceDetails && <section className="edit-information profile listing">
                    <div className="Toastify"></div>
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Home</a></li>
                                <li className="breadcrumb-item"><a
                                    href="/category/61ee6e37a6c42d1621bb52da/Traditional Chinese Medicine &amp; Culture">Traditional
                                    Chinese Medicine &amp; Culture</a></li>
                                <li className="breadcrumb-item"><a
                                    href="/category/particular/61ee6e37a6c42d1621bb52da/61ee741ea6c42d1621bb53c8">Traditional
                                    Chinese Medicine</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Traditional Chinese Medicine</li>
                            </ol>
                        </nav>
                        <div className="tabbing-head listing">
                            <div className="tabbing-select"><a className="profile-link"
                                href="/seller-profile/624c306501fbbccfee302eda/61ee6e37a6c42d1621bb52da"><i
                                    className="icon-arrow"></i>Go to Seller Profile</a></div>
                            <ul className="tabs-wrap nav nav-tabs" role="tablist">
                                <li className="nav-item" role="presentation"><button type="button"
                                    id="uncontrolled-tab-example-tab-description" role="tab" data-rr-ui-event-key="description"
                                    aria-controls="uncontrolled-tab-example-tabpane-description" aria-selected="true"
                                    className="nav-link active">Description</button></li>
                                <li className="nav-item" role="presentation"><button type="button" id="uncontrolled-tab-example-tab-gallery"
                                    role="tab" data-rr-ui-event-key="gallery"
                                    aria-controls="uncontrolled-tab-example-tabpane-gallery" tabIndex="-1"
                                    className="nav-link">Gallery</button></li>
                            </ul>
                            <div className="tab-content">
                                <div id="uncontrolled-tab-example-tabpane-description"
                                    aria-labelledby="uncontrolled-tab-example-tab-description" className="tab-pane active">
                                    <div className="description-wrap listing">
                                        <div className="image-block">
                                            <div className="image-wrap"><img
                                                src={ServiceDetails?.path + ServiceDetails?.serviceCover}
                                                alt="profile-image" /></div>

                                            {
                                                ServiceDetails?.price // for seller button
                                                    ?
                                                    cartInfo
                                                        ? <div className=""  >
                                                            <Link className='btn' to={'/user/cart'}> Go to Cart</Link>
                                                        </div>
                                                        :
                                                        <div className="btn" onClick={() => { addToCart(ServiceDetails.serviceId, ServiceDetails) }} >
                                                            Add to Cart
                                                        </div>
                                                    : null
                                                // <button className="btn" onClick={() => chatWithSeller(ServiceDetails?.serviceId)} >
                                                //     chat with seller
                                                // </button>  // for seller button
                                            }
                                            <button className="btn" onClick={() => chatWithSeller(ServiceDetails?.serviceId)} >
                                                chat with seller
                                            </button>
                                        </div>
                                        <div className="seller-details">
                                            <div className="details-head">
                                                <div className="main-head">
                                                    <div className="seller-btns">


                                                        <button className="btn-wrap" onClick={() => btnWishList(ServiceDetails.serviceId)}>
                                                            <i className={`${wishInfo ? "icon-heart filledWish" : "icon-heart btnWish"}`}></i>Add
                                                            to Wishlist</button>


                                                        <div>
                                                            <button className="btn-wrap"><i className="icon-share"></i>Share This
                                                                Service</button></div>
                                                    </div>
                                                    <h2>{ServiceDetails?.categoryName}</h2>
                                                    <h3>{ServiceDetails?.sellerData[0].firstName} {ServiceDetails?.sellerData[0].lastName}</h3>
                                                </div>
                                                {/* <div className="pricing-wrap">${ServiceDetails?.price}<span className="timer"></span></div> */}
                                                <div className="pricing-wrap">
                                                    ${ServiceDetails?.price ?
                                                        ServiceDetails.price
                                                        :
                                                        <span>{ServiceDetails.minPrice} - {ServiceDetails.maxPrice} </span>
                                                    }
                                                    <span className="timer"></span>
                                                </div>
                                            </div>

                                            <div className="seller-rating">
                                                <div className="rating-wrap">
                                                    <div className="rating-image">
                                                        <span style={{
                                                            display: "inline-block",
                                                            direction: "ltr"
                                                        }}>
                                                            <span
                                                                style={{
                                                                    cursor: "inherit",
                                                                    display: "inline-block",
                                                                    position: "relative"
                                                                }} >

                                                                {/* <Rating /> */}

                                                                <Rating
                                                                    readonly
                                                                    placeholderRating={ServiceDetails?.averageRating ? ServiceDetails?.averageRating : 0}
                                                                    emptySymbol={<img src={emptyStar} className="icon" />}
                                                                    placeholderSymbol={<img src={fullStar} className="icon" />}
                                                                    fullSymbol={<img src={fullStar} className="icon" />}
                                                                />

                                                            </span>


                                                        </span>
                                                    </div>
                                                    <div className="rating-number">1 reviews</div>
                                                </div>
                                            </div>
                                            <div className="details-wrap">
                                                <div className="detail-list">
                                                    <h3>Address:</h3>
                                                    <ul className="details-values">
                                                        <li>
                                                            <div className="detail-text">{ServiceDetails?.addressData[0].cityName}</div>
                                                        </li>
                                                        <li>
                                                            <div className="detail-text">{ServiceDetails?.addressData[0]?.addressLine1}
                                                                {ServiceDetails?.addressData[0].addressLine2}</div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="detail-list">
                                                    <h3>Days Opened</h3>
                                                    <ul className="details-values">
                                                        <li>
                                                            <div className="detail-text"><span className="day-name">
                                                                {ServiceDetails?.addressData[0]?.daysOpened[0].day}
                                                            </span><span
                                                                className="timing">
                                                                    {ServiceDetails?.addressData[0]?.daysOpened[0].from}-
                                                                    {ServiceDetails?.addressData[0]?.daysOpened[0].to}
                                                                </span></div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <p>{ServiceDetails?.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <OtherServiceFromSameSeller />
                        </div>


                        <div>
                            <RecommendedService />

                        </div>

                        {/* 
                        <div className="reviews">
                            <div className="review-head">
                                <h2>Reviews</h2>
                            </div>
                            <div className="reviews-wrap"></div>
                        </div> */}

                        <div>
                            <Review />
                        </div>

                        <div>
                            <ReviewListCard />
                        </div>

                    </div>
                </section >
            }
        </>
    )
}

export default ServiceDetailsPage