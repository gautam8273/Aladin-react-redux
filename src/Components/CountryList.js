import React from 'react'
import { useSelector } from 'react-redux'

const CountryList = ({ data }) => {



    const countryList = useSelector(state => state.reducerGetCountry?.getCountryDetails);
    // console.log("countryList===>", countryList)

    const showCountryName = (item) => {
        localStorage.setItem("countryList", JSON.stringify(item));
        data(item);
        window.location.reload(false);
    }

    return (
        <>

            <ul className="custom-select_options custom-scroll">
                {
                    countryList ? countryList.map((item, index) => {
                        return <li style={{ color: "#000" }}
                            className="custom-select_option" key={index}
                            onClick={() => showCountryName(item)}
                        >{item.name}</li>
                    }) : null
                }
            </ul>
        </>
    )
}

export default CountryList;