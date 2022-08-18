import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userBillingViewAction } from 'store/action/userBillingViewAction';
import { useDispatch, useSelector } from 'react-redux';
import { userBillingAction } from 'store/action/userBillingAction';



// CARD
let ccNumberPattern = /^\d{0,16}$/g;
let ccNumberSeparator = " ";
let ccNumberInputOldValue;
let ccNumberInputOldCursor;

// EXPIRY DATE
let ccExpiryPattern = /^\d{0,4}$/g;
let ccExpirySeparator = "/";
let ccExpiryInputOldValue;
let ccExpiryInputOldCursor;

const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/

// CVC
let ccCVCPattern = /^\d{0,3}$/g;




const month = new Date().getMonth().toString();
const year = new Date().getFullYear().toString().slice(-2);



const EditCardDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cardInputRef = useRef();
    const expiryInputRef = useRef();
    const cvcInputRef = useRef();
    const [cardNumberErrorState, setCardNumberErrorState] = useState('');
    const [expiryDateErrorState, setExpiryDateErrorState] = useState('');
    const [cvvErrorState, setCvvErrorState] = useState('');
    const getBillingInfo = useSelector((state) => state.userBillingData);
    const [isError, setIsError] = useState(false);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);

    let isSubmited = false;

    useEffect(() => {
        let cardData = getBillingInfo?.data?.filter(item => item.billingType === 'Credit Card') ? getBillingInfo?.data?.filter(item => item.billingType === 'Credit Card') : [];
        if (cardData.length > 0) {
            setTimeout(() => {
                cardInputRef.current.value = cardData[0]?.cardNumber;
                expiryInputRef.current.value = cardData[0]?.monthyear;
                cvcInputRef.current.value = cardData[0]?.cvv;
            }, 1000)
        }
    }, [getBillingInfo])


    // Error handle--- for card number
    const cardNumberErrorHandler = (data, isFormSubmitted, callback) => {
        let flag;
        if (data.length === 0 && isFormSubmitted) {
            setCardNumberErrorState("Please enter card number");
            flag = false;
        } else if (data.length < 19 && isFormSubmitted) {
            setCardNumberErrorState("Card number must be atleast 16 characters");
            flag = false;
        } else if (data.length === 19) {
            setCardNumberErrorState("");
            flag = true;
        }
        callback(flag);
    }


    // Error handle---  for month & date
    const expiryDateErrorHandler = (data, isFormSubmitted, callback) => {
        let flag;
        if (data.length === 0 && isFormSubmitted) {
            setExpiryDateErrorState("Please enter expiry date");
            flag = false;
        } else if (data.length < 5 && isFormSubmitted) {
            setExpiryDateErrorState("Enter correct expiry date");
            flag = false;
        } else if (data.length === 5) {
            if ((!expiryRegex.test(data)) && isFormSubmitted) {
                setExpiryDateErrorState("Enter correct expiry date");
                flag = false;
            } else {
                setExpiryDateErrorState("");
                flag = true;
            }

            const enteredDate = data;
            const enteredMonth = enteredDate.slice(0, 2);
            const enteredYear = enteredDate.slice(3, 5);

            if (+enteredYear < +year) {
                setExpiryDateErrorState("Enter year correct year");
                flag = false;
            } else if ((+enteredYear === +year) && (+enteredMonth < +month)) {
                setExpiryDateErrorState("Enter year correct month");
                flag = false;
            }
        }
        callback(flag);
    }


    // Error handle--- for CVV number
    const cvvErrorHandler = (data, isFormSubmitted, callback) => {
        let flag;
        if (data.length === 0 && isFormSubmitted) {
            setCvvErrorState("Please enter cvv");
            flag = false;
        } else if (data.length < 3 && isFormSubmitted) {
            setCvvErrorState("Card number must be atleast 3 characters");
            flag = false;
        } else if (data.length === 3) {
            setCvvErrorState("");
            flag = true;
        }
        callback(flag)
    }



    const mask = (value, limit, separator) => {
        let output = [];
        for (let i = 0; i < value.length; i++) {
            if (i !== 0 && i % limit === 0) {
                output.push(separator);
            }

            output.push(value[i]);
        }

        return output.join("");
    }



    const unmask = (value) => value.replace(/[^\d]/g, '');
    let checkSeparator = (position, interval) => Math.floor(position / (interval + 1));

    // key down-- for card number
    let cardNumberKeyDownHandler = (e) => {
        let el = e.target;
        ccNumberInputOldValue = el.value;
        ccNumberInputOldCursor = el.selectionEnd;
    };



    // for card number
    const cardNumberChangeHandler = (e) => {

        let el = e.target,
            newValue = unmask(el.value),
            newCursorPosition;

        if (newValue.match(ccNumberPattern)) {
            newValue = mask(newValue, 4, ccNumberSeparator);

            newCursorPosition =
                ccNumberInputOldCursor - checkSeparator(ccNumberInputOldCursor, 4) +
                checkSeparator(ccNumberInputOldCursor + (newValue.length - ccNumberInputOldValue.length), 4) +
                (unmask(newValue).length - unmask(ccNumberInputOldValue).length);

            el.value = (newValue !== "") ? newValue : "";
        } else {
            el.value = ccNumberInputOldValue;
            newCursorPosition = ccNumberInputOldCursor;
        }

        el.setSelectionRange(newCursorPosition, newCursorPosition);
        cardNumberErrorHandler(e.target.value, isSubmited, () => { });
    }


    // key down-- for month & date
    const expiryDateKeyDownHandler = (e) => {
        let el = e.target;
        ccExpiryInputOldValue = el.value;
        ccExpiryInputOldCursor = el.selectionEnd;
    }

    // for month & date
    const expiryDateChangeHandler = (e) => {
        let el = e.target,
            newValue = el.value;

        newValue = unmask(newValue);
        if (newValue.match(ccExpiryPattern)) {
            newValue = mask(newValue, 2, ccExpirySeparator);
            el.value = newValue;
        } else {
            el.value = ccExpiryInputOldValue;
        }
        expiryDateErrorHandler(e.target.value, isSubmited, () => { });

    };


    // for CVV number
    const cvvChangeHandler = (event) => {
        cvvErrorHandler(event.target.value, isSubmited, () => { });
    }





    useEffect(() => {
        userBillingViewAction()(dispatch);
    }, [dispatch]);

    const changeHandler = () => {
        navigate("/user/billing-method");
    };


    // for submit the form
    const submitHandler = (event) => {
        event.preventDefault();
        isSubmited = true;

        const cardNumber = cardInputRef?.current?.value;
        const expiryDate = expiryInputRef?.current?.value;
        const cvv = cvcInputRef?.current?.value;

        let cardError, expiryError, cvvError;
        cardNumberErrorHandler(cardNumber, isSubmited, (err) => { cardError = err });
        expiryDateErrorHandler(expiryDate, isSubmited, (err) => { expiryError = err });
        cvvErrorHandler(cvv, isSubmited, (err) => { cvvError = err });

        const payload = { cardNumber, monthyear: expiryDate, cvv, billingType: 'Credit Card' }
        if ((cardError) && (expiryError) && (cvvError)) {
            setIsFormSubmitting(true);
            userBillingAction(payload, () => {
                setTimeout(() => setIsFormSubmitting(false), 3000);
            })(dispatch);
        }
    };

    // console.log(cardNumber);

    return (
        <form onSubmit={submitHandler}>
            <div className="card-inputs">
                <div className="row">
                    <div className="col-md-8 col-lg-5 col-xl-3 fix-width input-block">
                        <label>Card Number</label>
                        <div className={`input-wrap ${cardNumberErrorState.length > 0 ? 'has-error' : ''} `} >
                            <input type="text"
                                className="form-control"
                                placeholder="XXXX XXXX XXXX XXXX"
                                name='cardNumber'
                                onChange={cardNumberChangeHandler}
                                onKeyDown={cardNumberKeyDownHandler}
                                ref={cardInputRef}
                                maxLength="19"
                            />
                            {cardNumberErrorState.length > 0 && <span className="error p-0">{cardNumberErrorState}</span>}
                        </div>
                    </div>
                    <div className="col-8 col-md-2 col-lg-2 col-xl-2 fix-width input-block">
                        <div className={`input-wrap ${expiryDateErrorState.length > 0 ? 'has-error' : ''}`}>
                            <label>Month/Year</label>
                            <input
                                type="text"
                                onChange={expiryDateChangeHandler}
                                onKeyDown={expiryDateKeyDownHandler}
                                ref={expiryInputRef} maxLength="5"
                                className="form-control"
                                placeholder="mm/yy"
                            />
                            {expiryDateErrorState.length > 0 && <span className="error p-0">{expiryDateErrorState}</span>}
                        </div>
                    </div>
                    <div className="col-4 col-md-2 col-lg-2 col-xl-2 fix-width input-block">
                        <div className={`input-wrap ${cvvErrorState.length > 0 ? 'has-error' : ''}`} >
                            <label>CVV</label>
                            <input
                                type="number"
                                onChange={cvvChangeHandler}
                                ref={cvcInputRef}
                                maxLength="4"
                                className="form-control"
                                placeholder="***"
                            />
                            {cvvErrorState.length > 0 && <span className="error p-0">{cvvErrorState}</span>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="btn-wrap">
                <input
                    onClick={changeHandler}
                    className="secondary-btn"
                    type="reset"
                    value="cancel"
                />
                <input
                    className="btn"
                    type="submit"
                    value="save"
                    disabled={isFormSubmitting ? true : false} />
            </div>
        </form >

    )
}

export default EditCardDetails