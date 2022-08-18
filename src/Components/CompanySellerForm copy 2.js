import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCityAction, getCountryListAction, getStateListAction, sellerSignUpFormAction } from '../Store/Actions/action';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

const numberRegex = /^[0-9]+$/

const schema = yup.object().shape({
    firstName: yup
        .string()
        .required("Please enter First Name")
        .min(2, "First name must be at least 2 characters")
        .max(20, "First name must be at most 20 characters")
        .matches(/^[A-Za-z ]+$/i, "Please enter valid first name"),
    lastName: yup
        .string()
        .required("Please enter Last Name")
        .min(2, "Last name must be at least 2 characters")
        .max(20, "Last name must be at most 20 characters")
        .matches(/^[A-Za-z ]+$/i, "Please enter valid last name"),
    email: yup
        .string()
        .required("Please enter your email address")
        .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            "Please use the correct email"
        ),
    businessName: yup
        .string()
        .required("Please enter Business Name")
        .min(2, "Business name must be at least 2 characters")
        .max(20, "Business name must be at most 20 characters"),
    // .matches(/^[ A-Za-z0-9_@./#&+-]*$/, "Please enter valid Business name"),
    primaryContactPerson: yup
        .string()
        .required("Please enter Primary Contact Person")
        .min(2, "Primary contact person must be at least 2 characters")
        .max(20, "Primary contact person must be at most 20 characters")
        .matches(/^[A-Za-z ]+$/i, "Please enter valid primary contact person"),
    companyRegistrationNumber: yup
        .string()
        .required("Please enter Company Register Number")
        .matches(/^[0-9a-zA-Z]+$/, "Company Register Number is not valid"),
    vat: yup
        .string(),
    addressLine1: yup
        .string()
        .required("Please enter Address")
        .min(2, "Address must be at least 2 characters")
        .max(60, "Address must be at most 20 characters")
        .matches(/^[a-zA-Z0-9\s.,'-]*$/, "Please enter valid Address"),
    addressLine2: yup
        .string(),
    cityId: yup
        .string(),
    stateId: yup
        .string()
        .required("Please enter state"),
    countryId: yup
        .string()
        .required("Please enter country"),
    phone: yup
        .string()
        .required("Please enter mobile")
        // .matches(/^[0-9]*$/, "Phone number is not valid")
        .min(7)
        .max(14),
    postcode: yup
        .string()
        .required("Please enter Zip")
        .matches(/^[0-9a-zA-Z]+$/, "Zip code is not valid")
        .min(3),
    // .max(6),
    comment: yup
        .string()
        .required("Please enter Comment")
        // .matches(/^[a-zA-Z0-9\s.,'-]*$/, "Comment is not valid")
        .min(2)
        .max(300),

    // password: yup
    //     .string()
    //     .required("Password required"),
    // confirm: yup
    //     .string()
    //     .oneOf([yup.ref("password"), null], "Passwords don't match")

});


const CompanySellerForm = () => {

    // const [stateId, setStateId] = useState();
    // const [cityId, setCityId] = useState();

    const getCountry = useSelector(state => state.reducerGetCountry?.getCountryDetails);
    // console.log("getCountry==>", getCountry)

    const stateList = useSelector(state => state.reducerStateList?.stateList);
    // console.log("stateList==>", stateList)

    const cityList = useSelector(state => state.reducerCityList?.cityList);
    // console.log("cityList==>", cityList)

    // const companySellerSignUpForm = useSelector(state => state.reducerSellerSignUpForm?.sellerSignUpForm);
    // console.log("companySellerSignUpForm==>", companySellerSignUpForm)

    const dispatch = useDispatch();


    //=================================>


    const navigate = useNavigate();
    // const [passwordType, setPasswordType] = useState("password");
    // const [con_passwordType, setCon_passwordType] = useState("password");
    // const [country, setCountry] = useState("");
    // const login = useSelector(state => state.login)
    // const [region, setRegion] = useState("");

    // const [statename, setStateName] = useState("");
    const [countryname, setCountryname] = useState("");
    const [numberState, setNumberState] = useState('');
    // const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    const { register, formState: { errors }, handleSubmit, reset } = useForm({
        mode: "companySellerForm",
        resolver: yupResolver(schema),
    });

    // country
    useEffect(() => {
        getCountryListAction(dispatch)
    }, [dispatch])


    const companySellerForm = (data, e) => {
        console.log("dasdasdfs")
        // setIsFormSubmitting(true)
        data.type = "Company"
        // sellerSignUpFormAction(data, navigate, callback => {
        //     setTimeout(() => setIsFormSubmitting(false));
        // })(dispatch)
        sellerSignUpFormAction(dispatch, data)
    };

    const getStateHandler = (e) => {
        let val = e.target.value;
        setCountryname(val)
        // getStateListAction({ countryId: val })(dispatch);

        let idCountry = {
            countryId: val
        }
        getStateListAction(dispatch, idCountry)
    }

    const getCityHandler = (e) => {
        // getCityAction({ countryId: countryname, stateId: e.target.value })(dispatch);
        // setCityId(e.target.value)

        let idState = {
            countryId: countryname,
            stateId: e.target.value
        }
        getCityAction(dispatch, idState)
    }

    const numberChangeHandler = event => {
        if (numberRegex.test(event.target.value) || event.target.value.length == 0) {
            setNumberState(event.target.value);
        }
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
                    <form
                        onSubmit={companySellerForm}
                    >
                        <div className="card inputs-wrapper">
                            <h4>Verification</h4>
                            <div className="row input-block">
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required required">
                                        first name
                                    </label>
                                    <div className={`input-wrap ${errors.firstName ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            placeholder="FirstName"
                                            {...register("firstName")}
                                            maxLength={15}
                                        />
                                    </div>
                                    {errors.firstName && (
                                        <span className="error">
                                            {errors.firstName.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Last name
                                    </label>
                                    <div className={`input-wrap ${errors.lastName ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            name="lastName"
                                            className="form-control"
                                            placeholder="LastName"
                                            {...register("lastName")}
                                            maxLength={15}
                                        />
                                    </div>
                                    {errors.lastName && (
                                        <span className="error">
                                            {errors.lastName.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Email address
                                    </label>
                                    <div className={`input-wrap ${errors.email ? 'has-error' : ''}`}>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="example@aladyyn.pro"
                                            {...register("email")}
                                        />
                                    </div>
                                    {errors.email && (
                                        <span className="error">
                                            {errors.email.message}
                                        </span>
                                    )}
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
                                    <div className={`input-wrap ${errors.businessName ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="businessName"
                                            placeholder="Business Name"
                                            {...register("businessName")}
                                        />
                                    </div>
                                    {errors.businessName && (
                                        <span className="error">
                                            {errors.businessName.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Primary Contact Person
                                    </label>
                                    <div className={`input-wrap ${errors.primaryContactPerson ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            name="primaryContactPerson"
                                            className="form-control"
                                            placeholder="Primary Person"
                                            {...register("primaryContactPerson")}
                                        />
                                    </div>
                                    {errors.primaryContactPerson && (
                                        <span className="error">
                                            {errors.primaryContactPerson.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label required">
                                        Company Registration Number
                                    </label>
                                    <div className={`input-wrap ${errors.companyRegistrationNumber ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            name="companyRegistrationNumber"
                                            className="form-control"
                                            placeholder="Company Registration Number"
                                            {...register("companyRegistrationNumber")}
                                        />
                                    </div>
                                    {errors.companyRegistrationNumber && (
                                        <span className="error">
                                            {errors.companyRegistrationNumber.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-4 input-wrapper">
                                    <label className="input-label">
                                        VAT Number
                                        <span className="text-lowercase">
                                            (if applicable)
                                        </span>
                                    </label>
                                    <div className={`input-wrap ${errors.vat ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            name="vat"
                                            className="form-control"
                                            placeholder="Vat number"
                                            {...register("vat")}
                                        />
                                    </div>
                                    {errors.vat && (
                                        <span className="error">
                                            {errors.vat.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <div className="input-wrapper required">
                                        <label className="input-label required">
                                            Phone Number
                                        </label>
                                        <div className={`input-wrap ${errors.phone ? 'has-error' : ''}`}>
                                            <input
                                                type="number"
                                                // name="phone"
                                                className="form-control"
                                                placeholder="Mobile"
                                                maxLength={14}
                                                {...register("phone")}
                                                value={numberState}
                                                onChange={numberChangeHandler}
                                            />
                                        </div>
                                        {errors.phone && (
                                            <span className="error">
                                                {errors.phone.message}
                                            </span>
                                        )}
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
                                    <div className={`input-wrap ${errors.addressLine1 ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="addressLine1"
                                            placeholder="Address"
                                            {...register("addressLine1")}
                                        />
                                        <span className="input-info">
                                            Building number and Street
                                        </span>
                                    </div>
                                    {errors.addressLine1 && (
                                        <span className="error">
                                            {errors.addressLine1.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 input-wrapper">
                                    <label className="input-label">address line 2</label>
                                    <div className={`input-wrap ${errors.addressLine2 ? 'has-error' : ''}`}>
                                        <input
                                            type="text"
                                            name="addressLine2"
                                            className="form-control"
                                            placeholder="Address"
                                            {...register("addressLine2")}
                                        />
                                        <span className="input-info">
                                            Room/Block/Apartments
                                        </span>
                                    </div>
                                    {errors.addressLine2 && (
                                        <span className="error">
                                            {errors.addressLine2.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label">Country</label>
                                    <div className={`input-wrap ${errors.countryId ? 'has-error' : ''}`}>
                                        <select
                                            name="countryId"
                                            className="form-control"
                                            id="countryId"
                                            {...register("countryId")}
                                            // onChange={changeCountry}
                                            onBlur={getStateHandler}

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
                                    {errors.countryId && (
                                        <span className="error">
                                            {errors.countryId.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 input-wrapper required">
                                    <label className="input-label required">
                                        State / Region
                                    </label>
                                    <div className="input-wrap">
                                        <select
                                            className="form-control"
                                            name="stateId"
                                            {...register("stateId")}
                                            // onChange={stateChange}
                                            onClick={getCityHandler}
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
                                    {errors.stateId && (
                                        <span className="error">
                                            {errors.stateId.message}
                                        </span>
                                    )}
                                </div>
                                <div className="col-md-6 input-wrapper">
                                    <label className="input-label">City</label>
                                    <div className="input-wrap">
                                        <select
                                            className="form-control"
                                            name="cityId"
                                            {...register("cityId")}

                                        >
                                            <option value={""}>Please select city</option>
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
                                    {errors.cityId && (
                                        <span className="error">
                                            {errors.cityId.message}
                                        </span>
                                    )}
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
                                            {...register("postcode")}
                                        />
                                    </div>
                                    {errors.postcode && (
                                        <span className="error">
                                            {errors.postcode.message}
                                        </span>
                                    )}
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
                                            {...register("comment")}
                                        ></textarea>
                                    </div>
                                    <label className="comment-info input-label required input-info position-static">
                                        Comment should not exceed 300 characters.
                                    </label>
                                    {errors.comment && (
                                        <span className="error">
                                            {errors.comment.message}
                                        </span>
                                    )}
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
                            <input
                                className="btn"
                                type="submit"
                                value="submit"
                            // disabled={isFormSubmitting ? true : false}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CompanySellerForm