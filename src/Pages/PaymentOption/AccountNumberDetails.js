import React from 'react'

const AccountNumberDetails = () => {
    return (
        <>
            <form>
                <div className="bank-inputs inputs-wrapper">
                    <div className="input-heading">Beneficiary Information</div>
                    <div className="row">
                        <div className="col-md-6 input-wrapper required"><label>Beneficiary Name</label>
                            <div className="input-wrap "><input type="text" className="form-control" name="beneficiaryName"
                                placeholder="Beneficiary Name" /> </div>
                        </div>
                        <div className="col-md-6 input-wrapper required"><label>Beneficiary Account Number / IBAN</label>
                            <div className="input-wrap "><input type="text" className="form-control"
                                name="beneficiaryAccountNumber" placeholder="Beneficiary Account Number / IBAN" />
                            </div>
                        </div>
                        <div className="col-md-6 input-wrapper required"><label className="input-label margin-fix">address line
                            1</label>
                            <div className="input-wrap "><input type="text" className="form-control" name="addressLine1"
                                placeholder="Address line 1" /><span className="input-info">Building number and
                                    Street</span></div>
                        </div>
                        <div className="col-md-6 input-wrapper"><label className="input-label margin-fix">address line 2</label>
                            <div className="input-wrap"><input type="text" name="addressLine2" className="form-control"
                                placeholder="Address line 2" /><span className="input-info">Room/Block/Apartments</span>
                            </div>
                        </div>
                        <div className="col-md-6 input-wrapper required"><label className="input-label">Country</label>
                            <div className="input-wrap"><select name="countryId" className="form-control drop-down"
                                id="countryId">
                                <option value="61c2fb83dc7c0d455ba5e627">Afghanistan</option>
                                SS
                            </select></div>
                        </div>
                        <div className="col-md-6 input-wrapper required"><label className="input-label">State / Region</label>
                            <div className="input-wrap"><select className="form-control drop-down" name="stateId"></select>
                            </div>
                        </div>
                        <div className="col-md-6 input-wrapper"><label className="input-label">City</label>
                            <div className="input-wrap"><select className="form-control drop-down" name="cityId"></select></div>
                        </div>
                        <div className="col-md-6 input-wrapper required"><label className="input-label">ZIP / Postal
                            Code</label>
                            <div className="input-wrap "><input type="number" name="postcode" className="form-control"
                                autocomplete="off" placeholder="ZIP / Postal Code" /></div>
                        </div>
                    </div>
                    <div className="input-heading">Beneficiary Bank Information</div>
                    <div className="row">
                        <div className="col-md-6 input-wrapper required"><label>Beneficiary Bank Name</label>
                            <div className="input-wrap "><input type="text" className="form-control" name="beneficiaryBankName"
                                placeholder="Beneficiary Bank Name" /></div>
                        </div>
                        <div className="col-md-6 input-wrapper"><label>Intermediary Bank</label>
                            <div className="input-wrap "><input type="text" className="form-control" name="intermediaryBank"
                                placeholder="Intermediary Bank" /> </div>
                        </div>
                        <div className="col-md-6 input-wrapper required"><label className="input-label">address line 1</label>
                            <div className="input-wrap "><input type="text" className="form-control" name="bankAddressLine1"
                                placeholder="Address line 1" /><span className="input-info">Building number and
                                    Street</span></div>
                        </div>
                        <div className="col-md-6 input-wrapper"><label className="input-label">address line 2</label>
                            <div className="input-wrap"><input type="text" name="bankAddressLine2" className="form-control"
                                placeholder="Address line 2" /><span className="input-info">Room/Block/Apartments</span>
                            </div>
                        </div>
                        <div className="col-md-6 input-wrapper required"><label className="input-label">Country</label>
                            <div className="input-wrap"><select name="bankCountryId" className="form-control"
                                id="bankCountryId">
                                <option value="61c2fb83dc7c0d455ba5e627">Afghanistan</option>

                            </select></div>
                        </div>
                        <div className="col-md-6 input-wrapper required"><label className="input-label">State / Region</label>
                            <div className="input-wrap"><select className="form-control" name="bankStateId"></select></div>
                        </div>
                        <div className="col-md-6 input-wrapper"><label className="input-label">City</label>
                            <div className="input-wrap"><select className="form-control" name="bankCityId"></select></div>
                        </div>
                        <div className="col-md-6 input-wrapper required"><label className="input-label">ZIP / Postal
                            Code</label>
                            <div className="input-wrap "><input type="number" name="bankPostcode" className="form-control"
                                autocomplete="off" placeholder="ZIP / Postal Code" /></div>
                        </div>
                        <div className="col-md-6 input-wrapper required"><label className="input-label">Swift Code/IFSC</label>
                            <div className="input-wrap "><input type="text" name="swiftCode" className="form-control"
                                autocomplete="off" placeholder="Swift Code" /></div>
                        </div>
                        <div className="col-md-6 input-wrapper"><label className="input-label">Sort Code</label>
                            <div className="input-wrap "><input type="text" name="sortCode" className="form-control"
                                placeholder="Sort Code" /><span className="input-info">for US account holders</span></div>
                        </div>
                    </div>
                </div>
                <div className="btn-wrap"><input className="secondary-btn" type="reset" value="cancel" /><input className="btn"
                    type="submit" value="save" /></div>
            </form>
        </>
    )
}

export default AccountNumberDetails