import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { categoryListAction, getSubCategoryServicesPageAction, menuBarActiveClassAction } from '../Store/Actions/action';



const CategoryPage = () => {






    const categoryList = useSelector(state => state.reducerGetCategory?.getCategoryData);
    // console.log("categoryList==>", categoryList)


    const subCategoryData = useSelector(state => state.reducerSubCategoryService?.subCategoryServiceData);
    // console.log("subCategoryData==>", subCategoryData)



    const { categoryName } = useParams();
    // console.log("name==>", name);

    const dispatch = useDispatch();
    const [catId, setCatId] = useState();
    const [catName, setCatName] = useState();

    //refresh error of category page
    useEffect(() => {
        setCatName();
        setCatId()
    }, [categoryName])


    // refresh error of category page
    if (!catId) {
        categoryList?.forEach(element => {
            // console.log("element===>", element)
            if (categoryName == element.slug) {
                setCatId(element._id);
                setCatName(element.name)
            }
        });
    }


    // refresh error of category page
    useEffect(() => {
        categoryListAction(dispatch)
    }, [dispatch])

    // show the right side image & refresh error of category page
    useEffect(() => {
        if (catId) {
            getSubCategoryServicesPageAction(dispatch, catId)
        }
    }, [catId])



    // left side category list panel
    const categoryItemId = (id) => {
        // alert(id)
        getSubCategoryServicesPageAction(dispatch, id)

    }

    // for active class on category list dropdown menu
    useEffect(() => {
        // console.log(catId)
        // console.log("gyguyguyguyguyhguyguygy")
        menuBarActiveClassAction(dispatch, categoryName, catId)
    }, [dispatch, categoryName, catId])


    return (
        <>
            <section className="category-block">
                <div className="container">
                    <div className="categories">
                        <ul>

                            {
                                categoryList ? categoryList.map((items, index) => {
                                    return (
                                        <li key={index}
                                            onClick={() => { categoryItemId(items._id) }}
                                            className={(catName == items.name) ? "categoryListName active" : "categoryListName"}
                                        >
                                            <Link to={`/category/${items.slug}`}

                                            >
                                                {items.name}
                                            </Link>
                                        </li>
                                    )
                                }) : null
                            }


                        </ul>
                    </div>


                    <div className="particular-category">
                        {/* use of params */}
                        <h1>{catName}</h1>
                        <div className='service-block-first'  >

                            {
                                subCategoryData ? subCategoryData.map((items, index) => {
                                    return (
                                        <div className="services-block" key={index} >

                                            <div className="service-wrap">
                                                <Link to={`/category/particular/${categoryName}/${items.slug}`} >
                                                    <div className="img-wrap"><img
                                                        src={items.path + items.subcategoryIcon}
                                                        alt="service" /></div>
                                                    <div className="service-info">{items.name}</div>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }) : null
                            }

                        </div>


                        <nav className="pagination-wrap" aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item previous disabled"><a className="page-link" href="#"
                                    tabIndex="-1"><i className="icon-arrow"></i></a></li>
                                <li className="page-item active" aria-current="page"><a className="page-link"
                                    href="#">1</a></li>
                                <li className="page-item  disabled"><a className="page-link" href="#"><i
                                    className="icon-arrow"></i></a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CategoryPage