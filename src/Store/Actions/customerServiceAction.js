import { Api } from "../../Api/api";
import { endPoints } from "../../Api/endPoints";
import { CUSTOMER_SERVICE_INFO } from "../Reducers/actionTypes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const customerServiceAction = (dispatch, payload, navigate) => {
    Api.post(endPoints.CUSTOMER_SERVICE_API, payload).then((res) => {

        toast.success("Successssssss!");
        setTimeout(() =>
            navigate('/')
            , 2000
        )

        dispatch({
            type: CUSTOMER_SERVICE_INFO,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>customerServiceAction") })
}