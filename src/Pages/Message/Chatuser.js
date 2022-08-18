import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { checkAuthAction } from '../../Store/Actions/action';
import { userConversationDetailsAction } from '../../Store/Actions/userConversationDetailsAction';
import { userConversationNamesAction } from '../../Store/Actions/userConversationNamesAction';
import { userMessageSendAction } from '../../Store/Actions/userMessageSendAction';
import { userReadAllConversationAction } from '../../Store/Actions/userReadAllConversationAction';

const Chatuser = () => {

    const dispatch = useDispatch()

    const { conversationId } = useParams();

    const navigate = useNavigate();
    // console.log(" conversationId", conversationId)

    const chatWithSellerStart = useSelector(state => state.reducerStartConversationWithSeller?.startConversationWithSeller);
    // console.log("chatWithSellerStart==>", chatWithSellerStart)

    const userConversationName = useSelector(state => state.reducerUserConversationName?.userConversationnameData);
    // console.log("userConversationName==>", userConversationName)

    const userConversation = useSelector(state => state.reducerUserConversationDetails?.userConversationDetails)
    // console.log("userConversation==>", userConversation)

    const [sellerName, setSellerName] = useState();
    // console.log("sellername==>", sellerName)
    const [message, setMessage] = useState()
    const [selectedImage, setSelectedImage] = useState()
    const dateOpt = { year: "numeric", month: "short", day: "numeric" };


    useEffect(() => {
        // console.clear()
        // console.log("sedrftgyhuji")
        if (conversationId) {
            userConversationName.forEach(ele => {
                // console.log("ele>>>", ele)
                if (conversationId == ele.conversationId) {
                    setSellerName(ele.sellerData[0].firstName)
                }
            })
        }
    }, [conversationId, userConversationName])


    useEffect(() => {
        let idConversation = {
            conversationId: conversationId
        }
        userConversationNamesAction(dispatch);
        userConversationDetailsAction(dispatch, idConversation);
    }, [dispatch])


    const userConversationDetails = (id) => {
        let idConversation = {
            conversationId: id
        }
        userConversationDetailsAction(dispatch, idConversation, navigate)

        let token = localStorage.getItem("loginData")
        if (token) {
            checkAuthAction(dispatch)
        }
        userReadAllConversationAction(dispatch, idConversation)
    }


    const messageHandler = (e) => {
        setMessage(e.target.value)
    }


    const imageChangeHandler = (e) => {
        setSelectedImage(e.target.files[0]);
    }


    // send message
    const sendMessage = (e) => {

        let idConversation = {
            conversationId: conversationId
        }

        e.preventDefault()

        let reqMessage = new FormData()
        reqMessage.append("message", message)
        reqMessage.append("attachment", selectedImage)
        reqMessage.append("conversationId", conversationId)
        if (message.length !== "" || selectedImage?.length !== 0) {
            userMessageSendAction(dispatch, reqMessage)

        }

        userConversationDetailsAction(dispatch, idConversation, navigate)
        setMessage("")
        setSelectedImage()

    }

    useEffect(() => {

    }, [userConversation])

    return (
        <>
            <section className="user-dialogue">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/user/dashboard">User Account</a></li>
                            <li className="breadcrumb-item"><a href="/user/messages">User Messages</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Particular</li>
                        </ol>
                    </nav>
                    <div className="card dialogue-wrap">
                        <div className="dialogue-left">
                            <div className="users-header"></div>
                            <div className="users-wrap ">
                                <div className="scroll-users" style={{
                                    position: "relative",
                                    overflow: "hidden", width: "100%", height: "100%"
                                }}>
                                    <div
                                        style={{ position: "absolute", inset: "0px", overflow: "scroll", marginRight: "-15px", marginBottom: "-15px" }}>
                                        <ul className="users-list">
                                            {
                                                userConversationName ? userConversationName.map((items, index) => {
                                                    return (
                                                        <div onClick={() => userConversationDetails(items._id)} key={index} >
                                                            <Link to={`/user/messages/opened/${items._id}`}>
                                                                <li >
                                                                    {items.sellerData[0].firstName}
                                                                    <p style={{ fontWeight: "400", color: "gray", fontSize: "13px", lineHeight: "1.5" }}>
                                                                        {items.sellerData[0].businessName}
                                                                    </p>
                                                                </li>
                                                            </Link>


                                                        </div>


                                                    )
                                                }) : null
                                            }

                                            {/* <li><a className="" href="/user/messages/opened/6295d0e7cda34b9789fca9da">Sonali Seller<p
                                                style={{ fontWeight: "400", color: "gray", fontSize: "13px", lineHeight: "1.5" }}>
                                                React</p></a></li>
                                            <li><a className="active" href="/user/messages/opened/6295d0e7cda34b9789fca9da">George Ever
                                                <p style={{ fontWeight: "400", color: "gray", fontSize: "13px", lineHeight: "1.5" }}>
                                                    Catering Services for party functions</p></a></li> */}
                                        </ul>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute", height: "6px", right: "2px", bottom: "2px", left: "2px",
                                            borderRadius: "3px"
                                        }}>
                                        <div
                                            style={{
                                                position: "relative", display: "block", height: "100%", cursor: "pointer",
                                                borderRadius: "inherit", backgroundColor: "rgba(0, 0, 0, 0.2)", width: "0px"
                                            }}>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute", width: "6px", right: "2px", bottom: "2px",
                                            top: "2px", borderRadius: "3px"
                                        }}>
                                        <div
                                            style={{
                                                position: "relative", display: "block",
                                                width: "100%",
                                                cursor: "pointer", borderRadius: "inherit", backgroundColor: "rgba(0, 0, 0, 0.2)",
                                                height: "0px"
                                            }}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dialogue-right">
                            <div className="user-header">
                                <div className="back-wrap"><a className="back-link" href="/user/messages">Back</a></div>
                                {/* {
                                    userConversation ? userConversation.map((userConItems, index) => {
                                        return (
                                            <div className="name-wrap" key={index}>
                                                <span className="name">
                                                    {userConItems.sellerData[0].firstName} {userConItems.sellerData[0].lastName}</span>
                                            </div>

                                        )
                                    }) : null
                                } */}
                                <div className="name-wrap" >
                                    <span className="name">
                                        {sellerName}
                                    </span>
                                </div>

                                {/* {
                                    userConversationName ? userConversationName.map((userConItems, index) => {
                                        return (
                                            <div className="name-wrap" key={index}>
                                                <span className="name">
                                                    {userConItems.sellerData[0].firstName} {userConItems.sellerData[0].lastName}</span>
                                            </div>

                                        )
                                    }) : null
                                } */}
                                {/* <div className="name-wrap"><span className="name">George Ever</span></div> */}
                            </div>
                            <div className="msg-box" id="scroll">
                                <div className="top-wrap">
                                    <div className="msg-tags">
                                        <div className="tag-wrap">Wedding Services</div>
                                        <div className="tag-wrap">Catering</div>
                                        <div className="tag-wrap">Catering Services for party functions</div>
                                    </div>
                                    <div className="link-wrap"><button className="page-link">Go to Service Listing Page</button></div>
                                </div>
                                <div className="scroll-msg" style={{
                                    position: "relative", overflow: "hidden",
                                    width: "100%", height: "100%"
                                }}>
                                    <div
                                        style={{
                                            position: "absolute", inset: "0px", overflow: "scroll", marginRight: "-15px",
                                            marginBottom: "-15px"
                                        }}>

                                        {
                                            userConversation ? userConversation.map((userConItems, index) => {
                                                return (
                                                    <div className="msg-wrap sender" key={index}>
                                                        <div className="user-img no-img">{userConItems.userData[0].firstName[0]}</div>
                                                        <div className="msg-details">
                                                            <div className="user-name">{userConItems.userData[0].firstName} {userConItems.userData[0].lastName}</div>
                                                            <p>{userConItems.message}</p>

                                                            {
                                                                (userConItems.attachment).length > 0
                                                                    ?
                                                                    <p><img src={userConItems.MESSAGEATTACHMENTSHOWPATH + userConItems.attachment[0]}
                                                                        style={{
                                                                            height: "100px",
                                                                            width: "100px"
                                                                        }}
                                                                    /></p>
                                                                    : null
                                                            }

                                                            {/* // <p><img src={userConItems.MESSAGEATTACHMENTSHOWPATH + userConItems.attachment[0]}
                                                            //     style={{
                                                            //         height: "100px",
                                                            //         width: "100px"
                                                            //     }}
                                                            // /></p> */}
                                                            {/* < p > {userConItems.createdAt}</p> */}

                                                            {new Date(userConItems.createdAt).toLocaleTimeString(
                                                                "en-GB",
                                                                dateOpt
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            }) : null
                                        }

                                        <div style={{ height: "1px" }}></div>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            height: "6px", right: "2px",
                                            bottom: "2px",
                                            left: "2px",
                                            borderRadius: "3px"
                                        }}>
                                        <div
                                            style={{
                                                position: "relative", display: "block",
                                                height: "100%", cursor: "pointer",
                                                borderRadius: "inherit", backgroundColor: " rgba(0, 0, 0, 0.2)", width: "0px"
                                            }}>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "6px",
                                            right: "2px",
                                            bottom: "2px",
                                            top: "2px",
                                            borderRadius: "3px"
                                        }}>
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "block",
                                                width: "100%",
                                                cursor: "pointer", borderRadius: "inherit",
                                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                                height: "0px",
                                                transform: "translateY(175px)"
                                            }}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="msg-input">
                                <form onSubmit={sendMessage}>
                                    <div className="form-wrap" style={{ position: "relative" }}>
                                        <div style={{
                                            position: "relative", overflow: "hidden",
                                            display: "inline-block"
                                        }}>
                                            <div className="clip-wrap" style={{ cursor: "pointer" }}><button type="button"
                                                style={{ cursor: "pointer" }}><i className="icon-clip"
                                                    style={{ cursor: "pointer" }}></i></button></div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={imageChangeHandler}
                                                style={{
                                                    fontSize: "0px",
                                                    position: "absolute", left: "0px",
                                                    top: "0px",
                                                    opacity: "0",
                                                    width: "100%",
                                                    height: "100%",
                                                    cursor: "pointer"
                                                }} />
                                        </div>
                                        <div className="input-wrap">
                                            <input
                                                className="form-control"
                                                placeholder="Write a message..."
                                                type="text"
                                                // name="userMessage"
                                                value={message}
                                                onChange={messageHandler}

                                                style={{ height: "64px" }} />
                                        </div>
                                        <div className="send-wrap" >

                                            <button type="submit"><i className="icon-send"></i>
                                            </button>
                                        </div>
                                        {selectedImage && (
                                            <div style={{
                                                position: "absolute",
                                                bottom: "100%",
                                                left: "0",
                                                height: "250px",
                                                width: "250px",
                                            }}>
                                                <img
                                                    src={URL.createObjectURL(selectedImage)}
                                                    alt="Thumb"
                                                    style={{
                                                        height: "100px",
                                                        width: "100px",
                                                    }}
                                                />
                                                <p>{URL.createObjectURL(selectedImage)}</p>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Chatuser