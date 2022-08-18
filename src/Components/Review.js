import React, { useEffect, useState } from 'react'
import Rating from 'react-rating';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import fullStar from '../assets/images/icons/icon-star-2.svg';
import emptyStar from '../assets/images/icons/icon-star-empty.svg'
import { getReviewListAction } from '../Store/Actions/getReviewListAction';
import { userAddReviewRatingAction } from '../Store/Actions/userAddReviewRatingAction';

const Review = () => {

    const [starRating, setStarRating] = useState(0);
    const [reviewMessage, setReviewMessage] = useState("")
    // const [emptyRating, setEmptyRating] = useState();

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const ServiceDetails = useSelector(state => state.reducerGetServiceDetailsPage?.getSericeDetails)
    // console.log("ServiceDetails==.", ServiceDetails)

    const reviewInfoList = useSelector(state => state.reducerReviewRating?.getReviewRating);
    console.log("reviewInfoList>>>>", reviewInfoList)

    const { serviceId } = useParams();
    // console.log("serviceId>>>>", serviceId)

    useEffect(() => {

        getReviewListAction(dispatch, serviceId)
    }, [dispatch])

    const submitRating = () => {
        let token = localStorage.getItem("loginData");

        if (!token) {
            navigate('/sign-in')
        } else {
            if (starRating == 0 || reviewMessage == "") {
                alert("Please rate and review the service")
            } else {
                let reqRatingPayload = {
                    rating: starRating,
                    review: reviewMessage,
                    serviceId: serviceId
                }

                let reqSellerNameForUrl = ServiceDetails?.sellerData[0].firstName
                userAddReviewRatingAction(dispatch, reqRatingPayload, serviceId, navigate, reqSellerNameForUrl)
                setReviewMessage("");
                setStarRating(0)
            }
        }
    }

    const ratingChange = (val) => {
        setStarRating(val)
    }

    return (
        <>
            <div className="reviews">
                <ToastContainer
                    position='top-right'
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                />
                <div className="review-head">
                    <h2>Reviews</h2>
                </div>
                <div className="reviews-wrap"></div>
                <div className="add-review">
                    <div className="review-logo">
                        <div className="text-image">a</div>
                    </div>
                    <div className="add-form">
                        <form>
                            <div className="form-wrap">
                                <div className="textarea-wrap">
                                    <textarea
                                        className="textarea"
                                        placeholder="Write a review"
                                        value={reviewMessage}
                                        onChange={(e) => setReviewMessage(e.target.value)}
                                    >

                                    </textarea>
                                </div>
                                <div className="rate-service">
                                    <h4>Rate the service:</h4>
                                    <div className="rate-image">
                                        <div className="rating-image">

                                            <Rating
                                                placeholderRating={starRating}
                                                emptySymbol={
                                                    <img src={emptyStar} className="icon" />
                                                }
                                                placeholderSymbol={
                                                    <img src={fullStar} className="icon" />
                                                }
                                                fullSymbol={
                                                    <img src={fullStar} className="icon" />
                                                }
                                                onClick={ratingChange}
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input
                                type="button"
                                className="btn"
                                value="Add a Review"
                                onClick={submitRating}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Review