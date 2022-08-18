import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserAddressCard from '../Components/Cards/UserAddressCard';
import { userAddressListAction } from '../Store/Actions/userAddressListAction';

const MyAddress = () => {

    const dispatch = useDispatch();

    const listAddressUsers = useSelector(state => state.reducerListAddressOfUsers?.listOfAddressOfUsers);
    // console.log("listAddressUsers==>", listAddressUsers);


    // list of user of address
    useEffect(() => {
        userAddressListAction(dispatch)
    }, [dispatch])


    return (
        <>
            <section className="my-addresses">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a role="button" tabIndex="0">User Account</a></li>
                            <li className="breadcrumb-item active" aria-current="page">My Adresses</li>
                        </ol>
                    </nav>
                    <div className="section-head">
                        <div className="heading-wrap">
                            <h1>My Adresses</h1>
                        </div>
                        <div className="btn-wrap">
                            <Link className="btn" to={"/user/my-addresses/add"}>
                                Add New Address
                            </Link>
                        </div>
                    </div>
                    {
                        listAddressUsers ?
                            listAddressUsers.map((addItems, index) => {
                                return (
                                    <UserAddressCard addresssData={addItems} key={index} />
                                )
                            }) : null
                    }

                </div>
            </section>
        </>
    )
}

export default MyAddress