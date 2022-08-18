import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UnreadMessageCard from '../../Components/Cards/UserMessage/UnreadMessageCard';
import { userConversationListAction } from '../../Store/Actions/userConversationListAction';

const UnreadMessage = () => {

    const dispatch = useDispatch();

    const userConversationList = useSelector(state => state.reducerUserConversationList?.userConversationListDetails);
    // console.log("userConversationList>>>>>", userConversationList)

    useEffect(() => {

        let reqPayload = {
            limit: 10,
            pageno: 1,
            unreadList: true
        }

        userConversationListAction(dispatch, reqPayload)

    }, [dispatch])

    return (
        <>

            {
                userConversationList ? userConversationList.data?.map((items, index) => {
                    return (
                        <UnreadMessageCard unRead={items} key={index} />

                    )
                }) : null
            }

            {/* <UnreadMessageCard /> */}

        </>
    )
}

export default UnreadMessage