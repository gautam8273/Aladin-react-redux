import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { customerServiceAction } from '../../Store/Actions/customerServiceAction';
import { ToastContainer } from 'react-toastify';



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

    phone: yup
        .string()
        .required("Please enter mobile")
        .matches(/^[0-9]*$/, "Phone number is not valid")
        .min(8, 'Phone number must be at least 8 characters')
        .max(14, 'Phone number must be at most 8 characters'),

    attachment: yup.string(),

    typeOfIssue: yup.string().required("Please Select issue"),

    comment: yup
        .string()
        .required("Please enter Comment")
        .matches(/^[a-zA-Z0-9\s.,'-]*$/, "Comment is not valid")
        .min(2, 'Comment must be at least 300 characters')
        .max(300, 'Comment must be at most 300 characters'),
});


const CustomerService = () => {

    const navigate = useNavigate();
    let attachmentName = useRef(null);
    const [img, setImg] = useState("");
    const [fileAttach, setFileAttach] = useState(null);
    const dispatch = useDispatch();
    // const [issue, setIssue] = useState({});
    const [numberState, setNumberState] = useState('');
    // const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    const customerService = useSelector(state => state.reducerCustomerService?.customerServiceDetails);
    // console.log("customerService>>>>>", customerService)



    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(schema),
    });

    const issueOptions = [
        { value: "", label: "Please Select issue" },
        { value: "option 1", label: "option 1" },
        { value: "option 2", label: "option 2" },
    ];

    const imgHandler = (e) => {
        setFileAttach(e.target.files[0]);
        let src_ = URL.createObjectURL(e.target.files[0]);
        setImg(src_);
    };



    const onSubmit = (data, e) => {
        // setIsFormSubmitting(true);
        let payload = new FormData();
        payload.append("firstName", data.firstName);
        payload.append("lastName", data.lastName);
        payload.append("comment", data.comment);
        payload.append("email", data.email);
        payload.append("phone", data.phone);
        payload.append("attachment", fileAttach);
        payload.append("typeOfIssue", data.typeOfIssue);
        // customerService(payload, navigate, () => {
        //     setTimeout(() => setIsFormSubmitting(false), 3000);
        // })(dispatch);

        customerServiceAction(dispatch, payload, navigate)
    };

    const handleClick = () => {
        // setShow(!show);
        setTimeout(() => navigate(-1), 100);
    };

    const numberChangeHandler = event => {
        if (numberRegex.test(event.target.value) || event.target.value.length == 0) {
            setNumberState(event.target.value);
        }
    }


    return (
        <>
            <section className="customer-service">
                <ToastContainer
                    position='top-right'
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                />
                <div className="">
                    <div className="Toastify"></div>
                </div>
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a role="button" tabIndex="0">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Customer Service</li>
                        </ol>
                    </nav>
                    <h1>Customer Service</h1>
                    <div className="card">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="inputs-wrapper">
                                <div className="row">
                                    <div className="col-md-6 col-xl-4 input-wrapper required">
                                        <label className="input-label">first name</label>
                                        <div
                                            className={`input-wrap ${errors.firstName ? "has-error" : ""
                                                }`}
                                        >
                                            <input
                                                type="text"
                                                className="form-control"
                                                // name="firstName"
                                                {...register("firstName")}
                                                maxLength="15"
                                                placeholder="First Name"
                                                onKeyPress={e => {
                                                    if (numberRegex.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                        </div>
                                        {errors.firstName && (
                                            <span className="error">{errors.firstName.message}</span>
                                        )}
                                    </div>

                                    <div className="col-md-6 col-xl-4 input-wrapper required">
                                        <label className="input-label">last name</label>
                                        <div className={`input-wrap ${errors.lastName ? "has-error" : ""
                                            }`}
                                        >
                                            <input
                                                type="text"
                                                className="form-control"
                                                // name="lastName"
                                                {...register("lastName")}
                                                maxLength="15"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                        {errors.lastName && (
                                            <span className="error">{errors.lastName.message}</span>
                                        )}
                                    </div>

                                    <div className="col-md-6 col-xl-4 input-wrapper required">
                                        <label className="input-label">Email
                                            address</label>
                                        <div className={`input-wrap ${errors.email ? "has-error" : ""}`}
                                        >
                                            <input
                                                type="email"
                                                // name="email"
                                                {...register("email")}
                                                className="form-control"
                                                autoComplete="off"
                                                placeholder="example@aladyyn.pro"
                                            />
                                        </div>
                                        {errors.email && (
                                            <span className="error">{errors.email.message}</span>
                                        )}
                                    </div>

                                    <div className="col-md-6 col-xl-4 input-wrapper required">
                                        <label className="input-label">Phone
                                            Number</label>
                                        <div className={`input-wrap ${errors.phone ? "has-error" : ""}`}
                                        >
                                            <input
                                                type="text"
                                                // name="phone"
                                                {...register("phone")}
                                                className="form-control"
                                                placeholder="Phone Number"
                                                maxLength="14"
                                                // value="528841894"
                                                value={numberState}
                                                onChange={numberChangeHandler}
                                            />
                                        </div>
                                        {errors.phone && (
                                            <span className="error">{errors.phone.message}</span>
                                        )}
                                    </div>

                                    <div className="col-md-6 col-xl-4 input-wrapper required">
                                        <label
                                            className="input-label text-transform-initial">
                                            Type of Issue
                                        </label>
                                        <div className={`select-wrap price-select input-wrap ${errors.typeOfIssue ? "has-error" : ""
                                            }`}
                                        >
                                            {/* <select
                                                className="react-select-container form-control drop-down" name="typeOfIssue">
                                                <option value="">Please Select issue</option>
                                                <option value="option 1">option 1</option>
                                                <option value="option 2">option 2</option>
                                            </select> */}
                                            <select
                                                className="react-select-container form-control drop-down"
                                                {...register("typeOfIssue")}
                                            >
                                                {issueOptions.map((item, index) => (
                                                    <option value={item.value} key={index}>
                                                        {item.label}
                                                    </option>
                                                ))}

                                            </select>
                                            {errors.typeOfIssue && (
                                                <span className="error">
                                                    {errors.typeOfIssue.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12 input-wrapper required textarea-info-wrapper textarea-info-wrapper"><label
                                        className="input-label">Comment</label>
                                        <div className={`input-wrap ${errors.comment ? "has-error" : ""
                                            }`}
                                        >
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                // name="comment"
                                                {...register("comment")}
                                                placeholder="Tell us more about the services you provide">
                                            </textarea>
                                            <label
                                                className="textarea-info comment-info input-label required input-info position-static">Comment
                                                should not exceed 300 characters.</label>
                                        </div>
                                        {errors.comment && (
                                            <span className="error">{errors.comment.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-xl-4 input-wrapper has-input-file"><label className="">Upload File</label>
                                        <div className="img-input-wrapper">
                                            <div className="img-input w-100">
                                                <i className="icon-plus"></i>
                                                Upload
                                                <input
                                                    // name="attachment"
                                                    {...register("attachment")}
                                                    type="file"
                                                    accept="image/*"
                                                    ref={attachmentName}
                                                    onChange={imgHandler}
                                                />
                                            </div>
                                        </div>

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
                            <div className="btn-wrap">
                                <button
                                    type="button"
                                    className="btn secondary-btn"
                                    onClick={handleClick}>
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn"
                                // disabled={isFormSubmitting ? true : false}
                                >

                                    submit
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </section>
        </>
    )
}

export default CustomerService