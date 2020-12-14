import React from "react";
import MoviesLine from "../MoviesLine";
import Banner from "../Banner";
import { movieCategories } from "../../moviesData";
import netflixLogo from "./assets/netflix.svg";
import "./app.scss";

interface IApp {}

const App: React.FC<IApp> = () => {
    return (
        <div className="app">
            <img className="app__logo" src={netflixLogo} alt="logo" />
            <Banner />
            {Object.values(movieCategories).map((movieCategory, index) => (
                <MoviesLine
                    key={movieCategory.headline}
                    isLarge={index == 0}
                    requestURL={movieCategory.fetchURL}
                    headline={movieCategory.headline}
                />
            ))}
        </div>
    );
};

export default App;
