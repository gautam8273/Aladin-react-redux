import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userGetWishListAction, userRemoveToWishListAction } from '../../Store/Actions/action';

const WishListPageProductCard = ({ data }) => {

    const dispatch = useDispatch();

    // console.log("data==>", data.serviceId);

    const [wish, setWish] = useState(data.wishlist)
    // console.log("wish==>", wish)

    const removeFromWishList = (id) => {
        // alert("first" + id)
        // console.log("id==>", id)
        let wish = {
            serviceId: id
        }
        // console.log("===>", wish)
        userRemoveToWishListAction(dispatch, wish)
        userGetWishListAction(dispatch)
        setWish(false)
    }

    return (
        <>
            <div className="sub-category_wrapper" >
                <div className="service-block" >
                    <Link to={`/service-detail/${data.serviceId}/${data.sellerData[0].firstName}`}>
                        <div className="service-image">
                            <img src={data.path + data.serviceCover} alt="service" style={{
                                width: "200px",
                                height: "200px"
                            }} />
                        </div>
                    </Link>

                    <div className="service-card">
                        <div className="service-name">{data.title}</div>
                        <div className="provider-info">{data.sellerData[0]?.firstName}{data.sellerData[0]?.lastName}</div>
                        <div className="seller-rating">
                            <div className="rating-wrap">
                                <div className="rating-image">
                                    {/* <img src="" alt="rating" />  */}
                                    {data.averageRating}
                                </div>
                                <div className="rating-number">{data.totalReview} reviews</div>
                            </div>
                        </div>
                        <div className="services-block">
                            <div className="price">${data.minPrice}-{data.maxPrice}</div>
                            <button className="wishlist-btn" onClick={() => removeFromWishList(data.serviceId)} >
                                <i className="icon-heart add"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WishListPageProductCard;