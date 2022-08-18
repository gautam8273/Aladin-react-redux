import { Api } from "../../Api/api";
import { endPoints } from "../../Api/endPoints";
import { START_CONVERSATION_WITH_SELLER_DETAILS } from "../Reducers/actionTypes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const startConversationWithSellerAction = (dispatch, serviceId, navigate) => {
    Api.post(endPoints.START_CONVERSATION_WITH_SELLER_API, serviceId).then((res) => {
        // console.log("res==>", res)
        toast.success("Conversatation started!");
        setTimeout(() =>
            navigate(`/user/messages/opened/${res.data.data._id}`)
            , 2000
        )
        dispatch({
            type: START_CONVERSATION_WITH_SELLER_DETAILS,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>startConversationWithSellerAction") })
}