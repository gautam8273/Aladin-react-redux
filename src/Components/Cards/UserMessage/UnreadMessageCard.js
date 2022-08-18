import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userConversationListAction } from '../../../Store/Actions/userConversationListAction';
import { userReadAllConversationAction } from '../../../Store/Actions/userReadAllConversationAction';

const UnreadMessageCard = ({ unRead }) => {

    // console.log("unRead>>>>", unRead)

    const dispatch = useDispatch();

    const [markDelete, setMarkDelete] = useState(false);

    const unReadMeassage = useSelector(state => state.reducerUserConversationList?.userConversationListDetails)
    // console.log("unReadMeassage>>>>", unReadMeassage)

    const readMark = () => {
        let readMarkPayload = {
            conversationId: unRead._id,
        };
        userConversationListAction(dispatch, readMarkPayload)
        userReadAllConversationAction(dispatch, readMarkPayload)
    }

    const deleteUserMessage = (id) => {

        // console.log("first")

        // let idConversation = {
        //     conversationId: id
        // }

        // // console.log("idConversation>>>", idConversation)
        // userDeleteConversationMessageAction(dispatch, idConversation)

    }

    return (
        <>
            {
                !unRead?.length
                    ?
                    <div className="messages-collector">
                        <div className="message-wrap unreaded-messages"><a className="msg-box" href="/user/messages">
                            <div className="msg-pic online">S</div>
                            <div className="msg-data">
                                <div className="text-data">
                                    <ul className="tests-wrap">
                                        <li>IT</li>
                                        <li>Web Development</li>
                                        <li>React</li>
                                    </ul>
                                    <div className="msg-name">ABC</div>
                                    <p>{unRead.lastConversationDetailData.message}</p>
                                </div>
                                <div className="msg-edit"></div>
                            </div>
                        </a>
                            <div className="menu-wrap" onClick={() => setMarkDelete(prev => !prev)}>
                                <button className="menu-btn">
                                    <span className="btn-dot"></span>
                                    <span className="btn-dot"></span>
                                    <span className="btn-dot"></span>
                                </button>
                                {
                                    markDelete ?
                                        <div className="menu" >
                                            <ul className="menu-items">
                                                {unRead.lastConversationDetailData?.userReadStatus === false ? (
                                                    <li>
                                                        <button className="menu-option"
                                                            onClick={readMark}
                                                        >
                                                            Mark as read
                                                        </button>
                                                    </li>
                                                ) : null}
                                                {/* <li>
                                                    <button className="menu-option delete">Mark as Read</button>
                                                </li> */}

                                                <li>
                                                    <button className="menu-option delete"
                                                        onClick={() => deleteUserMessage(unRead.lastConversationDetailData.conversationId)}
                                                    >
                                                        Delete
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </div>

                    </div>
                    :
                    (
                        <div>no data</div>
                    )
            }
            {/* <div className="messages-collector">
                <div className="message-wrap unreaded-messages"><a className="msg-box" href="/user/messages">
                    <div className="msg-pic online">S</div>
                    <div className="msg-data">
                        <div className="text-data">
                            <ul className="tests-wrap">
                                <li>IT</li>
                                <li>Web Development</li>
                                <li>React</li>
                            </ul>
                            <div className="msg-name">ABC</div>
                            <p>hi</p>
                        </div>
                        <div className="msg-edit"></div>
                    </div>
                </a>
                    <div className="menu-wrap">
                        <button className="menu-btn">
                            <span className="btn-dot"></span>
                            <span className="btn-dot"></span>
                            <span className="btn-dot"></span>
                        </button>
                    </div>
                </div>

            </div> */}
        </>
    )
}

export default UnreadMessageCard