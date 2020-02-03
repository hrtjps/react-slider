import React from "react";

const Landing = React.lazy(() => import("./views/LandingPage"));

const routes = [
  { path: "/", exact: true, name: "Landing", component: Landing },
  { path: "/landing", exact: true, name: "Landing", component: Landing },
];

export default routes;
