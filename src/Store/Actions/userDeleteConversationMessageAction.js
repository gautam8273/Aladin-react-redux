import { Api } from "../../Api/api";
import { endPoints } from "../../Api/endPoints";
import { DELETE_USER_CONVERSATION_MESSAGE_DETAILS, USER_CONVERSATION_LIST_DETAILS } from "../Reducers/actionTypes";

export const userDeleteConversationMessageAction = (dispatch, idConversation) => {
    Api.post(endPoints.DELETE_USER_CONVERSATION_MEASSAGE_API, idConversation).then((res) => {
        Api.post(endPoints.USER_CONVERSATION_LIST_API).then((res) => {
            dispatch({
                type: USER_CONVERSATION_LIST_DETAILS,
                payload: res.data.data
            })
        })

        dispatch({
            type: DELETE_USER_CONVERSATION_MESSAGE_DETAILS,
            payload: res.data.data
        })

    }).catch(() => { console.log("Having Error===>userDeleteConversationMessageAction") })
}