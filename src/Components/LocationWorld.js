import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLocationAction } from '../Store/Actions/action';

const LocationWorld = () => {

    const dispatch = useDispatch();


    const [locate, setLocate] = useState("");

    const locationDetails = useSelector(state => state.reducerGetLocation?.getLocation);
    console.log("locationDetails==>", locationDetails)


    // for location
    const locationFind = (e) => {
        let val = e.target.value;
        setLocate(val)
        getLocationAction(dispatch, val)
    }
    const locationSelect = (item) => {
        setLocate(item)
    }


    return (
        <>
            <div className="input-wrap">
                <label className="input-label">Location</label>
                <div className="wrap-input contains-btn contains-search-input">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="input search text"
                        value={locate}
                        onChange={locationFind}
                    />
                    <div className="btn-wrap">
                        <button type="button">
                            <i className="icon-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="searched-items">
                <ul className="custom-scroll">
                    {
                        locationDetails
                            ? locationDetails.map((item, index) => {
                                return (
                                    <li key={index} onClick={() => locationSelect(item)} >{item}</li>
                                )
                            })
                            : null
                    }
                    {/* <li>Indaparapeo, Michoacan, Mexico</li> */}
                </ul>
            </div>
        </>
    )
}

export default LocationWorld