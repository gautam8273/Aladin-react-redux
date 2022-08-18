import { combineReducers } from "redux";
import {
    reducerGetHomePage,
    reducerGetCategory,
    reducerSubCategoryService,
    reducerGetCountry,
    reducerStateList,
    reducerCityList,
    reducerSellerSignUpForm,
    reducerGetServiceList,
    reducerUserProfileDetails,
    reducerUserGetWishList,
    reducerGetServiceDetailsPage,
    reducergetAnotherServiceFromSameSeller,
    reducerGetRecommendedService,
    reducerGetCartData,
    reducerCartIncreaseTotalPrice, // increase total price
    reducerSearchGetService, // for searchbar
    reducerGetLocation, // for location
    reducerGetLanguage, // for language
    reducerGetLocalCart, // get Local cart ----logout condition
    reducerCheckAuth, // check auth 
    reducerEditUserProfileDetails, // edit user profile details
    reducerUserAddressAdd, // user address
    reducerListAddressOfUsers, // list of address of users
    reducerSingleUserAddressdetails, // single user address details
    reducerEditUserAddress, // edit user address
    reducerStartConversationWithSeller, // start conversation with seller
    reducerUserConversationName, // user conversation name
    reducerUserConversationDetails, // user conversation details
    reducerUserConversationList,// user conversation list
    reducerCustomerService, // customer service
    reducerMenuBarActiveClass,
    reducerReviewRating
} from "./reducers";

export const rootReducers = combineReducers({
    reducerGetHomePage: reducerGetHomePage,
    reducerGetCategory: reducerGetCategory,
    reducerSubCategoryService: reducerSubCategoryService,
    reducerGetCountry: reducerGetCountry,
    reducerStateList: reducerStateList,
    reducerCityList: reducerCityList,
    reducerSellerSignUpForm: reducerSellerSignUpForm,
    reducerGetServiceList: reducerGetServiceList,
    reducerUserProfileDetails: reducerUserProfileDetails,
    reducerUserGetWishList: reducerUserGetWishList,
    reducerGetServiceDetailsPage: reducerGetServiceDetailsPage,
    reducergetAnotherServiceFromSameSeller: reducergetAnotherServiceFromSameSeller,
    reducerGetRecommendedService: reducerGetRecommendedService,
    reducerGetCartData: reducerGetCartData,

    reducerCartIncreaseTotalPrice: reducerCartIncreaseTotalPrice, // increase total price
    reducerSearchGetService: reducerSearchGetService, // for search bar
    reducerGetLocation: reducerGetLocation, // for the location
    reducerGetLanguage: reducerGetLanguage, // for language
    reducerGetLocalCart: reducerGetLocalCart, // for get local cart action ---- for logout condition
    reducerCheckAuth: reducerCheckAuth, // check auth 
    reducerEditUserProfileDetails: reducerEditUserProfileDetails, // edit user profile details
    reducerUserAddressAdd: reducerUserAddressAdd, // user address
    reducerListAddressOfUsers: reducerListAddressOfUsers, // list of users adress
    reducerSingleUserAddressdetails: reducerSingleUserAddressdetails, // single user address details
    reducerEditUserAddress: reducerEditUserAddress, // edit user address 
    reducerStartConversationWithSeller: reducerStartConversationWithSeller, // start conversation with seller
    reducerUserConversationName: reducerUserConversationName, // user conversation name
    reducerUserConversationDetails: reducerUserConversationDetails, // user conversation details
    reducerUserConversationList: reducerUserConversationList, // user copnversation list
    reducerCustomerService: reducerCustomerService, // Customer service

    reducerMenuBarActiveClass: reducerMenuBarActiveClass,
    reducerReviewRating: reducerReviewRating

})