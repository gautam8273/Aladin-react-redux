import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userAddToWishListAction, userRemoveToWishListAction } from '../../Store/Actions/action';

const Filter_RightImageProductCard = ({ data }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const filterImageData = useSelector(state => state.reducerGetServiceList?.filterPageImageData);
    // console.log("filterImageData===>", filterImageData)

    const [wishList, setWishList] = useState(data.wishlist)
    // console.log("wishList==>", wishList)

    const addToWishList = (id) => {
        // console.log("id==>", id)
        let token = localStorage.getItem("loginData");
        let wish = {
            serviceId: id
        }
        if (token) {
            if (!wishList) {
                userAddToWishListAction(dispatch, wish)
                setWishList(true)
            }
            else {
                userRemoveToWishListAction(dispatch, wish)
                setWishList(false)
            }
        }
        else {
            navigate('/sign-in')
        }

    }



    return (
        <>
            <div className='image-Box'  >
                <Link to={`/service-detail/${data.serviceId}/${data.sellerData[0].firstName}`}>
                    <div className="service-image" style={{ width: "200px" }}>
                        <img
                            src={data.path + data.serviceCover}
                            alt="service" />
                    </div>
                </Link>

                <div className="service-card">
                    <div className="service-name">Acupuncture Service</div>
                    <div className="service-name">AAABBBCCC</div>
                    <div className="provider-info">Category Name:= {data.categoryName}</div>
                    <div className="provider-info">${data.minPrice}-{data.maxPrice}</div>
                    <div className="provider-info">$ {data.price}</div>

                    <div className="seller-rating">

                        <div className="rating-wrap">

                            <div className="rating-number">Rating:= {data.averageRating}</div>
                        </div>
                    </div>
                    <div className="services-block">
                        <div className="price">$34.00</div>
                        <button className="wishlist-btn" onClick={() => { addToWishList(data._id) }}>
                            <i className={`${wishList ? "icon-heart filled" : "icon-heart"}`}
                            ></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter_RightImageProductCard