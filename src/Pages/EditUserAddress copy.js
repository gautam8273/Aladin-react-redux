import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getCityListAction from "../Store/actions/GetCityListAction";
import getCountryListAction from "../Store/actions/GetCountryListAction";
import getStateListAction from "../Store/actions/GetStateListAction";
import {
    getSpecificAddressDetailAction,
    editAddressAction,
} from "../Store/actions/AddAddressAction";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const EditAddress = () => {
    const countryList = useSelector(
        (state) => state.GetCountryListReducer?.CountryList
    );
    console.log(countryList);
    const stateList = useSelector(
        (state) => state.GetStateListReducer?.StateList
    );
    console.log(stateList);
    const cityList = useSelector((state) => state.GetCityListReducer?.CityList);
    console.log(cityList);
    const address = useSelector(
        (state) => state.GetSpecificAddressDetailReducer?.address
    );
    console.log(address);

    const dispatch = useDispatch();
    const [countryId, setCountryId] = useState();
    const [stateName, setStateName] = useState();
    const [CityName, setCityName] = useState();
    const [addrline1, setAddrline1] = useState();
    const [addrline2, setAddrline2] = useState();
    const [postCode, setPostCode] = useState();
    const [addrType, setaddrType] = useState();

    const navigate = useNavigate();

    const { addressId } = useParams();
    // console.log("addressId", addressId);

    useEffect(() => {
        if (addressId) {
            const reqpayload = { addressId: addressId };
            getSpecificAddressDetailAction(dispatch, reqpayload);
        }
    }, [addressId]);
    useEffect(() => {
        getCountryListAction(dispatch);
    }, []);

    const countrychange = (e) => {
        setCountryId(e.target.value);
        const reqpayload = {
            countryId: e.target.value,
        };
        getStateListAction(dispatch, reqpayload);
    };

    const statechange = (e) => {
        setStateName(e.target.value);
        const reqpayload = {
            countryId: countryId,
            stateId: e.target.value,
        };
        getCityListAction(dispatch, reqpayload);
    };
    const citychange = (e) => {
        setCityName(e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        const reqpayload = {
            addressLine1: e.target.addressLine1.value,
            addressLine2: e.target.addressLine2.value,
            addressType: e.target.addressType.value,
            cityId: e.target.cityId.value,
            countryId: e.target.countryId.value,
            postcode: e.target.postcode.value,
            stateId: e.target.stateId.value,
        };

        editAddressAction(dispatch, reqpayload, navigate);
    };

    const cancelclicked = () => {
        navigate("/user/my-addresses");
    };
    const changeaddrType = (e) => {
        setaddrType(e.target.value);
    };
    useEffect(() => {
        if (addressId) {
            setAddrline1(address?.addressLine1);
            setAddrline2(address?.addressLine2);
            setPostCode(address?.postcode);
            setCountryId(address?.countryId);
            setStateName(address?.stateId);
            setCityName(address?.cityId);
            setaddrType(address?.addressType);
            if (address?.countryId !== undefined) {
                getStateListAction(dispatch, { countryId: address?.countryId });
                getCityListAction(dispatch, {
                    countryId: address?.countryId,
                    stateId: address?.stateId,
                });
            }
        }
    }, [address]);

    return (
        <>
            <section className="my-addresses add">
                <div className="Toastify"></div>
                <form onSubmit={submit}>
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/user/dashboard">User Account</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="/user/my-addresses">My Adresses</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Edit Adresses
                                </li>
                            </ol>
                        </nav>
                        <h1>Edit Address</h1>

                        <div className="address-block">
                            <div className="card address-card inputs-wrapper">
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <div className="radio-btn form-check form-check-inline">
                                            <input
                                                type="radio"
                                                id="credit-input"
                                                className="form-check-input"
                                                name="addressType"
                                                onChange={changeaddrType}
                                                value={addrType}
                                                Checked={addrType === "Home Address"}
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
                                                type="radio"
                                                id="credit-input"
                                                className="form-check-input"
                                                name="addressType"
                                                onChange={changeaddrType}
                                                value={addrType}
                                                checked={addrType === "Office Address"}
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
                                                type="radio"
                                                id="credit-input"
                                                className="form-check-input"
                                                name="addressType"
                                                onChange={changeaddrType}
                                                value={addrType}
                                                checked={addrType === "Others"}
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
                                                onChange={(e) => setAddrline1(e.target.value)}
                                                value={addrline1}
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
                                                onChange={(e) => setAddrline2(e.target.value)}
                                                value={addrline2}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 input-wrapper required">
                                        <label className="input-label">Country</label>
                                        <select
                                            className="form-control"
                                            onChange={countrychange}
                                            name="countryId"
                                            value={countryId}
                                        >
                                            <option value="" hidden>
                                                Select country
                                            </option>

                                            {countryList &&
                                                countryList.map((item, index) => {
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
                                            onChange={statechange}
                                            name="stateId"
                                            value={stateName}
                                        >
                                            <option value="">Select State</option>

                                            {stateList
                                                ? stateList.map((item, index) => {
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
                                        <select
                                            className="form-control"
                                            name="cityId"
                                            onChange={citychange}
                                            value={CityName}
                                        >
                                            <option value="">Select city</option>

                                            {cityList &&
                                                cityList.map((item, index) => {
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
                                                onChange={(e) => setPostCode(e.target.value)}
                                                value={postCode}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btns-wrap">
                            <button
                                className="secondary-btn"
                                type="button"
                                onClick={cancelclicked}
                            >
                                Cancel
                            </button>
                            <button className="btn">Submit</button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditAddress;
