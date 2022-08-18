import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartLeftImageCard from '../Components/Cards/CartLeftImageCard'
import CartRightPriceCard from '../Components/Cards/CartRightPriceCard'
import { getCartDataAction, getlocalCartAction } from '../Store/Actions/action'

const MyCartPage = () => {
    // let quantity = 1

    let getCart = useSelector(state => state.reducerGetCartData?.cartDetails);
    console.log("getCart==>", getCart)

    const getLocalcartItems = useSelector(state => state.reducerGetLocalCart?.getLocalCart);
    // console.log("getLocalcartItems==>", getLocalcartItems)


    const [ids, setIds] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);


    if (!localStorage.getItem("loginData")) {
        getCart = getLocalcartItems
    }
    // console.log("getCart==>", getCart)


    useEffect(() => {
    }, [getCart])

    // useEffect(() => {
    //     let country = {
    //         country: localStorage.getItem("countryList")
    //     }
    //     getCartDataAction(dispatch, country)
    // }, [dispatch])

    // useEffect(() => {
    //     getlocalCartAction(dispatch) // localstorage data saved in redux
    // }, [getCart])


    const selectAllHandle = (e) => {
        // alert("dfsfs")
        let newState = [...ids];
        let checkboxesAll = document.querySelectorAll("#cartBox");
        if (e.target.checked) {
            checkboxesAll.forEach((item) => {
                item.checked = true;
                newState.push(item.value);
            });
            setSelectedItems([...getCart]);
        } else {
            checkboxesAll.forEach((item) => {
                item.checked = false;
                newState = [];
            });
            setSelectedItems([]);
        }
        setIds(newState);
    }

    return (
        <>
            <section className="cart">
                <div className="">
                    <div className="Toastify"></div>
                </div>
                <div className="container">
                    <h1>
                        Cart (
                        {
                            getCart
                                ?
                                getCart?.length
                                :
                                localStorage.getItem("alacart")?.length
                        }
                        )
                    </h1>
                    <form>

                        {
                            getCart.length > 0
                                ?
                                <div className="select-all">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            // id="selectAll"
                                            id="cartBox"
                                            onClick={selectAllHandle}
                                        />
                                        <label
                                            className="form-check-label">Select All</label></div>
                                </div>
                                : null

                        }



                        {/* <div className="select-all">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="selectAll"
                                    onClick={selectAllHandle}
                                />
                                <label
                                    className="form-check-label">Select All</label></div>
                        </div> */}



                        <div className="cart-wrap">
                            <div className="left-block">
                                {
                                    getCart
                                        ?
                                        getCart.map((items, index) => {
                                            return (
                                                <div>
                                                    <CartLeftImageCard
                                                        cartImageCard={items}
                                                        key={index}
                                                        ids={ids}
                                                        setIds={setIds}
                                                        selectedItems={selectedItems}
                                                        setSelectedItems={setSelectedItems}

                                                    />

                                                    {/* <div className="right-block">
                                                        <CartRightPriceCard list={items} />
                                                    </div> */}
                                                </div>
                                            )
                                        })
                                        : null
                                }

                                {/* <CartLeftImageCard /> */}

                            </div>
                            <div className="right-block">
                                <CartRightPriceCard />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default MyCartPage