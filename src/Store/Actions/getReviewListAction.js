import { Api } from "../../Api/api";
import { endPoints } from "../../Api/endPoints";
import { GET_REVIEW_RATING_INFO } from "../Reducers/actionTypes";

export const getReviewListAction = (dispatch, serviceId) => {
    Api.get(endPoints.GET_REVIEW_RATING_API + `?serviceId=${serviceId}`).then((res) => {
        dispatch({
            type: GET_REVIEW_RATING_INFO,
            payload: res.data.data
        })
    }).catch(() => { console.log("Having Error===>getReviewListAction") })
}