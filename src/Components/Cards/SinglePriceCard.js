import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const SinglePriceCard = ({ dataPrice }) => {

    // console.log("selectedItems\\\\\\\\\\\\", selectedItems)

    // console.log("dataPrice==>", dataPrice)

    let cartDetails = useSelector(state => state.reducerGetCartData?.cartDetails);
    // console.log("cartDetails==>", cartDetails)

    const [singlePrice, setSinglePrice] = useState();


    // single product single price---- logout condition
    // useEffect(() => {
    //     if (!localStorage.getItem("loginData")) {
    //         //pass data from localstorage to store
    //         cartDetails = JSON.parse(localStorage.getItem("alacart"));
    //         // console.log("fdgdfgs==>", cartDetails)
    //         cartDetails.forEach(element => {
    //             if (dataPrice._id == element._id) {
    //                 setSinglePrice(element.quantity * element.price)

    //             }
    //         })
    //     }
    // }, [localStorage.getItem("alacart")])



    // console.log("cartDetails==>", cartDetails)



    // single product price change-- - login condition
    // useEffect(() => {

    //     let token = localStorage.getItem("loginData")

    //     if (token) {
    //         cartDetails.forEach(ele => {
    //             if (dataPrice?._id == ele?._id) {
    //                 setSinglePrice(ele.quantity * ele.price)
    //                 // getTotalPriceOfSingleItem(ele.quantity * ele.price)
    //             }
    //         })
    //     }

    // }, [cartDetails])






    return (
        <>
            <div >
                <ul className="added-items">
                    <li>
                        <div className="added-item">
                            <div className="item-name"><a href="/user/cart">{dataPrice?.serviceTitle}</a></div>
                            <div className="item-provider">{dataPrice?.sellerData[0]?.businessName}</div>

                        </div>
                        <div className="item-price">{dataPrice?.price * dataPrice?.quantity}</div>

                    </li>
                </ul>


            </div>
        </>
    )
}

export default SinglePriceCard