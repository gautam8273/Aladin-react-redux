import React from 'react'
import Select from "react-select";
import BestSellercard from '../../Components/Cards/BestSellercard'

const BestSeller = () => {

    const optionShorts = [
        { value: "", label: "Select sort" },
        { value: "1", label: "Price: Low to High" },
        { value: "-1", label: "Price: High to Low" },
    ];

    return (
        <>
            <section className="sub-category-block best-seller">
                <div className="Toastify"></div>
                <div className="container">
                    <nav aria-label="breadcrumb" className="w-100">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Best Sellers</li>
                        </ol>
                    </nav>
                    <div className="right-block">
                        <div className="head-wrap">
                            <h1>Best Sellers</h1>
                            <div className="sort-select"><label>Sort by</label>
                                <div className="sort-wrap">

                                    <Select
                                        // defaultValue={options[1]}
                                        classNamePrefix="react-select"
                                        className="react-select-container"
                                        options={optionShorts}
                                    // onChange={(e) => sorting("sorting", e)}
                                    />



                                </div>
                            </div>
                        </div>

                        <BestSellercard />

                        <nav className="pagination-wrap" aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item previous disabled"><a className="page-link"
                                    // href="javascript:void(0)" 
                                    tabIndex="-1"
                                    disabled=""><i className="icon-arrow"></i></a></li>
                                <li className="page-item active" aria-current="page"><a className="page-link"
                                // href="javascript:void(0)"
                                >1</a></li>
                                <li className="page-item" aria-current="page"><a className="page-link"
                                // href="javascript:void(0)"
                                >2</a></li>
                                <li className="page-item "><a className="page-link"
                                // href="javascript:void(0)"
                                ><i className="icon-arrow"></i></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BestSeller