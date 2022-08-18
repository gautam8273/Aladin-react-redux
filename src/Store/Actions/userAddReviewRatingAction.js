import { Api } from "../../Api/api";
import { endPoints } from "../../Api/endPoints";
import { USER_ADD_REVIEW_RATING_INFO } from "../Reducers/actionTypes";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const userAddReviewRatingAction = (dispatch, reqRatingPaylod, serviceId, navigate, reqSellerNameForUrl) => {
    Api.post(endPoints.USER_ADD_REVIEW_RATING_API, reqRatingPaylod).then((res) => {
        toast.success("Please book service first to post review.!");
        setTimeout(() =>
            navigate('/service-detail/' + `${serviceId}/${reqSellerNameForUrl}`)
            , 3000
        )
        dispatch({
            type: USER_ADD_REVIEW_RATING_INFO,
            payload: res.data.data,
        })
    }).catch(() => { console.log("Having Error===>userAddReviewRatingAction") })
}