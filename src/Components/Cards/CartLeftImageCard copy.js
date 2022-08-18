import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getCartDataAction, getlocalCartAction, removeDataFromcartAction,
    updateDecreasePriceCartAction,
    updateIncreasePriceCartAction, updateToCartQuantityAction
} from '../../Store/Actions/action'

const CartLeftImageCard = (props, { max }) => {

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState();


    let cartDetails = useSelector(state => state.reducerGetCartData?.cartDetails);
    // console.log("cartDetails==>", cartDetails)

    const updatecart = useSelector(state => state.reducerUpdateToCartPriceQuantity?.updateCartDetails);
    // console.log("updatecart==>", updatecart)

    const incPrice = useSelector(state => state.reducerCartIncreaseTotalPrice?.totalPriceCartProduct);

    let getLocalcartItems = useSelector(state => state.reducerGetLocalCart?.getLocalCart);
    // console.log("getLocalcartItems==>", getLocalcartItems)




    let items = props.cartImageCard
    // console.log("items", items)
    // items = cartDetails

    // const [qty, setQty] = useState();
    // console.log("qty", qty)

    // total price
    useEffect(() => {
        setQuantity(items.quantity)

        // increase & decrease total price
        let totalPrice = items.quantity * items?.price
        updateIncreasePriceCartAction(dispatch, totalPrice)
    }, [])


    useEffect(() => {
        let country = {
            country: localStorage.getItem("countryList")
        }
        getCartDataAction(dispatch, country)
    }, [dispatch])


    // Remove product from cart
    const removeDataFromCart = (id) => {

        let cartId = {
            cartId: id
        }

        if (localStorage.getItem("loginData")) {
            let country = {
                country: localStorage.getItem("countryList")
            }
            removeDataFromcartAction(dispatch, cartId)
            getCartDataAction(dispatch, country)
        }
        else {
            if (window.confirm("are you sure  to delete this product")) {
                let country = {
                    country: localStorage.getItem("countryList")
                }
                let copylocalstorage = JSON.parse(localStorage.getItem("alacart"));
                let index = copylocalstorage.findIndex((item) => item._id == id);
                copylocalstorage.splice(index, 1);
                localStorage.setItem("alacart", JSON.stringify(copylocalstorage));
                getCartDataAction(dispatch, country);
            }
            getlocalCartAction(dispatch);
        }
    }

    useEffect(() => {
        getlocalCartAction(dispatch) // localstorage data saved in redux
    }, [dispatch])


    // Increase products
    // const incProduct = (id) => {
    //     // console.log("incProduct", id)
    //     let x = qty;
    //     if (qty >= max) {
    //         setQty(max);
    //     } else {
    //         setQty(qty + 1);
    //         let reqPayload = {
    //             cartId: id,
    //             quantity: ++x
    //         }
    //         updateToCartQuantityAction(dispatch, reqPayload)
    //     }
    //     // Increase total price
    //     updateIncreasePriceCartAction(dispatch, items?.price)
    // }



    // const decProduct = (id) => {
    //     // console.log("decProduct", id)
    //     let x = qty;
    //     if (qty <= 1) {
    //         setQty(0);
    //     } else {
    //         setQty(qty - 1);
    //         let reqPayload = {
    //             cartId: id,
    //             quantity: --x
    //         }
    //         updateToCartQuantityAction(dispatch, reqPayload)
    //     }

    //     // Decrease total price
    //     updateDecreasePriceCartAction(dispatch, items?.price)
    // }



    const incProduct = (id) => {
        // console.log("id==>", id)
        if (localStorage.getItem("loginData")) {
            setQuantity(quantity + 1);

            const reqpayload = {
                cartId: id,
                quantity: quantity + 1
            };
            updateToCartQuantityAction(dispatch, reqpayload);
        }
        else {
            setQuantity(quantity + 1);
            let localstoragedata = JSON.parse(localStorage.getItem("alacart"));
            let index = localstoragedata.findIndex((items) => items._id == id);
            localstoragedata[index]["quantity"] = quantity + 1;
            localStorage.setItem("alacart", JSON.stringify(localstoragedata));
        }
        // Increase total price
        updateIncreasePriceCartAction(dispatch, items?.price)
    };

    const decProduct = (id) => {
        // console.log("id==>", id)
        if (localStorage.getItem("loginData")) {
            setQuantity(quantity - 1);

            const reqpayload = {
                cartId: id,
                quantity: quantity - 1
            };
            updateToCartQuantityAction(dispatch, reqpayload);
        }
        else {
            if (quantity == 1) {
                return
            }
            else {
                setQuantity(quantity - 1);
                let localstoragedata = JSON.parse(localStorage.getItem("alacart"));
                let index = localstoragedata.findIndex((items) => items._id == id);
                localstoragedata[index]["quantity"] = quantity - 1;
                localStorage.setItem("alacart", JSON.stringify(localstoragedata));
            }
        }
        // Decrease total price
        updateDecreasePriceCartAction(dispatch, items?.price)
    };




    return (
        <>

            {/* {
                cartDetails ? cartDetails.map((data, index) => {
                    return ( */}
            <div className="cart-item" >
                <div className="checkbox-wrap">
                    <div className="form-check"><input className="form-check-input" type="checkbox" id="cartBox"
                        value="6279f90e5c1fa0dae5a14fe0" /></div>
                </div>
                <div className="item-img"><img src={items.path + items.serviceCover}
                    alt="item" /></div>
                <div className="item-right">
                    <div className="item-info">
                        <div className="item-name"><a href="/user/cart">{items.sellerData[0].businessName}</a></div>
                        <div className="item-provider">{items.serviceTitle}</div>
                        <div className="remove-btn" onClick={() => { removeDataFromCart(items._id) }}>
                            <button type="button">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path
                                        d="M4.625 1.87354H4.5C4.56875 1.87354 4.625 1.81729 4.625 1.74854V1.87354H9.375V1.74854C9.375 1.81729 9.43125 1.87354 9.5 1.87354H9.375V2.99854H10.5V1.74854C10.5 1.19697 10.0516 0.748535 9.5 0.748535H4.5C3.94844 0.748535 3.5 1.19697 3.5 1.74854V2.99854H4.625V1.87354ZM12.5 2.99854H1.5C1.22344 2.99854 1 3.22197 1 3.49854V3.99854C1 4.06729 1.05625 4.12354 1.125 4.12354H2.06875L2.45469 12.2954C2.47969 12.8282 2.92031 13.2485 3.45313 13.2485H10.5469C11.0813 13.2485 11.5203 12.8298 11.5453 12.2954L11.9313 4.12354H12.875C12.9438 4.12354 13 4.06729 13 3.99854V3.49854C13 3.22197 12.7766 2.99854 12.5 2.99854ZM10.4266 12.1235H3.57344L3.19531 4.12354H10.8047L10.4266 12.1235Z"
                                        fill="#9A9FA5"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="item-price">
                        <div className="price-wrap">${items.price}</div>
                        <div className="quantity-wrap">
                            <div className="quantity-decrease"><button type="button" onClick={() => decProduct(items._id)} >—</button></div>
                            {/* {
                                cartDetails ? cartDetails.map((items, index) => {
                                    return (
                                        <div className="quantity" key={index}>{items.quantity}</div>

                                    )
                                }) : null
                            } */}
                            <div className="quantity" >
                                {/* {qty} */}
                                {quantity}
                            </div>
                            <div className="quantity-increase"><button type="button" onClick={() => incProduct(items._id)} >+</button></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* )
                }) : null
            }  */}

        </>
    )
}

export default CartLeftImageCard