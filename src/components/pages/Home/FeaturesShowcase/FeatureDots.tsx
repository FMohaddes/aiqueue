import {createStyles} from "antd-style";
import React, {FC} from "react";
import {CarouselRef} from "antd/es/carousel";

const useStyles = createStyles(({css}) => ({
    dotsContainer: css`
         display         : none;
         justify-content : center;
         position        : absolute;
         bottom          : -9rem;
         left            : 50%;
         transform       : translateX(-50%);
         z-index         : 100;
         @media (max-width : 768px) {
              display : flex;
              }
    `,
    dot: css`
         width         : 8px;
         height        : 8px;
         margin        : 0 5px;
         border-radius : 50%;
         background    : rgba(150, 150, 150, 0.64);
         cursor        : pointer;
         transition    : all 0.3s;
    `,
    activeDot: css`
         background : white;
         transform  : scale(1.5);
    `,
}));

interface FeatureDotsProps {
    features: { id: number; title: string; video: string }[];
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
    carouselRef: React.RefObject<CarouselRef>;
}

const FeatureDots: FC<FeatureDotsProps> = ({features, currentIndex, setCurrentIndex, carouselRef}) => {
    const {styles} = useStyles();

    return (
        <div className = {styles.dotsContainer} >
            {features.map((_, index) => (
                <div
                    key = {index}
                    className = {`${styles.dot} ${
                        index === currentIndex ? styles.activeDot : ""
                    }`}
                    onClick = {() => {
                        setCurrentIndex(index);
                        carouselRef.current?.goTo(index);
                    }}
                />
            ))}
        </div >
    );
};

export default FeatureDots;
