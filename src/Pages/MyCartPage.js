import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartLeftImageCard from '../Components/Cards/CartLeftImageCard'
import CartRightPriceCard from '../Components/Cards/CartRightPriceCard'
import { getCartDataAction, getlocalCartAction } from '../Store/Actions/action'

const MyCartPage = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    // let quantity = 1

    const [ids, setIds] = useState([])

    let getCart = useSelector(state => state.reducerGetCartData?.cartDetails);
    // console.log("getCart==>", getCart)

    const getLocalcartItems = useSelector(state => state.reducerGetLocalCart?.getLocalCart);
    // console.log("getLocalcartItems==>", getLocalcartItems)

    // const dispatch = useDispatch();


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

    // console.log('selectedItems', selectedItems)


    const selectAllProducts = (e) => {
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
    };


    useEffect(() => {
        if (selectedItems?.length === getCart?.length && getCart?.length !== 0) {
            let checkboxes = document.querySelector("#selectAll");
            checkboxes.checked = true;
        }

    }, [selectedItems])


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
                        <div className="select-all">
                            <div className="form-check"><input
                                className="form-check-input"
                                type="checkbox"
                                id="selectAll"
                                onClick={selectAllProducts}
                            />
                                <label
                                    className="form-check-label">Select All</label></div>
                        </div>
                        <div className="cart-wrap">
                            <div className="left-block">
                                {
                                    getCart
                                        ?
                                        getCart.map((items, index) => {
                                            return (
                                                <CartLeftImageCard
                                                    cartImageCard={items}
                                                    key={index}
                                                    setSelectedItems={setSelectedItems}
                                                    selectedItems={selectedItems}
                                                />
                                            )
                                        })
                                        : null
                                }

                                {/* <CartLeftImageCard /> */}

                            </div>
                            <div className="right-block">
                                <CartRightPriceCard
                                    selectedItems={selectedItems}
                                    setSelectedItems={setSelectedItems}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default MyCartPage