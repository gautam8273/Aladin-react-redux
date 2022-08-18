import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb } from 'react-bootstrap';
import { yupResolver } from "@hookform/resolvers/yup";
import { userEditProfileAction } from '../Store/Actions/action';

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
    phone: yup.string().required("Please enter mobile").min(7).max(14),
    email: yup
        .string()
        .required("Please enter your email address")
        .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            "Please use the correct email"
        ),
});

const EditUserprofile = () => {

    const dispatch = useDispatch();
    const userdetail = useSelector(state => state.reducerUserProfileDetails?.userProfileDetails);
    // console.log("userdetail==>", userdetail)

    const EditUserProfile = useSelector(state => state.reducerEditUserProfileDetails?.editUserProfile)
    // console.log("EditUserProfile==>", EditUserProfile)


    const [image, setImage] = useState("");
    let attachmentName = useRef(null);
    const [img, setImg] = useState("");
    const [fileAttach, setFileAttach] = useState(null);
    const handlechange = (e) => {
        // console.log(e.target.files);
        setImage(e.target.files[0]);
    };

    // console.log(userdetail);
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

    const imgHandler = (e) => {
        setFileAttach(e.target.files[0]);
        let src_ = URL.createObjectURL(e.target.files[0]);
        setImg(src_);
        // console.log("newwwwww", e.target.files);
    };

    useEffect(() => {
        if (userdetail?.length > 0) {
            setValue("firstName", userdetail[0].firstName);
            setValue("lastName", userdetail[0].lastName);
            setValue("email", userdetail[0].email);
            setValue("phone", userdetail[0].phone);
            setImg(
                userdetail[0]?.image ? userdetail[0].path + userdetail[0].image : ""
            );
        }
    }, [userdetail]);


    const submit = (data, e) => {
        data.image = fileAttach;
        // console.log("data==>", data);
        let reqpayload = data;
        // const reqpayload = {
        //   firstName: e.target.firstName.value,
        //   lastName: e.target.lastName.value,
        //   email: e.target.email.value,
        //   phone: e.target.phone.value,
        //   image: e.target.image.value,
        // };

        userEditProfileAction(dispatch, reqpayload);
    };

    return (
        <>
            <section className="user-profile edit">
                <div className="">
                    <div className="Toastify"></div>
                </div>
                <div className="container">
                    <Breadcrumb>
                        <Breadcrumb.Item>User Account</Breadcrumb.Item>
                        <Breadcrumb.Item>User Profile</Breadcrumb.Item>
                        <Breadcrumb.Item active>Edit User Profile</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1>Edit User Profile</h1>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="account-info">
                            <div className="card account-card inputs-wrapper">
                                <div className="account-heading">Account Information</div>
                                <div className="row input-block">
                                    <div className="col-md-6 input-wrapper required">
                                        <label className="input-label">first name</label>
                                        <div className="input-wrap ">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="firstName"
                                                maxLength="15"
                                                placeholder="First Name"
                                                {...register("firstName")}
                                            />
                                            {/* {console.log(
                                                userdetail ? userdetail[0].firstName : "null"
                                            )} */}
                                            <span className="error">{errors.firstName?.message}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6 input-wrapper required">
                                        <label className="input-label">last name</label>
                                        <div className="input-wrap ">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="lastName"
                                                maxLength="15"
                                                placeholder="Last Name"
                                                {...register("lastName")}
                                            />
                                            <span className="error">{errors.lastName?.message}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-md-0 input-wrapper required">
                                        <label className="input-label">email</label>
                                        <div className="input-wrap ">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="email"
                                                placeholder="Email"
                                                {...register("email")}
                                            />
                                            <span className="error">{errors.email?.message}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-md-0 input-wrapper required">
                                        <div className="input-wrapper required mb-0">
                                            <label htmlFor="user-id">Mobile Number</label>
                                            <div className="input-wrap ">
                                                <input
                                                    type="number"
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder="Mob"
                                                    {...register("phone")}
                                                />
                                                <span className="error">{errors.phone?.message}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card account-card inputs-wrapper">
                                <div className="account-heading">Basic Information</div>
                                <div className="row input-block">
                                    <div className="input-wrapper mb-0 required img-input-fix has-input-file"><label
                                        className="mb-2">Profile Image</label>
                                        <div className="row input-block">
                                            <div className="col-lg-8 mb-0 input-wrapper">
                                                <div className="img-input-wrapper">
                                                    <div className="img-input"><i className="icon-plus"></i>Upload
                                                        <input
                                                            name="image"
                                                            type="file"
                                                            accept="image/*"
                                                            ref={attachmentName}
                                                            onChange={imgHandler}
                                                        />
                                                    </div>
                                                    <span className="img-info">
                                                        Upload profile picture
                                                    </span>{" "}
                                                    {/* <span className="img-info">Upload profile
                                                        picture</span> */}

                                                    {img !== "" ? (
                                                        <div className="img-thumbnail-wrapper attachment-name image">
                                                            <img src={img} />
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="btns-wrap"><button className="secondary-btn" type="button">Cancel</button>
                            <input className="btn"
                                type="submit"
                                value="submit"
                            />
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default EditUserprofile