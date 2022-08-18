import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AllChat from './AllChat'
import UnreadMessage from './UnreadMessage';
import { userConversationListAction } from '../../Store/Actions/userConversationListAction';

const UserMessage = () => {


    const dispatch = useDispatch();



    // for All Chat
    const [allChat, setAllChat] = useState(true);

    // for unread message
    const [unRead, setUnRead] = useState()

    // for Pagniation
    const [pagination, setPagination] = useState()
    const [allChatPagination, setAllChatPagination] = useState(true)
    const [unreadPagination, setUnreadPagination] = useState(false)


    const userConversationList = useSelector(state => state.reducerUserConversationList?.userConversationListDetails)
    // console.log("userConversationList==>", userConversationList)




    // color change on click
    const [active, setActive] = useState("active");
    const [activeUnread, setActiveUnread] = useState("");

    const openAllChat = () => {
        // console.log("all chat")
        setAllChat(true);
        setUnRead(false)
        setActive("active");
        setActiveUnread("")
        setAllChatPagination(true)
        setUnreadPagination(false)
    }

    const openUnreadMessage = () => {
        // console.log("unread meassage")
        setUnRead(true)
        setAllChat(false)
        setActiveUnread("active")
        setActive("");
        setAllChatPagination(false)
        setUnreadPagination(true)

    }


    // pagination
    useEffect(() => {
        let paginationPayload = {
            limit: 2,
            pageno: 1,
        }

        userConversationListAction(dispatch, paginationPayload)
    }, [dispatch, allChatPagination])


    // pagination
    const paginationClick = (index1) => {
        let paginationPayload = {
            limit: 2,
            pageno: index1,
        }

        setPagination(index1)

        userConversationListAction(dispatch, paginationPayload)
    }


    return (
        <>
            <section className="edit-information user-messages">
                <div className="">
                    <div className="Toastify"></div>
                </div>
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/user/dashboard">User Account</a></li>
                            <li className="breadcrumb-item active" aria-current="page">User Messages</li>
                        </ol>
                    </nav>
                    <div className="section-header">
                        <div className="header-left">
                            <h1>User Messages</h1>
                        </div>
                    </div>

                    <div className="messages-wrap">
                        <div className="messages-head">
                            <form>
                                <div className="form-wrap">
                                    <button
                                        id="1"
                                        type="button"
                                        // className="msg-type active"
                                        className={`msg-type ${active}`}
                                        onClick={openAllChat}>
                                        All Chats
                                    </button>

                                    <button
                                        id="2"
                                        type="button"
                                        // className="msg-type unread "
                                        className={`msg-type unread ${activeUnread}`}
                                        onClick={openUnreadMessage}>
                                        Unread Messages
                                    </button>

                                    <input className="search-input flex-grow-1"
                                        type="text" placeholder="Search for a message"
                                    // value="" 
                                    />
                                    <button type="submit" className="search-btn"><i
                                        className="icon-magnifier"></i></button>
                                </div>
                            </form>
                        </div>

                        {allChat && <AllChat />}
                        {unRead && <UnreadMessage />}


                        {/* Pagination for all chat */}
                        {allChatPagination &&
                            <nav className="pagination-wrap" aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item previous">
                                        <span onClick={() => paginationClick(pagination - 1)} className="page-link" >
                                            <i className="icon-arrow"></i>
                                        </span>
                                    </li>
                                    {/* <li>{Math.ceil(userConversationList?.totalRecord / 2)}</li> */}
                                    {
                                        userConversationList?.totalRecord && Array.from(Array(Math.ceil(userConversationList?.totalRecord / 2)), (e, index) => {
                                            return <li className="page-item" aria-current="page" key={index}>
                                                <span onClick={() => paginationClick(index + 1)} className="page-link" >{index + 1}</span>
                                            </li>
                                        })
                                    }
                                    <li className="page-item">
                                        <span onClick={() => paginationClick(pagination + 1)} className="page-link" >
                                            <i className="icon-arrow">chat</i>
                                        </span>
                                    </li>
                                </ul>
                            </nav>
                        }

                        {/* Pagination for UnreadMessage */}

                        {
                            unreadPagination &&
                            <nav className="pagination-wrap" aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item previous">
                                        <span onClick={() => paginationClick(pagination - 1)} className="page-link" >
                                            <i className="icon-arrow">ABCDEF</i>
                                        </span>
                                    </li>
                                    {
                                        Array.from(Array(0, Math.floor(userConversationList?.totalRecord / 2)), (e, index) => {
                                            return <li className="page-item" aria-current="page" key={index}>
                                                <span onClick={() => paginationClick(index + 1)} className="page-link" >{index + 1}</span>
                                            </li>
                                        })
                                    }
                                    <li className="page-item">
                                        <span onClick={() => paginationClick(pagination + 1)} className="page-link" >
                                            <i className="icon-arrow"></i>
                                        </span>
                                    </li>
                                </ul>
                            </nav>
                        }


                    </div>
                </div>
            </section>
        </>
    )
}

export default UserMessage