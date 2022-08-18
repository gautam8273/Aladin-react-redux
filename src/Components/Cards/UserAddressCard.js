import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteUsersAddressAction } from '../../Store/Actions/deleteUsersAddressAction'
import { userAddressListAction } from '../../Store/Actions/userAddressListAction';

const UserAddressCard = ({ addresssData }) => {

    // console.log("addresssData==>", addresssData)

    const dispatch = useDispatch();

    const [editDelete, setEditDelete] = useState(false)

    // delete the users address
    const deleteUserAddress = (addId) => {
        let addressId = {
            "addressId": addId
        }
        deleteUsersAddressAction(dispatch, addressId)
        userAddressListAction(dispatch)
    }

    return (
        <>
            <div className="address-block">
                <div className="heading-wrap">
                    <div className="wrap-icon home">
                        <i className="icon-home"></i>
                    </div>
                    <h4>Home Address</h4>
                </div>
                <div className="card address-card">
                    <div className="country-wrap">
                        <label className="address-label">Country:</label>
                        <span className="address-info">{addresssData.countryName}</span>
                    </div>
                    <div className="city-wrap">
                        <label className="address-label">City:</label>
                        <span className="address-info">{addresssData.cityName}</span>
                    </div>
                    <div className="state-wrap">
                        <label className="address-label">State:</label>
                        <span className="address-info not-applicable">{addresssData.stateName}</span>
                    </div>
                    <div className="address-wrap">
                        <label className="address-label">Address:</label>
                        <span className="address-info text-transform-initial" style={{
                            paddingLeft: "0px"
                        }}>{addresssData.addressLine1} {addresssData.addressLine2} {addresssData.postcode}</span>
                    </div>

                    <div className="more-wrap">
                        <div className="menu-wrap">
                            <button className="menu-btn" onClick={() => setEditDelete(prev => !prev)}>
                                <span className="btn-dot"></span>
                                <span className="btn-dot"></span>
                                <span className="btn-dot"></span>
                            </button>
                            {
                                editDelete
                                    ?
                                    <div className="menu">
                                        <ul className="menu-items">
                                            <li>
                                                <Link className="menu-option" to={"/user/my-addresses/edit" + '/' + `${addresssData._id}`}>Edit</Link>
                                            </li>
                                            <li>
                                                <button className="menu-option delete" onClick={() => deleteUserAddress(addresssData._id)}>Delete</button>
                                            </li>
                                        </ul>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserAddressCard