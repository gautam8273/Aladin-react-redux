import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { userDeleteConversationMessageAction } from '../../../Store/Actions/userDeleteConversationMessageAction'

const UserMessageCard = ({ userItem }) => {

    // console.log("userItem>>>", userItem)

    const dispatch = useDispatch();

    const [deleteMessage, setDeleteMessage] = useState(false)

    const deleteUserMessage = (id) => {
        let idConversation = {
            conversationId: id
        }
        // console.log("idConversation>>>", idConversation)
        userDeleteConversationMessageAction(dispatch, idConversation)
    }

    return (
        <>
            <div className="messages-collector" >
                <div className="message-wrap unreaded-messages">
                    <Link to={`/user/messages/opened/${userItem.lastConversationDetailData.conversationId}`} className="msg-box">
                        <div className="msg-pic online">{userItem.sellerData[0].firstName[0]}</div>
                        <div className="msg-data">
                            <div className="text-data" >
                                <ul className="tests-wrap">
                                    <li>{userItem.categoryName}</li>
                                    <li>{userItem.subcategoryName}</li>
                                    <li>{userItem.serviceData[0].title}</li>
                                </ul>
                                <div className="msg-name">{userItem.sellerData[0].firstName} {userItem.sellerData[0].lastName}</div>
                                <p>{userItem.lastConversationDetailData.message}</p>
                            </div>
                            {/* <div className="text-data">
                            <ul className="tests-wrap">
                                <li>IT</li>
                                <li>Web Development</li>
                                <li>React</li>
                            </ul>
                            <div className="msg-name">XYZ</div>
                            <p>hi</p>
                        </div> */}
                            <div className="msg-edit"></div>
                        </div>
                    </Link>
                    <div className="menu-wrap" onClick={() => setDeleteMessage(prev => !prev)}>
                        <button className="menu-btn">
                            <span className="btn-dot"></span>
                            <span className="btn-dot"></span>
                            <span className="btn-dot"></span>
                        </button>
                        {
                            deleteMessage
                                ?
                                <div className="menu" >
                                    <ul className="menu-items"
                                        onClick={() => deleteUserMessage(userItem.lastConversationDetailData.conversationId)}
                                    >
                                        <li>
                                            <button
                                                className="menu-option delete">
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
        </>
    )
}

export default UserMessageCard