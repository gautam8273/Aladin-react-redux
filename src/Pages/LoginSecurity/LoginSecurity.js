import React, { useRef, useState } from 'react'
import { Api } from '../../../Api/api';
import { endPoints } from '../../../Api/endPoints';
import editProfileAction from "../../../Store/actions/EditUserProfileAction"
import { Breadcrumb } from "react-bootstrap";
import { useDispatch } from 'react-redux';

const EditLogin_Security = () => {
    const inputRef = useRef(null);
    const verifycode1 = useRef(null)
    const verifycode2 = useRef(null)
    const verifycode3 = useRef(null)
    const verifycode4 = useRef(null)
    const dispatch = useDispatch()
    // console.log(verifycode?.current.value)

    const [verificationCode, setVerificationCode] = useState(false)
    const [codeverified, setcodeverified] = useState(false)
    const [alldata, setalldata] = useState({
        password: "",
        re_password: ""
        , phone: ""
    })
    const { password, re_password, phone } = alldata
    const changeHandler = (e) => {
        setalldata({ ...alldata, [e.target.name]: [e.target.value] })
    }
    function handleClick() {
        const reqpayload = {
            "phone": alldata.phone,
            "countryCode": JSON.parse(localStorage.getItem("country"))?.phone
        }
        Api.post(endPoints.USER_SEND_VERIFICATION_CODE, reqpayload).then((res) => {
            if (res.data.status == "success") { setVerificationCode(true) }
            console.log(res)
        }).catch((err) => console.log(err))
        console.log('value 👉️', { phone: inputRef.current.value });
    }
    const handlechange = (element, index) => {
        if (element.value.length == 1) {
            if (element.nextSibling) {
                element.nextSibling.focus()
            }
        } else {
            if (element.value.length == 0) {
                if (element.previousSibling) {
                    element.previousSibling.focus()
                }
            }
        }
        if (verifycode1?.current.value && verifycode2?.current.value && verifycode3?.current.value && verifycode4?.current.value) {
            const reqpayload = { otp: verifycode1?.current.value + verifycode2?.current.value + verifycode3?.current.value + verifycode4?.current.value }
            Api.post(endPoints.USER_VERIFY_VERIFICATION_CODE, reqpayload).then((res) => {
                console.log(res)
                if (res.data.message == "Your phone number is verified successfully!") { setVerificationCode(false) }
            }).catch((err) => console.log(err))
        }
    }
    console.log(alldata)
    const submithandler = (e) => {
        e.preventDefault()
        Api.post(endPoints.USER_PROFILE_EDIT, alldata).then((res) => console.log(res)).catch((err) => console.log(err))
    }
    return (<>

        <section className="login-security edit">
            <div className="">
                <div className="Toastify"></div>
            </div>
            <div className="container">

                <Breadcrumb>
                    <Breadcrumb.Item>User Account </Breadcrumb.Item>
                    <Breadcrumb.Item>Login &amp; Security</Breadcrumb.Item>
                    <Breadcrumb.Item active>Edit Login &amp; Security</Breadcrumb.Item>
                </Breadcrumb>
                <h1>Edit Login &amp; Security</h1>
                <form onSubmit={submithandler}>
                    <div className="account-info edit">
                        <div className="card account-card inputs-wrapper">
                            <div className="info-heading">Account Information</div>
                            <div className="row input-block">
                                <div className="col-md-6 input-wrapper"><label className="input-label">Password</label>
                                    <div className="input-wrap password "><input type="password" name="password" value={password} className="form-control"
                                        placeholder="**********" onChange={changeHandler} />
                                        <div className="toggle-password"><i className="icon-eye "></i></div>
                                    </div>
                                </div>
                                <div className="col-md-6 input-wrapper"><label className="input-label">Confirm Password</label>
                                    <div className="input-wrap password "><input type="password" name="re_password" value={re_password} className="form-control"
                                        placeholder="**********" onChange={changeHandler} />
                                        <div className="toggle-password"><i className="icon-eye "></i></div>
                                    </div>
                                </div>
                            </div>
                            {verificationCode ?
                                <div className="col-md-6 col-lg-4 input-wrapper required">
                                    <label className="input-label text-normal">Verification Code</label>
                                    <div className="input-wrap security-input">
                                        <div className="styles_react-code-input-container__tpiKG undefined" >
                                            <div className="styles_react-code-input__CRulA">
                                                <input type="tel" className="data" pattern="[0-9]*" data-id="0" maxLength="1" ref={verifycode1} onChange={e => handlechange(e.target)} onFocus={e => e.target.select} />
                                                <input type="tel" className="data" pattern="[0-9]*" data-id="1" maxLength="1" ref={verifycode2} onChange={e => handlechange(e.target)} />
                                                <input type="tel" className="data" pattern="[0-9]*" data-id="2" maxLength="1" ref={verifycode3} onChange={e => handlechange(e.target)} />
                                                <input type="tel" className="data" pattern="[0-9]*" data-id="3" maxLength="1" ref={verifycode4} onChange={e => handlechange(e.target)} />
                                            </div>
                                        </div>
                                    </div>
                                </div> : ""}
                            <div className="row input-block">
                                <div className="col-md-6 input-wrapper required"><label className="input-label">Phone Number for
                                    verification</label>
                                    <div className="input-wrap contain-phone ">
                                        <div className="input-wrapper required w-100">
                                            <div className="input-wrap "><input
                                                ref={inputRef} type="text" name="phone" value={phone} className="form-control" placeholder="Phone"
                                                maxLength="14" onChange={changeHandler} />
                                                <div className="btn-wrap" ><button className="otp-btn"
                                                    type="button" onClick={handleClick}>{verificationCode ? "Resend OTP" : "send OTP"} { }</button></div>
                                            </div>
                                            {verificationCode ? <p>We have sent you a four-digit code. Please enter it in the next input to confirm the number</p> : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btns-wrap"><button className="secondary-btn" type="button">Cancel</button><input className="btn" type="submit"
                        value="submit" /></div>
                </form>
            </div>
        </section>

    </>)
}

export default EditLogin_Security