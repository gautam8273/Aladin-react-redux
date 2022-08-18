import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import UserMessageCard from '../../Components/Cards/UserMessage/UserMessageCard';
import { userConversationListAction } from '../../Store/Actions/userConversationListAction';

const AllChat = () => {

    const dispatch = useDispatch();

    const userConversationList = useSelector(state => state.reducerUserConversationList?.userConversationListDetails)
    // console.log("userConversationList==>", userConversationList)



    return (
        <>

            {
                userConversationList ? userConversationList?.data?.map((items, index) => {
                    return (
                        <UserMessageCard userItem={items} key={index} />
                    )
                }) : null
            }

        </>
    )
}

export default AllChat