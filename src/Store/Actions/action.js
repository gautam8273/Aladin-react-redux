import {
    GET_HOME_PAGE,
    GET_CATEGORY_LIST,
    GET_SUB_CATEGORY_SERVICE,
    GET_COUNTRY_LIST,
    GET_STATE_LIST,
    GET_CITY_LIST,
    SELLER_SIGN_UP_FORM,
    USER_SIGN_UP_DETAILS,
    LOGIN_FORM_DETAILS,
    GET_SERVICE_LIST,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
    USER_PROFILE_DETAILS,
    USER_GET_WISHLIST,
    GET_SERVICE_DETAILS,
    ANOTHER_SERVICE_FROM_SELLER,
    GET_RECOMMENDED_SERVICE_DATA,
    ADD_TO_CART_DETAILS,
    GET_CART_DATA_DETAILS,
    REMOVE_DATA_FROM_CART_DETAILS,
    CART_UPDATE_PRICE_QUANTITY,
    TOTAL_PRICE_CART_PRODUCT,
    INCREASE_TOTAL_PRICE_CART_PRODUCT,
    DECREASE_TOTAL_PRICE_CART_PRODUCT,
    SEARCH_GET_SERVICE,
    GET_LOCATION_DATA,
    GET_LANGUAGE_DETAILS,
    GET_LOCAL_LOCAl_STORAGE,
    GET_CHECK_AUTH_DETAILS,
    EDIT_USER_PROFILE_DETAILS,
    MENU_BAR_ACTIVE_CLASS_INFO
} from "../Reducers/actionTypes";

import {
    getHomePageDetails,
    getCategoryListDetails,
    getSubCategoryServiceDetails,
    getCountryListDetails,
    StateListDetails,
    cityListDetails,
    sellerSignUpFormDetails,
    userSignUpFormDetails,
    loginFormDetails,
    Api
} from "../../Api/api";
import { endPoints } from "../../Api/endPoints";




// Home Page data---for Banner, trending, core services etc home page all data
export const getHomePageAction = (dispatch) => {
    getHomePageDetails().then((res) => {
        // console.log("res==>", res)
        dispatch({
            type: GET_HOME_PAGE,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>getHomePageAction") })
}

// All category list
export const categoryListAction = (dispatch) => {
    Api.get(endPoints.getCategoryApi).then((res) => {
        // console.log("res===>", res)
        dispatch({
            type: GET_CATEGORY_LIST,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>categoryListAction") })
}

// category page products --- SUB-CATEGORY-SERVICE 
export const getSubCategoryServicesPageAction = (dispatch, id) => {
    getSubCategoryServiceDetails(id).then((res) => {
        // console.log("res==>", res)
        dispatch({
            type: GET_SUB_CATEGORY_SERVICE,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>getcategoryPageAction") })
}

// country list
export const getCountryListAction = (dispatch) => {
    getCountryListDetails().then((res) => {
        dispatch({
            type: GET_COUNTRY_LIST,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>getCountryListAction") })
}

// state list
export const getStateListAction = (dispatch, id) => {
    StateListDetails(id).then((res) => {
        // console.log("res==>", res)
        dispatch({
            type: GET_STATE_LIST,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>getStateListAction") })
}

// city list
export const getCityAction = (dispatch, id) => {
    cityListDetails(id).then((res) => {
        dispatch({
            type: GET_CITY_LIST,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>getCityAction") })
}

// seller form
export const sellerSignUpFormAction = (dispatch, id) => {
    console.log("id>>>", id)
    sellerSignUpFormDetails(id).then((res) => {
        dispatch({
            type: SELLER_SIGN_UP_FORM,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>sellerSignUpFormAction") })
}

// User Sign up
export const userSignUpAction = (dispatch, id) => {
    userSignUpFormDetails(id).then((res) => {
        dispatch({
            type: USER_SIGN_UP_DETAILS,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>userSignUpAction") })
}


// login/signIn form
export const loginFormAction = (dispatch, id, navigate) => {


    loginFormDetails(id).then((res) => {
        if (res.data.data.token)
            localStorage.setItem("loginData", res.data.data.token);

        if (localStorage.getItem("alacart")) {
            let localcartdata = JSON.parse(localStorage.getItem('alacart'))
            localcartdata.forEach((ele) => {
                let reqPayload2 = {
                    serviceId: ele.serviceId,
                    quantity: 1
                }
                console.log("reqPayload2>>>>", reqPayload2)
                addToCartAction(dispatch, reqPayload2);
                localStorage.removeItem("alacart")

            }
            )
        }


        // window.location.reload();
        dispatch({
            type: LOGIN_FORM_DETAILS,
            payload: res.data.data.token
        })
        if (res.data.data.token) {
            window.location.reload(false);
        }
        // window.location.reload();
    }).catch(() => { console.log("Having Error===>loginFormAction") })
}

// NEW action+api-----    get service list
export const getServiceListAction = (dispatch, id, idd) => {
    let countryAbc = JSON.parse(localStorage.getItem("countryList"))
    // console.log("countryAbc==>", countryAbc)
    Api.post(endPoints.getServiceListApi + '?categoryId=' + `${id}` + '&subcategoryId=' + `${idd}`,
        { country: countryAbc }
    ).then((res) => {
        // console.log("res==>", res)
        dispatch({
            type: GET_SERVICE_LIST,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>loginFormAction") })
}

// add to wishlist
export const userAddToWishListAction = (dispatch, id) => {
    Api.post(endPoints.addToWishListApi, id).then((res) => {
        dispatch({
            type: ADD_TO_WISHLIST,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>userAddToWishListAction") })
}

// Remove fro wishList
export const userRemoveToWishListAction = (dispatch, id) => {
    Api.post(endPoints.removeFromWishListApi, id).then((res) => {
        dispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>userRemoveToWishListAction") })
}

// user Profile Details
export const userProfileDetailsAction = (dispatch) => {
    Api.get(endPoints.UserProfileDetailsApi).then((res) => {
        dispatch({
            type: USER_PROFILE_DETAILS,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>userProfileDetailsAction") })
}

// user Get WishList
export const userGetWishListAction = (dispatch) => {
    Api.get(endPoints.userGetWishListApi).then((res) => {
        dispatch({
            type: USER_GET_WISHLIST,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>userGetWishListAction") })
}

// get service details page
export const getserviceDetailsAction = (dispatch, id, countryName) => {
    Api.get(endPoints.GET_SERVICES_DETAILS_API + '?serviceId=' + `${id}` + "&country=" + `${countryName
        }`).then((res) => {
            // console.log("res===>", res)
            dispatch({
                type: GET_SERVICE_DETAILS,
                payload: res.data.data
            })
        }).catch(() => { console.log("Having Error===>getserviceDetailsAction") })
}

// get_another_service_from_same_seller
export const getAnotherServiceFromSameSellerAction = (dispatch, serId, sellId, countryListName) => {
    Api.get(endPoints.GET_ANOTHER_SERVICE_FROM_SAME_SELLER + '?serviceId=' + `${serId}` + '&sellerId=' +
        `${sellId}` + '&country=' + countryListName).then((res) => {
            // console.log("res==>", res)
            dispatch({
                type: ANOTHER_SERVICE_FROM_SELLER,
                payload: res.data.data
            })
        }).catch(() => { console.log("Having Error===>getAnotherServiceFromSameSellerAction") })
}

// get_recommended_service
export const getRecommendedServiceAction = (dispatch, serviceId, catId, subCatId, countryListName) => {
    Api.get(endPoints.GET_RECOMMENDED_SERVICE + '?serviceId=' + `${serviceId}` + '&categoryId=' + `${catId}` +
        '&subcategoryId=' + `${subCatId}` + '&country=' + countryListName).then((res) => {
            // console.log("res==>", res)
            dispatch({
                type: GET_RECOMMENDED_SERVICE_DATA,
                payload: res.data.data
            })
        }).catch(() => { console.log("Having Error===>getRecommendedServiceAction") })
}



// add to cart 
export const addToCartAction = (dispatch, addCart, reqPayload2) => {
    Api.post(endPoints.ADD_TO_CART_API, addCart, reqPayload2).then((res) => {
        // get to cart-- start
        // update count on header  cart
        let countryListName = localStorage.getItem("countryList")
        Api.post(endPoints.GET_CART_DATA_API, { country: countryListName }).then((res) => {
            dispatch({
                type: GET_CART_DATA_DETAILS,
                payload: res.data.data
            })
        }).catch(() => { console.log("Having Error===>getCartDataAction") })
        // get to cart-- end
        dispatch({
            type: ADD_TO_CART_DETAILS,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>addToCartAction") })
}

// get cart data
export const getCartDataAction = (dispatch, country) => {
    let token = localStorage.getItem("loginData")
    if (token) {
        Api.post(endPoints.GET_CART_DATA_API, country).then((res) => {
            // console.log("res==>", res)
            dispatch({
                type: GET_CART_DATA_DETAILS,
                payload: res.data.data
            })
        }).catch(() => { console.log("Having Error===>getCartDataAction") })
    }

}

// remove Data From Cart 
export const removeDataFromcartAction = (dispatch, cartId) => {
    Api.post(endPoints.REMOVE_DATA_FROM_CART_API, cartId).then((res) => {
        dispatch({
            type: REMOVE_DATA_FROM_CART_DETAILS,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>removeDataFromcartAction") })
}

// update the cart Quantity
export const updateToCartQuantityAction = (dispatch, reqPayload) => {
    Api.post(endPoints.UPDATE_TO_CART_API, reqPayload).then((res) => {
        // get to cart-- start
        // update count on cart page  cart
        let countryListName = localStorage.getItem("countryList")
        Api.post(endPoints.GET_CART_DATA_API, { country: countryListName }).then((res) => {
            dispatch({
                type: GET_CART_DATA_DETAILS,
                payload: res.data.data
            })
        }).catch(() => { console.log("Having Error===>getCartDataAction") })

        // get to cart-- end
        dispatch({
            type: CART_UPDATE_PRICE_QUANTITY,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>updateToCartPriceQuantityAction") })
}



// INCREASE total price cart product
export const updateIncreasePriceCartAction = (dispatch, totalPrice) => {
    dispatch({
        type: INCREASE_TOTAL_PRICE_CART_PRODUCT,
        payload: totalPrice
    })
}

//  Decrease total price cart product
export const updateDecreasePriceCartAction = (dispatch, totalPrice) => {
    dispatch({
        type: DECREASE_TOTAL_PRICE_CART_PRODUCT,
        payload: totalPrice
    })
}


// search bar get service Api
export const searchGetServiceAction = (dispatch, str) => {
    let countryAbc = localStorage.getItem("countryList")
    Api.post(endPoints.SEARCH_GET_SERVICE_API
        + '?categoryId=undefined'
        + '&subcategoryId=undefined'
        + '&string=' + `${str}`,
        { country: countryAbc, limit: 10, pageno: 1 }).then((res) => {
            dispatch({
                type: SEARCH_GET_SERVICE,
                payload: res.data.data
            })
        }).catch(() => { console.log("Having Error===>searchGetServiceAction") })
}



// for get location
export const getLocationAction = (dispatch, val) => {
    Api.get(endPoints.GET_LOCATION_API + `?string=${val}`).then((res) => {
        dispatch({
            type: GET_LOCATION_DATA,
            payload: res.data.data
        })

    }).catch(() => { console.log("Having Error===>getLocationAction") })
}

// get language
export const getLanguageAction = (dispatch) => {
    Api.get(endPoints.GET_LANGUAGE_API).then((res) => {
        dispatch({
            type: GET_LANGUAGE_DETAILS,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>getLanguageAction") })
}


// get local cart for local storage for delete the product from cart page---in signout condition
export const getlocalCartAction = (dispatch, id) => {
    let cartData = JSON.parse(localStorage.getItem("alacart"));
    // console.log("cartData==>", cartData)
    let token = localStorage.getItem("loginData")
    if (!token) {
        dispatch({
            type: GET_LOCAL_LOCAl_STORAGE,
            payload: cartData
        })
    }
}


// check auth
export const checkAuthAction = (dispatch) => {
    let token = localStorage.getItem("loginData");
    if (token) {
        Api.get(endPoints.CHECK_AUTH_API).then((res) => {
            dispatch({
                type: GET_CHECK_AUTH_DETAILS,
                payload: res.data.data
            })
        }).catch(() => { console.log("Having Error===>checkAuthAction") })
    }
}

// user Edit profile Action
export const userEditProfileAction = (dispatch, reqpayload) => {
    let token = localStorage.getItem("loginData");
    if (token) {
        Api.post(endPoints.USER_EDIT_PROFILE_API, reqpayload).then((res) => {
            // console.log("res==>", res)
            dispatch({
                type: EDIT_USER_PROFILE_DETAILS,
                payload: res.data
            })
        }).catch(() => { console.log("Having Error===>userEditProfileAction") })
    }
}


// for active class on category list dropdown menu
export const menuBarActiveClassAction = (dispatch, catNameActive, catId) => {
    // console.log(catNameActive)
    dispatch({
        type: MENU_BAR_ACTIVE_CLASS_INFO,
        payload: catNameActive,
        payload1: catId
    })
}