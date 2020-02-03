import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import "./App.scss";
import Loading from "./components/Loading";

const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));
const App = () => {
  return (
    <HashRouter>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route
            path="/"
            name="Home"
            render={props => <DefaultLayout {...props} />}
          />
        </Switch>
        <div id="modal-element"></div>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
