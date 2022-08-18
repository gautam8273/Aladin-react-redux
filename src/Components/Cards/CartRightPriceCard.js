import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import SinglePriceCard from './SinglePriceCard';

const CartRightPriceCard = ({ selectedItems }) => {

    // console.log("selectedItems>>>>", selectedItems)

    let cartDetails = useSelector(state => state.reducerGetCartData?.cartDetails);
    // console.log("cartDetails==>", cartDetails)

    const incPrice = useSelector(state => state.reducerCartIncreaseTotalPrice?.totalPriceCartProduct);

    const getLocalcartItems = useSelector(state => state.reducerGetLocalCart?.getLocalCart);


    if (!localStorage.getItem("loginData")) {
        cartDetails = JSON.parse(localStorage.getItem("alacart"));
    };

    const totalPrice = () => {
        // console.log('selectedItems', selectedItems)
        let totalAmount = 0
        selectedItems.forEach(element => {
            totalAmount = totalAmount + (element?.price * element?.quantity)
        });
        return totalAmount
    }


    useEffect(() => {

    }, [cartDetails, getLocalcartItems])

    // useEffect(() => {
    //     // console.log('updated')
    // }, [selectedItems?.[0]?.quantity])

    // console.log('selectedItems', selectedItems)

    return (
        <>
            <div className="cart-heading">Total Cost</div>
            {
                selectedItems?.map((item, index) => {
                    return (
                        <div key={index}>

                            <SinglePriceCard
                                dataPrice={item}
                            // selectedItems={item}

                            />

                        </div>
                    )
                })
            }
            <div className="total-wrap">
                <div className="text-wrap">To Pay</div>

                <div className="amount-wrap">${selectedItems?.length ? totalPrice(0) : '0'}</div>

            </div>
            <div className="btn-wrap"><button type="submit" className="btn">Book</button></div>
        </>
    )
}

export default CartRightPriceCard