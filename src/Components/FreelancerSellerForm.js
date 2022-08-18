import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCityAction, getCountryListAction, getStateListAction, sellerSignUpFormAction } from '../Store/Actions/action';

const FreelancerSellerForm = () => {

    const dispatch = useDispatch();

    const [stateId, setStateId] = useState();
    const [cityId, setCityId] = useState();

    const getCountry = useSelector(state => state.reducerGetCountry?.getCountryDetails);
    // console.log("getCountry==>", getCountry)

    const stateList = useSelector(state => state.reducerStateList?.stateList);
    // console.log("stateList==>", stateList)

    const cityList = useSelector(state => state.reducerCityList?.cityList);
    // console.log("cityList==>", cityList)



    const freelancerSellerSignUpForm = useSelector(state => state.reducerSellerSignUpForm?.sellerSignUpForm);
    // console.log("freelancerSellerSignUpForm==>", freelancerSellerSignUpForm)


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


    const freelancerSellerForm = (e) => {
        e.preventDefault();
        const freelancerForm = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            dob: e.target.dob.value, //In Case of Freelancer
            proofOfIdentity: e.target.proofOfIdentity.value, //In Case of Freelancer and will be a file
            password: e.target.password.value,
            addressLine1: e.target.addressLine1.value,
            addressLine2: e.target.addressLine2.value,
            cityId: e.target.cityId.value,
            stateId: e.target.stateId.value,
            countryId: e.target.countryId.value,
            postcode: e.target.postcode.value,
            comment: "Lorem Ipsum is dummy text about me",
            type: "Freelancer",
            //Company/Freelancer,
            privacyPolicy: true
        }
        sellerSignUpFormAction(dispatch, freelancerForm)

    }

    return (
        <>
            <div
                id="uncontrolled-tab-example-tabpane-freelancer"
                aria-labelledby="uncontrolled-tab-example-tab-freelancer"
                className="tab-pane"
            >
                <div className="freelancer-tab">
                    <div className="Toastify"></div>
                    <form onSubmit={freelancerSellerForm}>
                        <div className="card inputs-wrapper">
                            <h4>Verification</h4>
                            <div className="row input-block">
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label">first name</label>
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
                                    <label className="input-label">Last name</label>
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
                                    <label className="input-label">Email address</label>
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
                                    <label className="input-label">Password</label>
                                    <div className="input-wrap password">
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="*********"
                                        />
                                        <div className="toggle-password">
                                            <i className="icon-eye"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label">Confirm Password</label>
                                    <div className="input-wrap password">
                                        <input
                                            type="password"
                                            name="re_password"
                                            className="form-control"
                                            placeholder="**********"
                                        />
                                        <div className="toggle-password">
                                            <i className="icon-eye"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="inputs-heading">Freelancer Information</div>
                            <div className="row input-block">
                                <div className="col-md-6 col-lg-4 input-wrapper required text-fix">
                                    <label className="input-label">Date of Birth</label>
                                    <div className="input-wrap">
                                        <input
                                            type="date"
                                            className="form-control date-input"
                                            name="dob"
                                            placeholder="Select date"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="input-wrapper required">
                                        <label className="input-label">Phone Number</label>
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
                            <div className="input-wrapper img-input-fix has-input-file">
                                <label className="">Proof of Identify</label>
                                <div className="row input-block">
                                    <div className="col-lg-8 input-wrapper">
                                        <div className="img-input-wrapper">
                                            <div className="img-input">
                                                <i className="icon-plus"></i>Upload
                                                <input
                                                    name="proofOfIdentity"
                                                    type="file"
                                                    accept="image/*"
                                                />
                                            </div>
                                            <span className="img-info">
                                                Upload scanned copy of passport, nationalID,
                                                driver’s license etc.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="inputs-heading">Business Address</div>
                            <div className="row input-block">
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label">address line 1</label>
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
                                            // id="countryId"
                                            onChange={changeCountry}
                                        >
                                            <option value="">Please select country</option>
                                            {
                                                getCountry && getCountry.map((items, index) => {
                                                    return (
                                                        <option value={items._id} key={index}>
                                                            {items.name}
                                                        </option>
                                                    )
                                                })
                                            }



                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label">State / Region</label>
                                    <div className="input-wrap">
                                        <select className="form-control"
                                            name="stateId"
                                            onChange={stateChange}
                                        >
                                            <option value="">Please select state</option>
                                            {
                                                stateList && stateList.map((items, index) => {
                                                    return (
                                                        <option value={items._id} key={index}>{items.name}</option>
                                                    )
                                                })
                                            }

                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 input-wrapper">
                                    <label className="input-label">City</label>
                                    <div className="input-wrap">
                                        <select className="form-control"
                                            name="cityId">
                                            <option value="">Please select city</option>
                                            {
                                                cityList && cityList.map((items, index) => {
                                                    return (
                                                        <option value={items._id} key={index}> {items.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label">ZIP / Postal Code</label>
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
                                    <label className="input-label">Comment</label>
                                    <div className="input-wrap">
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name="comment"
                                            placeholder="Please enter your comment"
                                        ></textarea>
                                    </div>
                                    <label className="comment-info input-label input-info position-static">
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
                                        target="_blank"
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

export default FreelancerSellerForm