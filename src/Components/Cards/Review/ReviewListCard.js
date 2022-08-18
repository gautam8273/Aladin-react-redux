import React from 'react'
import Rating from 'react-rating';
import fullStar from '../../../assets/images/icons/icon-star-2.svg'
import emptyStar from '../../../assets/images/icons/icon-star-empty.svg'

const ReviewListCard = () => {
    return (
        <>
            <div className="reviews" >

                <div className="review-head">
                    <h2>Reviews List</h2>
                </div>
                <div className="reviews-wrap" style={{ backgroundColor: "#ffffff" }}>
                    <div className="add-review">
                        <div className="review-logo">
                            <div className="text-image">a</div>
                        </div>
                        <div className="review-text">
                            <div className="review-details">
                                <div className="review-info">
                                    <ul className="tests-wrap">
                                        <li>Astrology Services</li>
                                    </ul>
                                    <div className="review-name">Siddarth Pachaury</div>
                                    <div className="review-timing">22 Jun 2022 12:39</div>
                                </div>

                                <div className="form-wrap">
                                    <div className="textarea-wrap">

                                    </div>

                                    <div className="rate-image">
                                        <div className="rating-image">

                                            <span style={{
                                                display: "inline-block",
                                                direction: "ltr"
                                            }}>
                                                <span style={{
                                                    cursor: "inherit",
                                                    display: "inline-block",
                                                    position: "relative"
                                                }}><span
                                                    style={{ visibility: "hidden" }}>
                                                        <img src={emptyStar}
                                                            className="icon" />
                                                    </span>
                                                    <span style={{
                                                        display: "inline-block",
                                                        position: "absolute",
                                                        overflow: "hidden",
                                                        top: "0px",
                                                        left: "0px",
                                                        width: "100%"
                                                    }}>
                                                        <img src={fullStar}
                                                            className="icon" /></span>
                                                </span>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ReviewListCard