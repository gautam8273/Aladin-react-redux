import axios from "axios"

import {
    getHomePageApi,
    getCategoryApi,
    getSubCategoryServiceApi,
    ApiGetCountryList,
    ApiStateList,
    ApiCityList,
    ApiSellerSignUpFrom,
    ApiUserSignUpForm,
    ApiLoginForm
} from "./endPoints"

export const Api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL +
        process.env.REACT_APP_BASE_URL_PREFIX,

    // send token -- wishlist, addto cart etc
    headers: { Authorization: localStorage.getItem("loginData") }
})

// Get-home-page-api-----for Banner, trending, core services etc home page all data
export const getHomePageDetails = () => {
    return Api.get(getHomePageApi)
}

// get-category 
// export const getCategoryListDetails = () => {
//     return Api.get(getCategoryApi)
// }

// get-sub-category-servies-
export const getSubCategoryServiceDetails = (id) => {
    return Api.get(getSubCategoryServiceApi + '?categoryId=' + `${id}`)
}

// country list 
export const getCountryListDetails = () => {
    return Api.get(ApiGetCountryList)
}

// state list
export const StateListDetails = (id) => {
    return Api.post(ApiStateList, id)
}

// city list
export const cityListDetails = (id) => {
    return Api.post(ApiCityList, id)
}

// seller sign up form
export const sellerSignUpFormDetails = (id) => {
    return Api.post(ApiSellerSignUpFrom, id)
}

//user sign up form
export const userSignUpFormDetails = (id) => {
    return Api.post(ApiUserSignUpForm, id)
}

// login/signIn form
export const loginFormDetails = (id) => {
    return Api.post(ApiLoginForm, id)
}