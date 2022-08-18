import React, { useState } from 'react'
import AccountNumberDetails from './AccountNumberDetails'
import CreditDetails from './CreditDetails'

const BillingMethod = () => {

    const [creditPage, setCreditPage] = useState(true);
    const [accountDetailsPage, setAccountDetailsPage] = useState(false)

    const creditCardButton = () => {
        setAccountDetailsPage(false)
        setCreditPage(true)
    }

    const accountDetailsButton = () => {
        setAccountDetailsPage(true)
        setCreditPage(false)
    }

    return (
        <>
            <section className="billing-method edit">
                <div className="container">
                    <div className="Toastify"></div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/user/dashboard">User account</a></li>
                            <li className="breadcrumb-item"><a href="/user/billing-method">Billing Method</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Edit Billing Method</li>
                        </ol>
                    </nav>
                    <div className="section-header">
                        <h1>Billing Method</h1>
                    </div>
                    <div className="card"><label className="input-label heading-label">Select Billing Method</label>
                        <div className="input-wrap radio-group">
                            <div className="radio-btn form-check form-check-inline">
                                <input name="group1" type="radio" id="credit-input"
                                    className="form-check-input"
                                    // checked=""
                                    onChange={creditCardButton}
                                />
                                <label title="" htmlFor="credit-input" className="form-check-label">Credit Card</label>
                            </div>
                            <div className="radio-btn form-check form-check-inline">
                                <input name="group1" type="radio" id="bank-input"
                                    className="form-check-input"
                                    onChange={accountDetailsButton}
                                />
                                <label title="" htmlFor="bank-input" className="form-check-label">Bank Account
                                    Number</label>
                            </div>
                        </div>
                        {creditPage && <CreditDetails />}

                        {accountDetailsPage && <AccountNumberDetails />}


                    </div>
                </div>
            </section>
        </>
    )
}

export default BillingMethod