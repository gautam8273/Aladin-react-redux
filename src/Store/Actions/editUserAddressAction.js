import { Api } from "../../Api/api";
import { endPoints } from "../../Api/endPoints";
import { EDIT_USER_ADDRESS_DETAILS } from "../Reducers/actionTypes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//edit user address
export const editUserAddressAction = (dispatch, edituserAddressData, navigate) => {
    Api.post(endPoints.EDIT_USER_ADDRESS_API, edituserAddressData).then((res) => {
        toast.success("Address is updated!");
        setTimeout(() =>
            navigate('/user/my-addresses/')
            , 2000
        )
        dispatch({
            type: EDIT_USER_ADDRESS_DETAILS,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>singleUserAddressDetailsAction") })
}
