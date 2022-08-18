import { Api } from "../../Api/api";
import { endPoints } from "../../Api/endPoints";
import { USER_CONVERSATION_DETAILS } from "../Reducers/actionTypes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const userConversationDetailsAction = (dispatch, idConversation, navigate) => {
    Api.post(endPoints.USER_CONVERSATION_DETAILS_API, idConversation).then((res) => {
        // console.log("res==>", res)
        // toast.success("Conversatation started!");
        // setTimeout(() =>
        //     navigate(`/user/messages/opened/${res.data.data.conversationId}`)
        //     , 2000
        // )
        dispatch({
            type: USER_CONVERSATION_DETAILS,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>userConversationDetailsAction") })
}