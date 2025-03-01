import { Segmented } from "antd";
import { createStyles } from "antd-style";
import {CarouselRef} from "antd/es/carousel";
import React, {FC} from "react";

const useStyles = createStyles(({ css, token }) => ({
    segmentedContainer: css`
         max-width       : 800px;
         backdrop-filter : saturate(180%) blur(10px);
         background      : ${token.colorFillTertiary};
         border          : 1px solid #333;
         padding         : 2px;
         font-size       : 16px;
         border-radius   : 6px;
         margin          : 0 auto 20px;
         position        : absolute;
         top             : 70px;
         left            : 50%;
         transform       : translateX(-50%);
         z-index         : 10;
    `,
    segmentedItem: css`
         color           : white;
         min-height      : 40px;
         line-height     : 40px;
         display         : flex;
         align-items     : center;
         justify-content : center;
         opacity         : 0.8;
         transition      : opacity 0.3s ease-in-out;
    `,
    activeItem: css`
         opacity     : 1 !important;
         font-weight : 400;
    `,
    mobileText: css`
         position    : absolute;
         top         : 0;
         left        : 50%;
         transform   : translateX(-50%);
         color       : white;
         font-size   : 24px;
         font-weight : bold;
         text-align  : center;
         margin-top  : 20px;
    `,
}));

interface FeatureNavigationProps {
    features: { id: number; title: string; video: string }[];
    currentIndex: number;
    isMobile: boolean;
    carouselRef: React.RefObject<CarouselRef>;
}

const FeatureNavigation: FC<FeatureNavigationProps> = ({isMobile, features, currentIndex, carouselRef }) => {
    const { styles } = useStyles();

    return (

        <>
            {isMobile ? (
                <div className = {styles.mobileText} >
                    {features[currentIndex].title}
                </div >
            ) : (
            <Segmented
                options = {features.map((feature, index) => ({
                    label: (
                        <span
                            className = {`${styles.segmentedItem} ${
                                index === currentIndex ? styles.activeItem : ""
                            }`}
                        >
                                    {feature.title}
                                </span >
                    ),
                    value: index,
                }))}
                onChange = {(value) => carouselRef.current?.goTo(value as number)}
                value = {currentIndex}
                className = {styles.segmentedContainer}
            />
                )}
        </>

    );
};

export default FeatureNavigation;
