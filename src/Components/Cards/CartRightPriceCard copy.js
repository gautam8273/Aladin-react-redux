import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import SinglePriceCard from './SinglePriceCard';

const CartRightPriceCard = () => {

    let cartDetails = useSelector(state => state.reducerGetCartData?.cartDetails);
    // console.log("cartDetails==>", cartDetails)

    const incPrice = useSelector(state => state.reducerCartIncreaseTotalPrice?.totalPriceCartProduct);

    const getLocalcartItems = useSelector(state => state.reducerGetLocalCart?.getLocalCart);


    if (!localStorage.getItem("loginData")) {
        cartDetails = JSON.parse(localStorage.getItem("alacart"));
    }
    // console.log("cartDetails==>", cartDetails)

    useEffect(() => {

    }, [cartDetails, getLocalcartItems])

    return (
        <>
            <div className="cart-heading">Total Cost</div>
            {
                cartDetails ? cartDetails.map((items, index) => {
                    return (
                        <div key={index}>

                            <SinglePriceCard dataPrice={items} />

                        </div>
                    )
                }) : null
            }
            <div className="total-wrap">
                <div className="text-wrap">To Pay</div>
                <div className="amount-wrap">${incPrice}</div>
            </div>
            <div className="btn-wrap"><button type="submit" className="btn">Book</button></div>
        </>
    )
}

export default CartRightPriceCard