import { Api } from "../../Api/api";
import { endPoints } from "../../Api/endPoints";
import { SINGLE_USER_ADDRESS_DETAILS } from "../Reducers/actionTypes";


// single user address details
export const singleUserAddressDetailsAction = (dispatch, reqAddress) => {
    Api.post(endPoints.SINGLE_USER_ADDRESS_DETAILS_API, reqAddress).then((res) => {
        dispatch({
            type: SINGLE_USER_ADDRESS_DETAILS,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>singleUserAddressDetailsAction") })
}

