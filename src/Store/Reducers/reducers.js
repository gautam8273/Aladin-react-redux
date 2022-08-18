
import { type } from "@testing-library/user-event/dist/type";
import defaultProps from "react-slick/lib/default-props";
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
    GET_CART_DATA_DETAILS,
    CART_UPDATE_PRICE_QUANTITY,
    INCREASE_TOTAL_PRICE_CART_PRODUCT,
    DECREASE_TOTAL_PRICE_CART_PRODUCT,
    SEARCH_GET_SERVICE,
    GET_LOCATION_DATA,
    GET_LANGUAGE_DETAILS,
    GET_LOCAL_LOCAl_STORAGE,
    GET_CHECK_AUTH_DETAILS,
    EDIT_USER_PROFILE_DETAILS,
    USER_ADDRESS_DETAILS,
    LIST_USER_ADDRESS_DETAILS,
    SINGLE_USER_ADDRESS_DETAILS,
    EDIT_USER_ADDRESS_DETAILS,
    START_CONVERSATION_WITH_SELLER_DETAILS,
    USER_CONVERSSATION_NAME,
    USER_CONVERSATION_DETAILS,
    USER_CONVERSATION_LIST_DETAILS,
    CUSTOMER_SERVICE_INFO,
    MENU_BAR_ACTIVE_CLASS_INFO,
    GET_REVIEW_RATING_INFO,

} from "./actionTypes";

const initialState = {
    homePageData: [],
    subCategoryServiceData: [],
    // getCategoryData: []
    filterPageImageData: [],
    userGetWishList: [],
    removeFromWishList: [],
    anotherserviceSameSeller: [],
    recommendedServiceData: [],
    cartDetails: [],
    updateCartDetails: [],
    totalPriceCartProduct: 0,
    getLocalCart: [],
    userAddress: [],
    listOfAddressOfUsers: [],
    userConversationnameData: [],
    userConversationDetails: [],
    userConversationListDetails: [],
    customerServiceDetails: [],
    getReviewRating: []



}

// get-Home_page---for Banner, trending, core services etc home page all data
export const reducerGetHomePage = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOME_PAGE:
            return {
                ...state,
                homePageData: action.payload
            }
        default: return state;
    }
}

//get_category 
export const reducerGetCategory = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_LIST:
            return {
                ...state,
                getCategoryData: action.payload
            }
        default: return state;
    }
}

//get-sub-category-service-details--- on category page
export const reducerSubCategoryService = (state = initialState, action) => {
    switch (action.type) {
        case GET_SUB_CATEGORY_SERVICE:
            return {
                ...state,
                subCategoryServiceData: action.payload
            }
        default: return state;
    }
}

// get country list
export const reducerGetCountry = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRY_LIST:
            return {
                ...state,
                getCountryDetails: action.payload
            }
        default: return state;
    }
}

// get state list
export const reducerStateList = (state = initialState, action) => {
    switch (action.type) {
        case GET_STATE_LIST:
            return {
                ...state,
                stateList: action.payload
            }
        default: return state;
    }
}

// city list
export const reducerCityList = (state = initialState, action) => {
    switch (action.type) {
        case GET_CITY_LIST:
            return {
                ...state,
                cityList: action.payload
            }
        default: return state;
    }
}

// seller sign up form
export const reducerSellerSignUpForm = (state = initialState, action) => {
    switch (action.type) {
        case SELLER_SIGN_UP_FORM:
            return {
                ...state,
                sellerSignUpForm: action.payload
            }
        default: return state;
    }
}

//user sign up form
export const reducerUserSignUpForm = (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGN_UP_DETAILS:
            return {
                ...state,
                userSignUp: action.payload
            }
        default: return state;
    }
}

// login/signIn form
export const reducerLoginForm = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_FORM_DETAILS:
            return {
                ...state,
                loginFormdata: action.payload
            }
        default: return state;
    }
}

// Filter page--- Image --- get service list api
export const reducerGetServiceList = (state = initialState, action) => {
    switch (action.type) {
        case GET_SERVICE_LIST:
            return {
                ...state,
                filterPageImageData: action.payload
            }
        default: return state;
    }
}

// add to wishlist
export const reducerAddToWishList = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            return {
                ...state,
                addToWishListData: action.payload
            }
        default: return state;
    }
}

// Remove From wishlist
export const reducerRemoveFromWishList = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_FROM_WISHLIST:
            return {
                ...state,
                removeFromWishList: action.payload
            }
        default: return state;
    }
}

// user profile details
export const reducerUserProfileDetails = (state = initialState, action) => {
    switch (action.type) {
        case USER_PROFILE_DETAILS:
            return {
                ...state,
                userProfileDetails: action.payload
            }
        default: return state;
    }
}

// user get wishlist
export const reducerUserGetWishList = (state = initialState, action) => {
    switch (action.type) {
        case USER_GET_WISHLIST:
            return {
                ...state,
                userGetWishList: action.payload
            }
        default: return state;
    }
}

// get service details page
export const reducerGetServiceDetailsPage = (state = initialState, action) => {
    switch (action.type) {
        case GET_SERVICE_DETAILS:
            return {
                ...state,
                getSericeDetails: action.payload
            }
        default: return state;
    }
}

// get another service from same seller
export const reducergetAnotherServiceFromSameSeller = (state = initialState, action) => {
    switch (action.type) {
        case ANOTHER_SERVICE_FROM_SELLER:
            return {
                ...state,
                anotherserviceSameSeller: action.payload
            }
        default: return state;
    }
}


// get_recommended_service
export const reducerGetRecommendedService = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECOMMENDED_SERVICE_DATA:
            return {
                ...state,
                recommendedServiceData: action.payload
            }
        default: return state;
    }
}

// get cart data
export const reducerGetCartData = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_DATA_DETAILS:
            return {
                ...state,
                cartDetails: action.payload
            }
        default: return state;
    }
}

// update the cart-- price and quantity
export const reducerUpdateToCartPriceQuantity = (state = initialState, action) => {
    switch (action.type) {
        case CART_UPDATE_PRICE_QUANTITY:
            return {
                ...state,
                updateCartDetails: action.payload
            }
        default: return state;
    }
}

// INCREASE total price cart product
export const reducerCartIncreaseTotalPrice = (state = initialState, action) => {
    switch (action.type) {
        case INCREASE_TOTAL_PRICE_CART_PRODUCT:
            return {
                ...state,
                totalPriceCartProduct: state.totalPriceCartProduct + action.payload
            }

        case DECREASE_TOTAL_PRICE_CART_PRODUCT:
            return {
                ...state,
                totalPriceCartProduct: state.totalPriceCartProduct - action.payload
            }
        default: return state;
    }
}


// Search get service
export const reducerSearchGetService = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_GET_SERVICE:
            return {
                ...state,
                serachList: action.payload
            }
        default: return state;
    }
}

// get location
export const reducerGetLocation = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOCATION_DATA:
            return {
                ...state,
                getLocation: action.payload
            }
        default: return state;
    }
}

// get language
export const reducerGetLanguage = (state = initialState, action) => {
    switch (action.type) {
        case GET_LANGUAGE_DETAILS:
            return {
                ...state,
                getlanguageData: action.payload
            }
        default: return state;
    }
}

// get local action for ---- logout condition
export const reducerGetLocalCart = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOCAL_LOCAl_STORAGE:
            return {
                ...state,
                getLocalCart: action.payload
            }
        default: return state;
    }
}

// check auth 
export const reducerCheckAuth = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHECK_AUTH_DETAILS:
            return {
                ...state,
                checkAuthData: action.payload
            }
        default: return state;
    }
}

// Edit user profile details
export const reducerEditUserProfileDetails = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_USER_PROFILE_DETAILS:
            return {
                ...state,
                editUserProfile: action.payload
            }
        default: return state;
    }
}

// User Address add 
export const reducerUserAddressAdd = (state = initialState, action) => {
    switch (action.type) {
        case USER_ADDRESS_DETAILS:
            return {
                ...state,
                userAddress: action.payload
            }
        default: return state;
    }
}

// list of address of user
export const reducerListAddressOfUsers = (state = initialState, action) => {
    switch (action.type) {
        case LIST_USER_ADDRESS_DETAILS:
            return {
                ...state,
                listOfAddressOfUsers: action.payload
            }
        default: return state;
    }
}

// single user address details
export const reducerSingleUserAddressdetails = (state = initialState, action) => {
    switch (action.type) {
        case SINGLE_USER_ADDRESS_DETAILS:
            return {
                ...state,
                singleUserAddressData: action.payload
            }
        default: return state;
    }
}

//edit user address
export const reducerEditUserAddress = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_USER_ADDRESS_DETAILS:
            return {
                ...state,
                editUserAddressData: action.payload
            }
        default: return state;
    }
}

// start conversation with seller
export const reducerStartConversationWithSeller = (state = initialState, action) => {
    switch (action.type) {
        case START_CONVERSATION_WITH_SELLER_DETAILS:
            return {
                ...state,
                startConversationWithSeller: action.payload
            }
        default: return state;
    }
}

// user conversation name
export const reducerUserConversationName = (state = initialState, action) => {
    switch (action.type) {
        case USER_CONVERSSATION_NAME:
            return {
                ...state,
                userConversationnameData: action.payload
            }
        default: return state;
    }
}

// user conversation details
export const reducerUserConversationDetails = (state = initialState, action) => {
    switch (action.type) {
        case USER_CONVERSATION_DETAILS:
            return {
                ...state,
                userConversationDetails: action.payload
            }
        default: return state;
    }
}


// user conversation list
export const reducerUserConversationList = (state = initialState, action) => {
    switch (action.type) {
        case USER_CONVERSATION_LIST_DETAILS:
            return {
                ...state,
                userConversationListDetails: action.payload
            }
        default: return state;
    }
}


// customer service
export const reducerCustomerService = (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_SERVICE_INFO:
            return {
                ...state,
                customerServiceDetails: action.payload
            }
        default: return state;
    }
}


// for active class on category list dropdown menu
export const reducerMenuBarActiveClass = (state = initialState, action) => {
    switch (action.type) {
        case MENU_BAR_ACTIVE_CLASS_INFO:
            return {
                menuBarActiveClass: action.payload,
                menuBarActiveClassCatId: action.payload1
            }
        default: return state;
    }
}

// get review rating
export const reducerReviewRating = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEW_RATING_INFO:
            return {
                ...state,
                getReviewRating: action.payload
            }
        default: return state;
    }
}