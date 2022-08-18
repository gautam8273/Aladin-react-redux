import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCartAction, categoryListAction, checkAuthAction, getCartDataAction, getCountryListAction, getlocalCartAction, searchGetServiceAction, userProfileDetailsAction } from '../Store/Actions/action';
import ListCategory from './ListCategory';
import CountryList from './CountryList';
import logo from '../assets/images/logo.png'
import SearchBar from './SearchBar';



const Header = () => {

    const navigate = useNavigate();

    // for Auto Logout
    const logoutTimerIdRef = useRef();

    const dispatch = useDispatch();

    const ref = useRef();


    let getCartLength = useSelector(state => state.reducerGetCartData?.cartDetails);
    // console.log("getCart==>", getCart)

    if (localStorage.getItem("alacart")) {
        getCartLength = JSON.parse(localStorage.getItem("alacart"))
    }
    // console.log("getCartLength===>", getCartLength)
    let cartCount = getCartLength ? getCartLength.length : null;
    // console.log("getCartLength===>", getCartLength)

    useEffect(() => {

    }, [cartCount, getCartLength])



    // User Profile details
    const userProfile = useSelector(state => state.reducerUserProfileDetails?.userProfileDetails);
    // console.log("userProfile==>", userProfile)



    // signout button change to UserDetails
    const [userDetails, setUserDetails] = useState(false)

    // for all category list--hide & show
    const [listCat, setListCat] = useState(false);

    // for country-- hide & show
    const [countryName, setCountryName] = useState(false);

    // for search bar--for category Id
    const [catId, setcarId] = useState();


    const [NameCountry, setNameCountry] = useState(
        // refresh country name on header
        JSON.parse(localStorage.getItem("countryList"))
    );
    // console.log("NameCountry==>", NameCountry)

    useEffect(() => {

    }, [userProfile])

    // for all category list
    const allCategoryList = () => {
        // alert("vbsfdj")
        categoryListAction(dispatch)
        setListCat(x => !x);

    }

    // all country list
    const nameCountry = () => {
        getCountryListAction(dispatch)
        setCountryName(y => !y)
    }


    // for Logout
    const logOutForm = () => {
        localStorage.removeItem("loginData")
        // window.location.reload();
        navigate('/');
    }


    // Autologout
    useEffect(() => {
        const autoLogout = () => {
            if (document.visibilityState === 'hidden') {
                const timeOutId = window.setTimeout(logOutForm, 15 * 60 * 1000);
                logoutTimerIdRef.current = timeOutId;
            } else {
                window.clearTimeout(logoutTimerIdRef.current);
            }
        };

        document.addEventListener('visibilitychange', autoLogout);

        return () => {
            document.removeEventListener('visibilitychange', autoLogout);
        };
    });


    // user Profile Details
    useEffect(() => {
        let token = localStorage.getItem("loginData");
        if (token) {
            userProfileDetailsAction(dispatch)
        }

    }, [dispatch])


    useEffect(() => {
        let country = {
            country: localStorage.getItem("countryList")
        }
        if (localStorage.getItem("loginData")) {
            getCartDataAction(dispatch, country)
        }

    }, [dispatch])


    // search Bar
    const searchitems = (e) => {
        // if (e.target.value.length >= 3) {
        searchGetServiceAction(dispatch, e.target.value)
        // }
    }

    // get local cart Action-- for localstorage
    useEffect(() => {
        getlocalCartAction(dispatch)
    }, [dispatch, cartCount])

    // check Auth Api
    useEffect(() => {
        let token = localStorage.getItem("loginData")
        if (token) {
            checkAuthAction(dispatch)
        }

    })


    // close Sign in and Acccount dropDown
    const userMenuBarHeader = () => {
        setUserDetails(prev => !prev)
    }

    // close Sign in and Acccount dropDown
    const userDetailsmenuBar = () => {
        setUserDetails(false)
    }


    // close menu bar category list on click outside category list
    useEffect(() => {
        const checkIfClickOutSide = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setListCat(false);
            }
        }
        document.addEventListener("click", checkIfClickOutSide)
        return () => {
            document.removeEventListener("click", checkIfClickOutSide)
        }
    }, [listCat])

    return (
        <>
            <header className="header logged-in">
                <div className="primary-header">
                    <div className="container">
                        <div className="logo"><a href="/"><img
                            src={logo}
                            alt="logo" /></a></div>
                        <div className="search-wrapper" style={{ position: "relative" }}>
                            <form>
                                <div className="input-wrap">
                                    <input type="text" className="form-control" placeholder="Search"
                                        minLength="3"
                                        // value="" 
                                        name="searchBar"
                                        onChange={searchitems}
                                    />
                                    <div className="btn-wrap"><button type="submit" className="btn"><i className="icon-search"></i></button>
                                    </div>
                                </div>
                            </form>
                            <SearchBar />
                            <div>
                                <div
                                    style={{
                                        height: "200px",
                                        backgroundColor: "rgb(255, 255, 255)",
                                        border: "1px solid rgb(211, 211, 211)",
                                        width: "100%",
                                        position: "absolute",
                                        zIndex: "9999",
                                        display: "none",
                                        overflow: "auto"
                                    }} >
                                </div>
                            </div>
                        </div>
                        <div className="header-right">

                            <Link to={'/user/cart'}>
                                <div className="cart-wrap"><i className="icon-cart"></i>
                                    <div className="item-counter">{cartCount}</div>

                                </div>
                            </Link>

                            <Link to={'/user/messages'}>
                                <div className="notification-wrap"><i className="icon-mail"></i>
                                    <div className="item-counter">0</div>
                                </div>
                            </Link>



                            {
                                localStorage.getItem("loginData")
                                    ?


                                    <div className="profile-dropdown">
                                        <div className="show dropdown">
                                            <button aria-expanded="true"
                                                type="button"
                                                className="dropdown-toggle btn btn-primary"
                                                onClick={userMenuBarHeader}
                                            // onClick={() => setUserDetails(prev => !prev)}
                                            // userDetailsmenuBar={setUserDetails}
                                            >{userProfile?.[0]?.firstName}
                                            </button>
                                            {
                                                userDetails ? <div x-placement="bottom-end" aria-labelledby="" className="dropdown-menu show dropdown-menu-end"
                                                    data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-end"
                                                    style={{
                                                        position: "absolute",
                                                        inset: "0px 0px auto auto",
                                                        transform: "translate(0px, 42px)"
                                                    }}>
                                                    <Link to={'/user/dashboard'}
                                                        data-rr-ui-dropdown-item=""
                                                        className="dropdown-item"
                                                        role="button" tabIndex="0"
                                                        onClick={userDetailsmenuBar}
                                                    >
                                                        Your Account
                                                    </Link>
                                                    <a href="#"
                                                        data-rr-ui-dropdown-item=""
                                                        className="dropdown-item"
                                                        role="button" tabIndex="0"
                                                        onClick={userDetailsmenuBar}
                                                    >Notifications</a>
                                                    <Link to={"/wishlist"}
                                                        data-rr-ui-dropdown-item=""
                                                        className="dropdown-item"
                                                        onClick={userDetailsmenuBar}
                                                    >My Wishlist</Link>
                                                    <a href="#"
                                                        data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabIndex="0"
                                                        onClick={logOutForm}>Sign Out</a></div>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className="signin-btn">
                                        <Link to={'/sign-in'} className="btn">Sign In</Link>
                                    </div>
                            }
                        </div >
                    </div >
                </div >
                <div className="secondary-header">
                    <div className="container">

                        <div className="header-left" ref={ref}>
                            <button type="button" className="menu-btn" onClick={allCategoryList}>
                                <div className="ham-burger"><span className="line"></span><span className="line"></span><span
                                    className="line"></span></div>
                                <div className="text-wrap">All Categories</div>

                            </button>

                            {listCat && <ListCategory menuBar={setListCat} />}
                        </div>
                        <nav className="nav">
                            <ul className="w-100">
                                <li><Link to={`/customer-service`}>Customer Service</Link></li>
                                <li><Link to={'/best-seller'}>Best Sellers</Link></li>

                                <li> <Link to={`/become-seller-form`}>Become a Seller</Link></li>
                            </ul>
                        </nav>
                        <div className="country-select">
                            <div className="custom-select">



                                <div className="custom-select_header" onClick={nameCountry}>

                                    {
                                        NameCountry ? <span style={{ color: "white", marginRight: "15px" }}>{NameCountry?.name} ||
                                            {NameCountry?.currency}</span> : null}

                                    <i className="icon-location"></i>
                                    <i className="icon-down "></i>

                                    {countryName && <CountryList data={setNameCountry} />}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header >
        </>
    )
}

export default Header