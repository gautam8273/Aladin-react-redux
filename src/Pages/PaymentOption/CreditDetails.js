import React, { useState } from 'react'

const CreditDetails = () => {

    const [ccNumber, setCcNumber] = useState("");

    const formatAndSetCcNumber = e => {
        const inputVal = e.target.value.replace(/ /g, ""); //remove all the empty spaces in the input
        let inputNumbersOnly = inputVal.replace(/\D/g, ""); // Get only digits

        if (inputNumbersOnly.length > 16) {
            //If entered value has a length greater than 16 then take only the first 16 digits
            inputNumbersOnly = inputNumbersOnly.substr(0, 16);
        }

        // Get nd array of 4 digits per an element EX: ["4242", "4242", ...]
        const splits = inputNumbersOnly.match(/.{1,4}/g);

        let spacedNumber = "";
        if (splits) {
            spacedNumber = splits.join(" "); // Join all the splits with an empty space
        }

        setCcNumber(spacedNumber); // Set the new CC number
    };

    // useEffect(() => {
    //     if (cardNumber.length === 4)
    //         setcardNumber(cardNumber + " ")
    //     else if (cardNumber.length === 9) {
    //         setcardNumber(cardNumber + " ")
    //     } else if (cardNumber.length === 14) {
    //         setcardNumber(cardNumber + " ")
    //     }
    // }, [cardNumber]);

    return (
        <>
            <form>
                <div className="card-inputs">
                    <div className="row">
                        <div className="col-md-8 col-lg-5 col-xl-3 fix-width input-block"><label>Card Number</label>
                            <div className="input-wrap  "><input
                                type="text"
                                className="form-control"
                                placeholder="XXXX XXXX XXXX XXXX"
                                name="cardNumber" maxLength="19"
                                value={ccNumber}
                                onChange={formatAndSetCcNumber}
                            /></div>
                        </div>
                        <div className="col-8 col-md-2 col-lg-2 col-xl-2 fix-width input-block">
                            <div className="input-wrap "><label>Month/Year</label><input type="text" maxLength="5"
                                className="form-control" placeholder="mm/yy" /></div>
                        </div>
                        <div className="col-4 col-md-2 col-lg-2 col-xl-2 fix-width input-block">
                            <div className="input-wrap "><label>CVV</label><input type="number" maxLength="4"
                                className="form-control" placeholder="***" /></div>
                        </div>
                    </div>
                </div>
                <div className="btn-wrap"><input className="secondary-btn" type="reset" value="cancel" /><input className="btn"
                    type="submit" value="save" /></div>
            </form>
        </>
    )
}

export default CreditDetails