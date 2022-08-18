import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { userAddToWishListAction, userRemoveToWishListAction } from '../../Store/Actions/action';

const RecommendedCardService = ({ dataInfo }) => {

    const dispatch = useDispatch();

    const recommendedData = useSelector(state => state.reducerGetRecommendedService?.recommendedServiceData);
    // console.log("recommendedData===>", recommendedData)

    // const anotherService = useSelector(state => state.reducergetAnotherServiceFromSameSeller?.anotherserviceSameSeller);
    // console.log("anotherService==>", anotherService)

    const [wistTag, seWishTag] = useState(dataInfo.wishlist);
    // console.log("wishtag===>", wistTag)


    const { serviceId, sellerName } = useParams();
    // console.log("serviceId==>", sellerName)

    const recommendWishListBtn = (id) => {
        console.log("id==>", id)
        let wish = {
            serviceId: id
        }

        if (!wistTag) {
            userAddToWishListAction(dispatch, wish)
            // setWishBtn(true)
        }
        else {
            userRemoveToWishListAction(dispatch, wish)
            // setWishBtn(false)
        }
        seWishTag(prev => !prev)

    }


    return (
        <>


            <div className="card-wrap">

                <Link to={`/service-detail/${dataInfo.serviceId}/${dataInfo.sellerData[0].firstName}`}>
                    <div className="service-image"><img
                        src={dataInfo.path + dataInfo.serviceCover} alt="service-image" />
                    </div>
                </Link>

                <div className="service-card">
                    <div className="service-name">{dataInfo.title}</div>
                    <div className="location">{dataInfo.addressLine1} {dataInfo.addressLine2}</div>
                    <div className="address">{dataInfo.description}</div>
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
                            <div className="rating-number"> reviews</div>
                        </div>
                    </div>
                    <div className="services-block">
                        <div className="price">${dataInfo.price}</div>
                        <button className="wishlist-btn"
                            onClick={() => { recommendWishListBtn(dataInfo.serviceId) }}
                        >
                            {/* <i className="icon-heart filledOther" ></i> */}
                            <i className={`${wistTag ? "icon-heart recommend" : "icon-heart recommendbtnWish"}`}></i>
                        </button>
                    </div>
                </div>

            </div>

        </>
    )
}

export default RecommendedCardService