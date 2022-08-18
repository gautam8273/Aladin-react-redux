import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCityAction, getCountryListAction, getStateListAction, sellerSignUpFormAction } from '../Store/Actions/action';

const CompanySellerForm = () => {

    //=====================>>>>>>>>>.

    const [stateId, setStateId] = useState();
    const [cityId, setCityId] = useState();

    const getCountry = useSelector(state => state.reducerGetCountry?.getCountryDetails);
    // console.log("getCountry==>", getCountry)

    const stateList = useSelector(state => state.reducerStateList?.stateList);
    // console.log("stateList==>", stateList)

    const cityList = useSelector(state => state.reducerCityList?.cityList);
    // console.log("cityList==>", cityList)

    // const companySellerSignUpForm = useSelector(state => state.reducerSellerSignUpForm?.sellerSignUpForm);
    // console.log("companySellerSignUpForm==>", companySellerSignUpForm)

    const dispatch = useDispatch();

    // country
    useEffect(() => {
        getCountryListAction(dispatch)
    }, [dispatch])

    // state
    const changeCountry = (e) => {
        setStateId(e.target.value)
        let idCountry = {
            countryId: e.target.value
        }
        getStateListAction(dispatch, idCountry)
    }

    //city
    const stateChange = (e) => {
        setCityId(e.target.value)
        let idState = {
            countryId: stateId,
            stateId: e.target.value
        }

        getCityAction(dispatch, idState)
    }

    const companySellerForm = (e) => {
        e.preventDefault();
        const companyForm = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            password: e.target.password.value,
            businessName: e.target.businessName.value, //In Case of Company
            primaryContactPerson: e.target.primaryContactPerson.value, //In Case of Company
            companyRegistrationNumber: e.target.companyRegistrationNumber.value,   //In Case of Company
            vat: e.target.vat.value,  //In Case of Company
            addressLine1: e.target.addressLine1.value,
            addressLine2: e.target.addressLine2.value,
            cityId: e.target.cityId.value,
            stateId: e.target.stateId.value,
            countryId: e.target.countryId.value,
            postcode: e.target.postcode.value,
            comment: "Lorem Ipsum is dummy text about me",
            type: "Company",
            //Company/Freelancer,
            privacyPolicy: true
        }
        sellerSignUpFormAction(dispatch, companyForm)
    }

    return (
        <>
            <div
                id="uncontrolled-tab-example-tabpane-company"
                aria-labelledby="uncontrolled-tab-example-tab-company"
                className="tab-pane active"
            >
                <div className="company-tab">
                    <div className="Toastify"></div>
                    <form onSubmit={companySellerForm}>
                        <div className="card inputs-wrapper">
                            <h4>Verification</h4>
                            <div className="row input-block">
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required required">
                                        first name
                                    </label>
                                    <div className="input-wrap">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            placeholder="FirstName"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Last name
                                    </label>
                                    <div className="input-wrap">
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="form-control"
                                            placeholder="LastName"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Email address
                                    </label>
                                    <div className="input-wrap">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="example@aladyyn.pro"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">Password</label>
                                    <div className="input-wrap password">
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="**********"
                                        />
                                        <div className="toggle-password">
                                            <i className="icon-eye"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Confirm Password
                                    </label>
                                    <div className="input-wrap password">
                                        <input
                                            type="password"
                                            name="re_password"
                                            className="form-control"
                                            placeholder="************"
                                        />
                                        <div className="toggle-password">
                                            <i className="icon-eye"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="inputs-heading">Business Information</div>
                            <div className="row input-block margin-fix">
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Business Name
                                    </label>
                                    <div className="input-wrap">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="businessName"
                                            placeholder="Business Name"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Primary Contact Person
                                    </label>
                                    <div className="input-wrap">
                                        <input
                                            type="text"
                                            name="primaryContactPerson"
                                            className="form-control"
                                            placeholder="Primary Person"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Company Registration Number
                                    </label>
                                    <div className="input-wrap">
                                        <input
                                            type="text"
                                            name="companyRegistrationNumber"
                                            className="form-control"
                                            placeholder="Company Registration Number"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper">
                                    <label className="input-label">
                                        VAT Number
                                        <span className="text-lowercase">
                                            (if applicable)
                                        </span>
                                    </label>
                                    <div className="input-wrap">
                                        <input
                                            type="text"
                                            name="vat"
                                            className="form-control"
                                            placeholder="Vat number"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="input-wrapper required">
                                        <label className="input-label required">
                                            Phone Number
                                        </label>
                                        <div className="input-wrap">
                                            <input
                                                type="number"
                                                name="phone"
                                                className="form-control"
                                                placeholder="Mobile"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="inputs-heading">
                                Registered Business Address
                            </div>
                            <div className="row input-block">
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label required">
                                        address line 1
                                    </label>
                                    <div className="input-wrap">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="addressLine1"
                                            placeholder="Address"
                                        />
                                        <span className="input-info">
                                            Building number and Street
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6 input-wrapper">
                                    <label className="input-label">address line 2</label>
                                    <div className="input-wrap">
                                        <input
                                            type="text"
                                            name="addressLine2"
                                            className="form-control"
                                            placeholder="Address"
                                        />
                                        <span className="input-info">
                                            Room/Block/Apartments
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label">Country</label>
                                    <div className="input-wrap">
                                        <select
                                            name="countryId"
                                            className="form-control"
                                            id="countryId"
                                            onChange={changeCountry}

                                        >
                                            <option value="">Please select country</option>
                                            {getCountry &&
                                                getCountry.map((items, index) => (
                                                    <option value={items._id} key={index}>
                                                        {items.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label required">
                                        State / Region
                                    </label>
                                    <div className="input-wrap">
                                        <select
                                            className="form-control"
                                            name="stateId"
                                            onChange={stateChange}
                                        >
                                            <option value="">Please select state</option>
                                            {stateList
                                                ? stateList?.map((item, index) => {
                                                    return (
                                                        <option value={item._id} key={index}>
                                                            {item.name}
                                                        </option>
                                                    );
                                                })
                                                : null}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 input-wrapper">
                                    <label className="input-label">City</label>
                                    <div className="input-wrap">
                                        <select className="form-control" name="cityId">
                                            <option value="">Please select city</option>
                                            {cityList
                                                ? cityList?.map((item, index) => {
                                                    return (
                                                        <option value={item._id} key={index}>
                                                            {item.name}
                                                        </option>
                                                    );
                                                })
                                                : null}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label required">
                                        ZIP / Postal Code
                                    </label>
                                    <div className="input-wrap">
                                        <input
                                            type="text"
                                            name="postcode"
                                            className="form-control"
                                            placeholder="Zip Code"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row input-block">
                                <div className="col-12 input-wrapper required mb-0">
                                    <label className="input-label required">Comment</label>
                                    <div className="input-wrap">
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name="comment"
                                            placeholder="Please enter your comment"
                                        ></textarea>
                                    </div>
                                    <label className="comment-info input-label required input-info position-static">
                                        Comment should not exceed 300 characters.
                                    </label>
                                </div>
                            </div>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    name="privacyPolicy"
                                    // id="selectCheckbox"
                                    className="form-check-input"
                                />
                                <label
                                    htmlFor="privacyPolicy"
                                    className="form-check-label"
                                >
                                    Please accept our
                                    <a
                                        className="term-conditions"
                                        href="/terms-and-conditions"
                                    >
                                        terms and conditions
                                    </a>
                                </label>
                                <div className="invalid-feedback"></div>
                            </div>
                        </div>
                        <div className="btn-wrap">
                            <input className="btn" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CompanySellerForm