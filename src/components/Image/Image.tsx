import React, { useState, useEffect, ImgHTMLAttributes } from "react";
import spinner from "./assets/spinner.svg";
import noImage from "./assets/noImage.png";

const Image: React.FC<ImgHTMLAttributes<HTMLImageElement>> = ({
    src,
    ...restProps
}) => {
    const [imageURL, setImageURL] = useState(`/${spinner}`);

    useEffect(() => {
        let isMounted = true;
        setImageURL(`/${spinner}`);
        if (src) {
            let preloadImg = document.createElement("img");
            preloadImg.src = src;
            preloadImg.onload = () => {
                if (isMounted) {
                    setImageURL(src);
                }
            };
            preloadImg.onerror = () => {
                if (isMounted) {
                    setImageURL(`/${noImage}`);
                }
            };
        }
        return () => {
            isMounted = false;
        };
    }, [src]);

    return <img src={imageURL} {...restProps} />;
};

export default Image;
