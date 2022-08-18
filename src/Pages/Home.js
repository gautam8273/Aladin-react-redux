import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../Components/Banner'
import BottomTwoBannerDataSlider from '../Components/BottomTwoBannerDataSlider';
import CoreServices from '../Components/CoreServices';
import Trending from '../Components/Trending';
import TwoImagesSlider from '../Components/TwoImagesSlider';
import { getHomePageAction } from '../Store/Actions/action';

const Home = () => {

    const dispatch = useDispatch();

    const homePageData = useSelector(state => state.reducerGetHomePage?.homePageData);
    // console.log("homePageData==>", homePageData)

    useEffect(() => {
        getHomePageAction(dispatch)
    }, [dispatch])
    return (
        <>
            <Banner />
            <Trending />
            <TwoImagesSlider />
            <CoreServices />
            <BottomTwoBannerDataSlider />

        </>
    )
}

export default Home