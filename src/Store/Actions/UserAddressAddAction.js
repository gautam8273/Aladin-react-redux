import { Api } from "../../Api/api";
import { endPoints } from "../../Api/endPoints";
import { USER_ADDRESS_DETAILS } from "../Reducers/actionTypes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserAddressAddAction = (dispatch, addressData, navigate) => {
    Api.post(endPoints.USER_ADDRESS_ADD_API, addressData).then((res) => {
        toast.success("Address is added!");
        setTimeout(() =>
            navigate('/user/my-addresses/')
            , 2000
        )
        dispatch({
            type: USER_ADDRESS_DETAILS,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>userAddressAddAction") })
}