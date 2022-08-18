
import React, { useEffect, useRef, useState } from "react";
import { userconversationdetailaction, userconversationnameaction, userMessageSendAction } from "../../Store/actions/YourMessageAction";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ChatWithSeller = () => {
    const { conversationId } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState()
    const [message, setMessage] = useState()
    const [sellerName, setsellerName] = useState()


    const userConversationDetail = useSelector((state) => state.UserconversationdetailReducer?.conversationDetail)
    const userConversationName = useSelector((state) => state.UserConversationNameReducer?.conversationName)
    console.log(userConversationDetail)
    console.log(userConversationName)



    useEffect(() => {
        userconversationdetailaction(dispatch, { conversationId: conversationId })
        if (conversationId) {
            userConversationName?.forEach(element => {
                if (element.conversationId == conversationId) {
                    setsellerName(`${element.sellerData[0].firstName}${element.sellerData[0].lastName}`)
                }
            });
        }
    }, [conversationId, userConversationName])
    useEffect(() => {
        userconversationnameaction(dispatch, {})

    }, [])
    const clickedSellerName = (conversationid) => {
        navigate(`/user/messages/opened/${conversationid}`);
    }
    const imageChangeHandler = (e) => {
        setSelectedImage(e.target.files[0]);
    }
    const messagehandler = (e) => {
        setMessage(e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()
        let reqpayload = new FormData()
        // console.log(e.target.message.value)
        // console.log(selectedImage)
        reqpayload.append("message", message)
        reqpayload.append("attachment", selectedImage)
        reqpayload.append("conversationId", conversationId)
        if (message !== "" || selectedImage?.length !== 0) {
            userMessageSendAction(dispatch, reqpayload)
        }
        userconversationdetailaction(dispatch, { conversationId: conversationId })
        setMessage("")

    }

    return (
        <>
            <section className="user-dialogue">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/user/dashboard">User Account</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="/user/messages">User Messages</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Particular
                            </li>
                        </ol>
                    </nav>
                    <div className="card dialogue-wrap">
                        <div className="dialogue-left">
                            <div className="users-header"></div>
                            <div className="users-wrap ">
                                <div
                                    className="scroll-users"
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: "0px",
                                            overflow: "scroll",
                                            marginRight: "-15px",
                                            marginBottom: "-15px",
                                        }}
                                    >
                                        <ul className="users-list">
                                            {userConversationName ? userConversationName.map((item, index) => {
                                                return <li key={index} onClick={() => { clickedSellerName(item.conversationId) }}>


                                                    {`${item.sellerData[0].firstName} ${item.sellerData[0].lastName}`}

                                                    <p
                                                        style={{
                                                            fontWeight: "400",
                                                            color: "gray",
                                                            fontSize: "13px",
                                                            lineHeight: "1.5",
                                                        }}
                                                    >
                                                        {item.sellerData[0].businessName}
                                                    </p>

                                                </li>
                                            }) : ""}

                                        </ul>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            height: "6px",
                                            right: "2px",
                                            bottom: "2px",
                                            left: "2px",
                                            borderRadius: "3px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "block",
                                                height: "100%",
                                                cursor: "pointer",
                                                borderRadius: "inherit",
                                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                                width: "0px",
                                            }}
                                        ></div>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "6px",
                                            right: "2px",
                                            bottom: "2px",
                                            top: "2px",
                                            borderRadius: "3px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "block",
                                                width: "100%",
                                                cursor: "pointer",
                                                borderRadius: "inherit",
                                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                                height: "0px",
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dialogue-right">
                            <div className="user-header">
                                <div className="back-wrap">
                                    <a className="back-link" href="/user/messages">
                                        Back
                                    </a>
                                </div>
                                <div className="name-wrap">
                                    <span className="name">{sellerName}</span>
                                </div>
                            </div>
                            <div className="msg-box" id="scroll">
                                <div className="top-wrap">
                                    <div className="msg-tags">
                                        <div className="tag-wrap">Wedding Services</div>
                                        <div className="tag-wrap">Catering</div>
                                        <div className="tag-wrap">
                                            Catering Services for party functions
                                        </div>
                                    </div>
                                    <div className="link-wrap">
                                        <button className="page-link">
                                            Go to Service Listing Page
                                        </button>
                                    </div>
                                </div>
                                <div
                                    className="scroll-msg"
                                    style={{
                                        position: "relative",
                                        overflow: "hidden",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: "0px",
                                            overflow: "scroll",
                                            marginRight: "-15px",
                                            marginBottom: "-15px",
                                        }}
                                    >
                                        <div className="msg-wrap sender">
                                            {userConversationDetail ? userConversationDetail.map((item, index) => {
                                                return <div key={index}><div className="user-img no-img">{item.userData[0].firstName.substring(0, 1).toUpperCase()}</div>
                                                    <div className="msg-details">
                                                        <div className="user-name">
                                                            <a href="/user/messages/opened/6295d0e7cda34b9789fca9da">
                                                                {item.userData[0].firstName}
                                                            </a>
                                                        </div>
                                                        <p>
                                                            {item.message}
                                                        </p>
                                                        <p>{new Date(item.createdAt).getDate() +
                                                            "/" + (new Date(item.createdAt).getMonth() + 1) +
                                                            "/" + new Date(item.createdAt).getFullYear() +
                                                            " " + new Date(item.createdAt).getHours() +
                                                            ":" + new Date(item.createdAt).getMinutes() +
                                                            ":" + new Date(item.createdAt).getSeconds()}</p>
                                                    </div>
                                                </div>
                                            }) : ""}
                                        </div>
                                        <div style={{ height: "1px" }}></div>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            height: "6px",
                                            right: "2px",
                                            bottom: "2px",
                                            left: "2px",
                                            borderRadius: "3px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "block",
                                                height: "100%",
                                                cursor: "pointer",
                                                borderRadius: "inherit",
                                                backgroundColor: " rgba(0, 0, 0, 0.2)",
                                                width: "0px",
                                            }}
                                        ></div>
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "6px",
                                            right: "2px",
                                            bottom: "2px",
                                            top: "2px",
                                            borderRadius: "3px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "block",
                                                width: "100%",
                                                cursor: "pointer",
                                                borderRadius: "inherit",
                                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                                                height: "0px",
                                                transform: "translateY(175px)",
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="msg-input">
                                <form onSubmit={submit}>
                                    <div className="form-wrap" style={{ position: "relative" }}>
                                        <div
                                            style={{
                                                position: "relative",
                                                overflow: "hidden",
                                                display: "inline-block",
                                            }}
                                        >
                                            <div className="clip-wrap" style={{ cursor: "pointer" }}>
                                                <button type="button" style={{ cursor: "pointer" }}>
                                                    <i
                                                        className="icon-clip"
                                                        style={{ cursor: "pointer" }}
                                                    ></i>
                                                </button>
                                            </div>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={imageChangeHandler}

                                                style={{
                                                    fontSize: "0px",
                                                    position: "absolute",
                                                    left: "0px",
                                                    top: "0px",
                                                    opacity: "0",
                                                    width: "100%",
                                                    height: "100%",
                                                    cursor: "pointer",
                                                }}
                                            />


                                        </div>
                                        <div className="input-wrap">
                                            <input
                                                className="form-control"
                                                placeholder="Write a message..."
                                                type="text"
                                                value={message}
                                                onChange={messagehandler}
                                                style={{ height: "64px" }}
                                            />
                                        </div>
                                        <div className="send-wrap">
                                            <button type="submit">
                                                <i className="icon-send"></i>
                                            </button>
                                        </div>
                                        {selectedImage && (
                                            <div style={{
                                                position: "absolute",
                                                bottom: "100%",
                                                left: "0"
                                            }}>
                                                <img
                                                    src={URL.createObjectURL(selectedImage)}
                                                    alt="Thumb"
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
    );
};

export default ChatWithSeller;
