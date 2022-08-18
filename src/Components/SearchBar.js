import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const SearchBar = () => {

    const searchData = useSelector(state => state.reducerSearchGetService?.serachList);
    // console.log("searchData==>", searchData)

    return (
        <>
            {
                searchData ? searchData.map((items, index) => {
                    return (
                        <div className="custom-scroll"
                            key={index}
                            style={{
                                maxHeight: "400px",
                                backgroundColor: "rgb(255, 255, 255)",
                                border: "1px solid rgb(211, 211, 211)",
                                width: "100%",
                                position: "absolute",
                                zIndex: "9999",
                                display: "block",
                                top: "100%",
                                left: "0",
                                overflow: "auto"
                            }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                padding: "10px",
                                cursor: "pointer"
                            }}>
                                <img
                                    src={items.path + items.serviceCover}
                                    style={{
                                        height: "40px",
                                        width: "40px"
                                    }} />

                                <div style={{ marginLeft: "20px" }} >
                                    <div style={{
                                        fontSize: "1.2rem",
                                        color: "rgb(19, 23, 28)",
                                        fontWeight: "700"
                                    }}>New service for beauty</div>
                                    <Link to={`/service-detail/${items.serviceId}/${items.sellerData[0].firstName}`}>
                                        <div>
                                            <div>Category : <strong
                                                style={{
                                                    color: "rgb(102, 102, 102)"
                                                }}>{items.categoryName}</strong></div>
                                            <div>Sub Category : <strong
                                                style={{ color: "rgb(102, 102, 102)" }}>{items.subcategoryName}</strong>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                }) : null
            }
        </>
    )
}

export default SearchBar