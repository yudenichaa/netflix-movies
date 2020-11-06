import { Options as YoutubeOptions } from "react-youtube";

interface IConfig {
    moviesLineYoutubeOptions: YoutubeOptions;
    bannerYoutubeOptions: YoutubeOptions;
}

const config: IConfig = {
    moviesLineYoutubeOptions: {
        height: "500",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    },
    bannerYoutubeOptions: {
        height: "75%",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    },
};

export default config;
