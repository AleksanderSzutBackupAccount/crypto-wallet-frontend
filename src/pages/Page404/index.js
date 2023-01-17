import React from "react";
import { Link } from "react-router-dom";

import { RouteEnum } from "../../routes/RouteEnum";

const texts = {
  title: "404",
  subTitle: "Page not found.",
  backToDashboard: "Back to homepage",
};

const Page404 = () => {
  return (
    <div>
      <p>{texts.title}</p>
      <p>{texts.subTitle}</p>
      <div>
        <Link to={RouteEnum.dashboardPage}>{texts.backToDashboard}</Link>
      </div>
    </div>
  );
};

export default Page404;
