import React, { useEffect, useRef, useState } from "react";
import { createStyles } from "antd-style";
import { Carousel } from "antd";
import {CarouselRef} from "antd/es/carousel";

const useStyles = createStyles(({ css, token }) => ({
    videoWrapper: css`
         margin        : 0 auto;
         aspect-ratio  : 16/10;
         width         : 80%;
         perspective   : 1600px;
         position      : relative;
         z-index       : 50;
         border        : 1px solid ${token.colorFillSecondary};
         border-radius : 20px;
         box-shadow    : 0 0 12vw -4vw #A092FF;
         height        : 100%;
         object-fit    : cover;
         transition    : transform 0.8s ease-in-out;

    `,
    carousel: css`
         width  : 100%;
         height : 100%;
    `,
    video: css`
         width         : 100%;
         height        : 100%;
         object-fit    : cover;
         border-radius : 20px;
    `,
}));

interface FeatureCarouselProps {
    features: { id: number; title: string; video: string }[];
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
    isMobile: boolean;
    handleVideoEnd: () => void;
    carouselRef: React.RefObject<CarouselRef>;

}

const FeatureCarousel: React.FC<FeatureCarouselProps> = ({
                                                             features,
                                                             currentIndex,
                                                             setCurrentIndex,
                                                             isMobile,
                                                             carouselRef,
                                                             handleVideoEnd,
                                                         }) => {
    const { styles } = useStyles();
    const [rotation, setRotation] = useState(30);
    const [translateY, setTranslateY] = useState(-80);
    const [isClient, setIsClient] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Add scroll event listener to track scroll position and direction
    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            setScrollDirection(scrollPos > prevScrollY ? "down" : "up");
            setScrollY(scrollPos);
            setPrevScrollY(scrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollY]);

    // Update rotation and translation based on scroll position and direction
    useEffect(() => {
        const maxRotation = 30;
        const minRotation = 0;
        const newRotation = Math.min(maxRotation, Math.max(minRotation, maxRotation - scrollY * 0.08));
        const newTranslateY = (0 - newRotation) * 3 - (newRotation < 10 ? (isMobile ? -100 : -140) : 0) + (scrollDirection === "up" ? 20 : 0);

        setRotation(newRotation);
        setTranslateY(newTranslateY);
    }, [scrollY, scrollDirection, isMobile]);

    return (
        <div className = {styles.videoWrapper}
            style = {{
                transform: `perspective(1600px) rotateX(${rotation}deg) translate3d(0, ${translateY}px, 0) scale(${1 + rotation * 0.002})`,
            }}
        >
            {/* Render the carousel only on the client side */}
            {isClient ? (
                <Carousel
                    ref = {carouselRef}
                    dots = {false}
                    afterChange = {(current) => setCurrentIndex(current)}
                    className = {styles.carousel}
                    effect = "scrollx"
                >
                    {features.map((feature, index) => (
                        <video
                            key = {feature.id}
                            src = {feature.video}
                            controls
                            autoPlay = {index === currentIndex}
                            loop = {false}
                            className = {styles.video}
                            onEnded = {handleVideoEnd}
                            poster = "/images/landing/0.webp"

                        />
                    ))}
                </Carousel >
            ) : (
                // Fallback image for server-side rendering
                <img src = "/images/landing/0.webp" alt = "درحال بارگذاری"
                    className = {styles.video}

                />
            )
            }
        </div >
    );
};

export default FeatureCarousel;
