"use client";
import {useCallback, useEffect, useRef, useState} from "react";
import {createStyles} from "antd-style";
import {Center} from "react-layout-kit";
import FeatureDots from "@/components/pages/Home/FeaturesShowcase/FeatureDots";
import FeatureNavigation from "@/components/pages/Home/FeaturesShowcase/FeatureNavigation";
import FeatureCarousel from "@/components/pages/Home/FeaturesShowcase/FeatureCarousel";

const useStyles = createStyles(({css, token}) => ({
    container: css`
         position : relative;
         width    : 100%;
         margin   : -50px auto 500px;
    `,
    content: css`
         max-width     : 1200px;
         border-radius : 20px;
         width         : 100%;
         text-align    : center;
         position      : relative;
    `,
}));

const features = [
    {id: 0, title: "دید کلی", video: "/videos/landing/0.webm"},
    {id: 1, title: "دستیار ها", video: "/videos/landing/1.webm"},
    {id: 2, title: "تولید تصویر", video: "/videos/landing/2.webm"},
    {id: 3, title: "تبدیل متن به صوت", video: "/videos/landing/3.webm"},
    {id: 4, title: "افزونه ها", video: "/videos/landing/4.webm"},
    {id: 5, title: "مدل های پشتیبانی شده", video: "/videos/landing/5.webm"},
];

const FeaturesShowcase = () => {
    const {styles} = useStyles();
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<any>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Handle window resize to update mobile state
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Automatically switch to the next video when the current one ends
    const handleVideoEnd = useCallback(() => {
        const nextIndex = (currentIndex + 1) % features.length;
        setCurrentIndex(nextIndex);
        carouselRef.current?.goTo(nextIndex);
    }, [currentIndex, features.length]);

    return (
        <Center className = {styles.container} as = "section" id = "feature_cards" >
            <div className = {styles.content} >

                {/* Render the carousel */}
                <FeatureCarousel isMobile = {isMobile} handleVideoEnd = {handleVideoEnd} features = {features}
                    currentIndex = {currentIndex} setCurrentIndex = {setCurrentIndex} carouselRef={carouselRef}/>

                {/* Render the navigation controls */}
                <FeatureNavigation features = {features} currentIndex = {currentIndex} carouselRef = {carouselRef}
                    isMobile = {isMobile} />

                {/* Custom Dots for navigation on mobile */}
                <FeatureDots features = {features} currentIndex = {currentIndex}
                    setCurrentIndex = {setCurrentIndex}
                    carouselRef = {carouselRef} />
            </div >
        </Center >
    );
};

export default FeaturesShowcase;
