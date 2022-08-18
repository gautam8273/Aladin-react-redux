import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCartAction, checkAuthAction } from '../Store/Actions/action';

const UserDashBoard = () => {

    const dispatch = useDispatch();

    const checkAuth = useSelector(state => state.reducerCheckAuth?.checkAuthData);
    // console.log("checkAuth==>", checkAuth)


    // data send local stoage to add to cart Api-- after login
    // useEffect(() => {
    //     // console.log("ghjfhdf");
    //     if (localStorage.getItem("loginData")) {
    //         JSON.parse(localStorage.getItem("alacart"))?.forEach((element) => {
    //             const reqpayload = {
    //                 serviceId: element.serviceId,
    //                 quantity: element.quantity,
    //             };
    //             addToCartAction(dispatch, reqpayload);
    //         });
    //         localStorage.removeItem("alacart");
    //     }
    // }, []);


    // check Auth Api
    // useEffect(() => {
    //     let token = localStorage.getItem("loginData")
    //     if (token) {
    //         checkAuthAction(dispatch)
    //     }
    // })

    return (
        <>
            <section className="user-dashboard">
                <div className="container">
                    <h2>Your Account</h2>
                    <div className="dashboard-wrapper">
                        <div className="dashboard-card card"><Link to={'/user/profile'}>
                            <div className="wrap-icon"><i className="icon-person"></i></div>
                            <h4 className="service-name">Your Profile</h4>
                            <div className="service-details">Edit or add profile information</div>
                        </Link>
                        </div>
                        <div className="dashboard-card card"><a href="/user/your-orders">
                            <div className="wrap-icon"><i className="icon-bag"></i></div>
                            <h4 className="service-name">Your Orders</h4>
                            <div className="service-details">View your current, past and cancelled orders</div>
                        </a></div>
                        <div className="dashboard-card card"><a href="/user/messages">
                            <div className="wrap-icon"><i className="icon-comment"></i></div>
                            <h4 className="service-name">Your Messages</h4>
                            <div className="service-details">View your seller messages</div>
                        </a></div>
                        <div className="dashboard-card card">
                            <Link to={"/user/my-addresses/"}>
                                <div className="wrap-icon"><i className="icon-home"></i></div>
                                <h4 className="service-name">Your Addresses</h4>
                                <div className="service-details">Edit addresses for orders</div>
                            </Link></div>
                        <div className="dashboard-card card"><a href="/user/login-and-security">
                            <div className="wrap-icon"><i className="icon-lock"></i></div>
                            <h4 className="service-name">Login &amp; Security</h4>
                            <div className="service-details">Edit login, name and mobile number</div>
                        </a></div>

                        <div className="dashboard-card card">
                            <Link to={'/user/billing-method'}>
                                <div className="wrap-icon"><i className="icon-card"></i></div>
                                <h4 className="service-name">Payment Options</h4>
                                <div className="service-details">Edit or add payment methods</div>
                            </Link>
                        </div>

                        <div className="dashboard-card card"><a href="/faq">
                            <div className="wrap-icon"><i className="icon-question"></i></div>
                            <h4 className="service-name">Help (FAQ)</h4>
                            <div className="service-details">Browse questions and help topics</div>
                        </a></div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserDashBoard