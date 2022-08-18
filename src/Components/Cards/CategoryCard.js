import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CategoryCard = () => {

    const coreServices = useSelector(state => state.reducerGetHomePage?.homePageData);
    // console.log("coreServices===>", coreServices);

    return (
        <>
            {
                coreServices && coreServices.categoryData?.map((items, index) => {
                    // console.log("items==>", items)
                    return (



                        <div className="services-block" key={index} >
                            <div className="service-wrap">
                                <Link to={`/category/${items.name}`}>
                                    <div className="img-wrap"><img
                                        src={coreServices.categoryImagePath + items.categoryIcon}
                                        alt="service" /></div>
                                    <div className="service-info">{items.name}</div>
                                </Link>
                            </div>
                        </div>



                    )
                })
            }
        </>
    )
}

export default CategoryCard;