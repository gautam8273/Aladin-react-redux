import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import star from "../assets/images/icon-star-empty.svg"
import starYellow from "../assets/images/icon-star.svg"
import { categoryListAction, getServiceListAction, getSubCategoryServicesPageAction } from '../Store/Actions/action';
import Filter_RightImageProductCard from './Cards/Filter_RightImageProductCard';

const Filter_RightCardProduct = () => {

    const dispatch = useDispatch();

    const { categoryName, subCategoryName } = useParams();
    // console.log("slug==>", categoryName, subCategoryName)

    const categoryList = useSelector(state => state.reducerGetCategory?.getCategoryData);
    // console.log("categoryList==>", categoryList)

    const subCategoryData = useSelector(state => state.reducerSubCategoryService?.subCategoryServiceData);
    // console.log("subCategoryData==>", subCategoryData);

    const filterImageData = useSelector(state => state.reducerGetServiceList?.filterPageImageData);
    // console.log("filterImageData===>", filterImageData)


    const [categoryId, setCategoryId] = useState();
    const [subCatId, setSubCatId] = useState();

    // console.log("categoryId==>", categoryId);
    // console.log("subCatId==>", subCatId)




    // get category 
    useEffect(() => {
        categoryListAction(dispatch)
    }, [dispatch])


    if (!categoryId) {
        categoryList?.forEach(element => {
            // console.log("element===>", element);
            if (categoryName == element.slug) {
                setCategoryId(element._id);

            }
        })
    }


    // get subcategory
    useEffect(() => {
        if (categoryId) {
            getSubCategoryServicesPageAction(dispatch, categoryId)
        }
    }, [categoryId])

    if (!subCatId) {
        subCategoryData?.forEach(ele => {
            if (subCategoryName == ele.slug) {
                setSubCatId(ele._id)
            }
        })
    }

    // get service
    useEffect(() => {
        if (categoryId && subCatId) {
            getServiceListAction(dispatch, categoryId, subCatId)
        }

    }, [dispatch, subCatId])


    return (
        <>
            {/* <h1>fskdbnkf</h1> */}

            <div className="right-block">
                <div className="head-wrap">
                    <h1>{subCategoryName}</h1>
                    <div className="sort-select"><label>Sort by</label>
                        <div className="sort-wrap">
                            <div className="react-select-container css-b62m3t-container"><span id="react-select-2-live-region"
                                className="css-7pg0cj-a11yText"></span><span aria-live="polite" aria-atomic="false"
                                    aria-relevant="additions text" className="css-7pg0cj-a11yText"></span>
                                <div className="react-select__control css-1s2u09g-control">
                                    <div className="react-select__value-container css-1d8n9bt">
                                        <div className="react-select__placeholder css-14el2xx-placeholder"
                                            id="react-select-2-placeholder">Select...</div>
                                        <div className="react-select__input-container css-ackcql"
                                        // data-value=""
                                        ><input
                                                className="react-select__input" autoCapitalize="none" autoComplete="off"
                                                autoCorrect="off" id="react-select-2-input" spellCheck="false" tabIndex="0"
                                                type="text" aria-autocomplete="list" aria-expanded="false" aria-haspopup="true"
                                                aria-controls="react-select-2-listbox" aria-owns="react-select-2-listbox"
                                                role="combobox" aria-describedby="react-select-2-placeholder"
                                                //  value=""
                                                style=
                                                {{
                                                    color: "inherit",
                                                    background: "0px center",
                                                    opacity: "1",
                                                    width: "100%",
                                                    gridArea: "1 / 2 / auto / auto",
                                                    font: "inherit",
                                                    minWidth: "2px",
                                                    border: "0px",
                                                    margin: "0px",
                                                    outline: "0px",
                                                    padding: "0px"
                                                }} />
                                        </div>
                                    </div>
                                    {/* <div className="react-select__indicators css-1wy0on6">
                                        <span
                                            className="react-select__indicator-separator css-1okebmr-indicatorSeparator"></span>
                                        <select name="cars" id="cars"> Select Price
                                            <option >Price: Low to High</option>
                                            <option>Price: High to Low</option>
                                        </select>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='image_box_filter'>
                    {
                        filterImageData ? filterImageData.map((items, index) => {
                            return (
                                <div key={index} >
                                    <Filter_RightImageProductCard data={items} />

                                </div>
                            )
                        }) : null
                    }
                </div>

            </div>
        </>
    )
}

export default Filter_RightCardProduct


