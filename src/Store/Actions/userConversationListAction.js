import { Api } from "../../Api/api";
import { endPoints } from "../../Api/endPoints";
import { USER_CONVERSATION_LIST_DETAILS } from "../Reducers/actionTypes";

export const userConversationListAction = (dispatch, reqPayload, readMarkPayload) => {
    Api.post(endPoints.USER_CONVERSATION_LIST_API, reqPayload, readMarkPayload).then((res) => {
        dispatch({
            type: USER_CONVERSATION_LIST_DETAILS,
            payload: res.data
        })
    }).catch(() => { console.log("Having Error===>userConversationListAction") })
}