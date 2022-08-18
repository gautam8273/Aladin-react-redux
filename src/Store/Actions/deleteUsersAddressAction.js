import { endPoints } from "../../Api/endPoints";
import { Api } from "../../Api/api";
import { DELETE_USER_ADDRESS_DETAILS } from "../Reducers/actionTypes";

export const deleteUsersAddressAction = (dispatch, addressId) => {
    Api.post(endPoints.DELETE_USER_ADDRESS_API, addressId).then((res) => {
        dispatch({
            type: DELETE_USER_ADDRESS_DETAILS,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>userAddressAddAction") })
}