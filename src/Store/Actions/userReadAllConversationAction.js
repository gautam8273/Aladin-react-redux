import { Api } from "../../Api/api";
import { endPoints } from "../../Api/endPoints";
import { USER_READ_ALL_CONVERSATION_DETAILS } from "../Reducers/actionTypes";

export const userReadAllConversationAction = (dispatch, idConversation, readMarkPayload) => {
    Api.post(endPoints.USER_READ_ALL_CONVERSATION_API, idConversation, readMarkPayload).then((res) => {
        dispatch({
            type: USER_READ_ALL_CONVERSATION_DETAILS,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>userConversationDetailsAction") })
}