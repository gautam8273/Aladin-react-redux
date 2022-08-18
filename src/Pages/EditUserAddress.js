import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { userAddressListAction } from '../Store/Actions/userAddressListAction';
import { getCityAction, getCountryListAction, getStateListAction } from '../Store/Actions/action';
import { singleUserAddressDetailsAction } from '../Store/Actions/singleUserAddressDetailsAction';
import { editUserAddressAction } from '../Store/Actions/editUserAddressAction';


// const schema = yup.object().shape({
//     addressLine1: yup
//         .string()
//         .required("Please enter First Name")
//         .min(2, "First name must be at least 2 characters")
//         .max(20, "First name must be at most 20 characters")
//         .matches(/^[A-Za-z ]+$/i, "Please enter valid first name"),
//     addressLine2: yup
//         .string()
//         .required("Please enter Last Name")
//         .min(2, "Last name must be at least 2 characters")
//         .max(20, "Last name must be at most 20 characters")
//         .matches(/^[A-Za-z ]+$/i, "Please enter valid last name"),
//     countryName: yup.string(),
//     postcode: yup.string(),
// });

const schema = yup.object().shape({
    addressLine1: yup
        .string()
        .required("Please enter Address")
        .min(2, "Address must be at least 2 characters")
        .max(40, "Address must be at most 20 characters")
        .matches(/^[a-zA-Z0-9\s.,'-]*$/, "Please enter valid Address"),
    addressLine2: yup.string(),
    cityId: yup.string(),
    stateId: yup.string(),
    countryId: yup.string(),
});


const EditUserAddress = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { userAddressId } = useParams();
    // console.log("userAddressId==>", userAddressId)

    const [countryId, setCountryId] = useState();
    const [stateName, setStateName] = useState();
    const [CityName, setCityName] = useState();
    const [addrline1, setAddrline1] = useState();
    const [addrline2, setAddrline2] = useState();
    const [postCode, setPostCode] = useState();
    const [addrType, setaddrType] = useState();


    // const listAddressUsers = useSelector(state => state.reducerListAddressOfUsers?.listOfAddressOfUsers);
    // console.log("listAddressUsers==>", listAddressUsers);

    const singleUserAddress = useSelector(state => state.reducerSingleUserAddressdetails?.singleUserAddressData);
    console.log("singleUserAddress==>", singleUserAddress)

    // // list of user of address
    useEffect(() => {
        userAddressListAction(dispatch)
    }, [dispatch])

    const NameCountry = useSelector(state => state.reducerGetCountry?.getCountryDetails);
    // console.log("NameCountry==>", NameCountry)
    const stateListName = useSelector(state => state.reducerStateList?.stateList);
    // console.log("stateListName==>", stateListName)
    const cityListName = useSelector(state => state.reducerCityList?.cityList);
    // console.log("cityListName==>", cityListName)
    const userAddress = useSelector(state => state.reducerUserAddressAdd?.userAddress);
    // console.log("userAddress==>", userAddress)

    const editUserAddress = useSelector(state => state.reducerEditUserAddress?.editUserAddressData);
    console.log("editUserAddress==>", editUserAddress)

    // const [countryId, setCountryId] = useState();
    // const [stateId, setStateId] = useState();
    // const [cityId, setCityId] = useState();


    // for country name
    useEffect(() => {

        getCountryListAction(dispatch)

    }, [dispatch])



    //for state name
    const countryChange = (e) => {
        setCountryId(e.target.value);
        const reqcountryId = {
            countryId: e.target.value,
        };
        getStateListAction(dispatch, reqcountryId)
    }

    // for city name
    const stateChange = (e) => {
        setStateName(e.target.value);
        const reqCountryState = {
            countryId: countryId,
            stateId: e.target.value,
        };
        getCityAction(dispatch, reqCountryState)
    }


    // for city name
    const cityChange = (e) => {
        setCityName(e.target.value);
    };

    //for single user address details api
    useEffect(() => {
        if (userAddressId) {
            let reqAddress = {
                addressId: userAddressId
            }
            singleUserAddressDetailsAction(dispatch, reqAddress)
        }
    }, [dispatch])




    useEffect(() => {
        if (userAddressId) {
            setAddrline1(singleUserAddress?.addressLine1);
            setAddrline2(singleUserAddress?.addressLine2);
            setPostCode(singleUserAddress?.postcode);
            setCountryId(singleUserAddress?.countryId);
            setStateName(singleUserAddress?.stateId);
            setCityName(singleUserAddress?.cityId);
            setaddrType(singleUserAddress?.addressType);
            if (singleUserAddress?.countryId !== undefined) {
                getStateListAction(dispatch, { countryId: singleUserAddress?.countryId });
                getCityAction(dispatch, {
                    countryId: singleUserAddress?.countryId,
                    stateId: singleUserAddress?.stateId,
                });
            }
        }
    }, [singleUserAddress]);

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        reset,
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const editSubmitAddress = (e) => {
        e.preventDefault();
        console.log(e.target.addressType.value)
        const edituserAddressData = {
            addressId: userAddressId,
            addressLine1: e.target.addressLine1.value,
            addressLine2: e.target.addressLine2.value,
            addressType: e.target.addressType.value,
            cityId: e.target.cityId.value,
            countryId: e.target.countryId.value,
            postcode: e.target.postcode.value,
            stateId: e.target.stateId.value,
        };

        editUserAddressAction(dispatch, edituserAddressData, navigate);
    };


    // const stateHandler = (e) => {
    //     setCountryname(e.target.value)
    // }

    // useEffect(() => {
    //     if (listAddressUsers?.length > 0) {

    //         setAddr1("addressLine1", listAddressUsers[0].addressLine1);
    //         setAddr2("addressLine2", listAddressUsers[0].addressLine2);
    //         // setValue("countryId", listAddressUsers[0].countryId);
    //         // setNamecountry(listAddressUsers[0].countryId)
    //         // setValue("phone", listAddressUsers[0].stateName);
    //         // setValue("phone", listAddressUsers[0].cityName);
    //         setValue("postcode", listAddressUsers[0].postcode);

    //     }
    // }, [listAddressUsers]);

    // const editSubmitAddress = (data, e) => {
    // data.image = fileAttach;
    // console.log("data==>", data);
    // let reqpayload = data;
    // const reqpayload = {
    //   firstName: e.target.firstName.value,
    //   lastName: e.target.lastName.value,
    //   email: e.target.email.value,
    //   phone: e.target.phone.value,
    //   image: e.target.image.value,
    // };

    // userEditProfileAction(dispatch, reqpayload);
    // };

    return (

        <>
            <section className="my-addresses add">

                <ToastContainer
                    position='top-right'
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                />
                <form
                    onSubmit={editSubmitAddress}
                >
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a role="button" tabIndex="0">
                                        User Account
                                    </a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a role="button" tabIndex="0">
                                        My Adresses
                                    </a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Add Adresses
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
                                                // name="group1"
                                                type="radio"
                                                id="credit-input"
                                                className="form-check-input"
                                                name="addressType"
                                                value="Home Address"
                                            // defaultChecked={listAddressUsers?.addressType === 'Home Address' ? true : false}
                                            // onChange={(e) => changeAddressType(e, 'Home Address')}
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
                                            // defaultChecked={listAddressUsers?.addressType === 'Office Address' ? true : false}
                                            // onChange={(e) => changeAddressType(e, 'Office Address')}
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
                                            // defaultChecked={listAddressUsers?.addressType === 'Other' ? true : false}
                                            // onChange={(e) => changeAddressType(e, 'Other')}
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
                                                // {...register("addressLine1")}
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
                                                // {...register("addressLine2")}
                                                onChange={(e) => setAddrline2(e.target.value)}
                                                value={addrline2}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 input-wrapper required">
                                        <label className="input-label">Country</label>
                                        <select
                                            className="form-control"
                                            // onChange={(e) => stateHandler(e)}
                                            // value={countryname}
                                            name="countryId"
                                            onChange={countryChange}
                                            value={countryId}
                                        >
                                            <option value=""
                                                name="countryId"
                                            // {...register("countryId")}
                                            >
                                                {/* Select country */}
                                            </option>
                                            {NameCountry &&
                                                NameCountry.map((item, index) => {
                                                    return (
                                                        <option

                                                            value={item._id}
                                                            key={index}>
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
                                            // onBlur={stateChange}
                                            name="stateId"
                                            onChange={stateChange}
                                            value={stateName}
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
                                            name="cityId"
                                            onChange={cityChange}
                                            value={CityName}
                                        >
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
                                                // name="postcode"
                                                // {...register("postcode")}
                                                // onChange={(e) => setPostalCode(e.target.value)}
                                                // value={postalCode}
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
            </section>
        </>
    )
}

export default EditUserAddress