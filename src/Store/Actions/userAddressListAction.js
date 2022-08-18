import { Api } from "../../Api/api";
import { endPoints } from "../../Api/endPoints";
import { LIST_USER_ADDRESS_DETAILS } from "../Reducers/actionTypes";


export const userAddressListAction = (dispatch) => {
    Api.get(endPoints.LIST_ADDRESS_OF_USERS_API).then((res) => {

        dispatch({
            type: LIST_USER_ADDRESS_DETAILS,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>userAddressListAction") })
}