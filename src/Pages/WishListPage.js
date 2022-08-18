import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import WishListPageProductCard from '../Components/Cards/WishListPageProductCard';
import { userGetWishListAction } from '../Store/Actions/action';

const WishListPage = () => {

    const dispatch = useDispatch();

    const userGetWishList = useSelector(state => state.reducerUserGetWishList?.userGetWishList);
    // console.log("userGetWishList==>", userGetWishList)



    useEffect(() => {
        let token = localStorage.getItem("loginData");
        if (token) {
            userGetWishListAction(dispatch)
        }
    }, [dispatch])





    return (
        <>
            <section className='sub-category-block search-section wishlist-section'>
                <div className=""><div className="Toastify"></div></div>
                <div className='container'>
                    <div className='right-block'>
                        <h1>Wishlist</h1>
                        <div className='wishList-Box' style={{
                            display: "flex",
                            flexWrap: "wrap"
                        }}>

                            {
                                userGetWishList.length > 0 ? userGetWishList.map((items, index) => {
                                    return (
                                        <div key={index}>
                                            <WishListPageProductCard data={items} />
                                        </div>
                                    )
                                }) : <div>No Wishlist</div>
                            }
                        </div>





                    </div>

                </div>

            </section>

        </>
    )
}

export default WishListPage