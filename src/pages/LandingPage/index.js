import React from "react";

const texts = {
    title: "404",
    subTitle: "Page not found.",
    backToDashboard: "Back to homepage",
};

const Landing = () => {
    return (
        <div>
            <p>{texts.title}</p>
            <p>{texts.subTitle}</p>
        </div>
    );
};

export default Landing;
