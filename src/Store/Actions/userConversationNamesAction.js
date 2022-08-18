import { Api } from "../../Api/api";
import { endPoints } from "../../Api/endPoints";
import { USER_CONVERSSATION_NAME } from "../Reducers/actionTypes";

export const userConversationNamesAction = (dispatch) => {
    Api.post(endPoints.USER_CONVERSATION_NAME_API).then((res) => {
        dispatch({
            type: USER_CONVERSSATION_NAME,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>userConversationNamesAction") })
}