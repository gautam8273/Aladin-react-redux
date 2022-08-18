import { Api } from "../../Api/api";
import { endPoints } from "../../Api/endPoints";
import { USER_MESSAGE_SEND_DETAILS } from "../Reducers/actionTypes";

export const userMessageSendAction = (dispatch, reqMessage) => {
    Api.post(endPoints.USER_MESSAGE_SEND_API, reqMessage).then((res) => {
        dispatch({
            type: USER_MESSAGE_SEND_DETAILS,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>userMessageSendAction") })
}