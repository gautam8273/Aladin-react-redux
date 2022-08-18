import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { getCityAction, getCountryListAction, getStateListAction } from '../Store/Actions/action';
import 'react-toastify/dist/ReactToastify.css';
import { getCityAction, getCountryListAction, getStateListAction } from '../../Store/Actions/action';
import { UserAddressAddAction } from '../../Store/Actions/UserAddressAddAction';

const UserAddEditAddressCard = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const countryName = useSelector(state => state.reducerGetCountry?.getCountryDetails);
    // console.log("countryName==>", countryName)


    const stateListName = useSelector(state => state.reducerStateList?.stateList);
    // console.log("stateListName==>", stateListName)


    const cityListName = useSelector(state => state.reducerCityList?.cityList);
    // console.log("cityListName==>", cityListName)


    const userAddress = useSelector(state => state.reducerUserAddressAdd?.userAddress);
    // console.log("userAddress==>", userAddress)


    const [stateId, setStateId] = useState();
    const [cityId, setCityId] = useState();

    // for country name
    useEffect(() => {
        getCountryListAction(dispatch)
    }, [dispatch])


    //for state name
    const countryChange = (e) => {
        setStateId(e.target.value)
        let country_id = {
            countryId: e.target.value
        }
        getStateListAction(dispatch, country_id)
    }

    // for city name
    const stateChange = (e) => {
        setCityId(e.target.value);
        let idState = {
            countryId: stateId,
            stateId: e.target.value
        }
        getCityAction(dispatch, idState)
    }

    const submitAddress = (e) => {
        e.preventDefault();
        const addressData = {

            addressLine1: e.target.addressLine1.value,
            addressLine2: e.target.addressLine2.value,
            countryId: e.target.countryId.value,
            stateId: e.target.stateId.value,
            cityId: e.target.cityId.value,
            postcode: e.target.postcode.value,
            // addressType: "Home Address"
            addressType: e.target.addressType.value

        }
        UserAddressAddAction(dispatch, addressData, navigate);
    }

    return (
        <>
            <form
                onSubmit={submitAddress}
            >
                <div className="container">



                    <div className="address-block">
                        <div className="card address-card inputs-wrapper">
                            <div className="row mb-3">
                                <div className="col-12">
                                    <div className="radio-btn form-check form-check-inline">
                                        <input
                                            // name="group1"
                                            type="radio"
                                            id="credit-input"
                                            className="form-check-input" name="addressType"
                                            value="Home Address"
                                        />
                                        <label
                                            title=""
                                            htmlFor="credit-input"
                                            className="form-check-label"

                                        >
                                            Home Address
                                        </label>
                                    </div>
                                    <div className="radio-btn form-check form-check-inline">
                                        <input
                                            // name="group1"
                                            type="radio"
                                            id="credit-input"
                                            className="form-check-input"
                                            name="addressType"
                                            value="Office Address"
                                        />
                                        <label

                                            title=""
                                            htmlFor="credit-input"
                                            className="form-check-label"

                                        >
                                            Office Address
                                        </label>
                                    </div>
                                    <div className="radio-btn form-check form-check-inline">
                                        <input
                                            // name="group1"
                                            type="radio"
                                            id="credit-input"
                                            className="form-check-input"
                                            name="addressType"
                                            value="Other"
                                        />
                                        <label
                                            title=""
                                            htmlFor="credit-input"
                                            className="form-check-label"
                                        >
                                            Other
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row input-block">
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label">Address Line 1</label>
                                    <div className="input-wrap ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Address"
                                            name="addressLine1"
                                            maxLength="40"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 input-wrapper">
                                    <label className="input-label">Address Line 2</label>
                                    <div className="input-wrap ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Address"
                                            maxLength="40"
                                            name="addressLine2"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label">Country</label>
                                    <select
                                        className="form-control"
                                        onBlur={countryChange}
                                        name="countryId"
                                    >
                                        <option value="">Select country</option>
                                        {countryName &&
                                            countryName.map((item, index) => {
                                                return (
                                                    <option value={item._id} key={index}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label">State</label>
                                    <select
                                        className="form-control"
                                        onBlur={stateChange}
                                        name="stateId"
                                    >
                                        <option value="">Select state</option>
                                        {stateListName
                                            ? stateListName.map((item, index) => {
                                                return (
                                                    <option value={item._id} key={index}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })
                                            : ""}
                                    </select>
                                </div>
                                <div className="col-md-6 input-wrapper">
                                    <label className="input-label">City</label>
                                    <select className="form-control"
                                        name="cityId">
                                        <option value="">Select city</option>
                                        {cityListName &&
                                            cityListName.map((item, index) => {
                                                return (
                                                    <option value={item._id} key={index}>
                                                        {item.name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label">Zip/Postal Code</label>
                                    <div className="input-wrap ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Zip"
                                            name="postcode"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btns-wrap">
                        <Link to={'/user/my-addresses'} className="secondary-btn" type="button">
                            Cancel
                        </Link>
                        <button className="btn"
                            type='submit'
                        >
                            Submit
                        </button>

                    </div>
                </div>
            </form>
        </>
    )
}

export default UserAddEditAddressCard