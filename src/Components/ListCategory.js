import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ListCategory = ({ menuBar }) => {

    const dispatch = useDispatch();


    const categoryList = useSelector(state => state.reducerGetCategory?.getCategoryData);
    // console.log("categoryList==>", categoryList)

    // const menuBarActiveClass = useSelector((state) => state.reducerMenuBarActiveClass?.menuBarActiveClass)
    // console.log("menuBarActiveClass>>>>", menuBarActiveClass) 

    // for active class on category list dropdown menu
    const menuBarActiveClassCatId = useSelector((state) => state.reducerMenuBarActiveClass?.menuBarActiveClassCatId)
    // console.log("menuBarActiveClassCatId>>>", menuBarActiveClassCatId)



    // CategoryPage.js-- right side 
    // const getCategoryId = (id) => {
    //     // alert(id)
    //     getSubCategoryServicesPageAction(dispatch, id);
    // }


    //close Menu Bar
    const closeMenuBar = () => {
        menuBar(false)
    }




    return (
        <>
            <div className="navigation active">
                <div className="menu-wrapper">
                    <div style={{
                        position: "relative", overflow: "hidden",
                        width: "100%",
                        height: "100%",
                        maxWidth: "360px"
                    }}>
                        <div style={{
                            position: "absolute",
                            inset: "0px",
                            overflow: "scroll",
                            marginRight: "-15px",
                            marginBottom: "-15px"
                        }}>
                            <ul className="category-list">

                                {
                                    categoryList ? categoryList.map((items, index) => {
                                        return (

                                            <Link to={`/category/${items.slug}`}
                                                key={index}
                                                // for active class on category list dropdown menu
                                                className={
                                                    (menuBarActiveClassCatId == items._id)
                                                        ?
                                                        "category-list-Name activeList"
                                                        :
                                                        "category-list-Name"
                                                }
                                                onClick={closeMenuBar}
                                            >
                                                {items.name}
                                            </Link>
                                        )
                                    }) : null
                                }

                            </ul>
                        </div>
                        <div style={{
                            position: "absolute",
                            height: "6px",
                            right: "2px",
                            bottom: "2px",
                            left: "2px",
                            borderRradius: "3px"
                        }}>
                            <div
                                style={{
                                    position: "relative",
                                    display: "block",
                                    height: "100%",
                                    cursor: "pointer",
                                    borderRadius: "inherit",
                                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                                    width: "0px"
                                }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListCategory