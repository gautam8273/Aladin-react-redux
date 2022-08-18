import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userProfileDetailsAction } from '../Store/Actions/action';

const UserProfile = () => {

    // User Profile details
    const userProfile = useSelector(state => state.reducerUserProfileDetails?.userProfileDetails);
    // console.log("userProfile==>", userProfile)

    const dispatch = useDispatch();

    // user Profile Details
    useEffect(() => {
        let token = localStorage.getItem("loginData");
        if (token) {
            userProfileDetailsAction(dispatch)
        }

    }, [dispatch])

    return (
        <>
            <section className="user-profile">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a role="button" tabIndex="0">User Account</a></li>
                            <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                        </ol>
                    </nav>
                    <div className="section-head">
                        <div className="heading-wrap">
                            <h1>User Profile</h1>
                        </div>
                        <div className="btn-wrap"><Link className="btn" to={"/user/profile/edit"}>Edit</Link></div>
                    </div>
                    <div className="account-info">
                        {
                            userProfile ? userProfile.map((userItem, index) => {
                                return (
                                    <div className="card account-card" key={index}>
                                        <div className="account-heading">Account Information</div><span className="info-label">First Name:</span><span
                                            className="info-wrap">{userItem.firstName}</span><span className="info-label">Last Name:</span><span
                                                className="info-wrap">{userItem.lastName}</span><span className="info-label">Email:</span><span
                                                    className="info-wrap">{userItem.email}</span><span className="info-label">Mobile:</span><span
                                                        className="info-wrap">{userItem.phone}</span>
                                    </div>
                                )
                            }) : null
                        }

                        <div className="card account-card">
                            <div className="account-heading">Basic Information</div>
                            <div className="profile-img">
                                <div className="img-wrap"><img src="/static/media/employee.16b7424786c37d0428e7.png" alt="profile" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserProfile