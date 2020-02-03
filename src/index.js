import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import createStore from "./store/createStore";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://gambilife.com/graphql',
});
const initialState = {};
const store = createStore(initialState);

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
      
    </Provider>,
    document.getElementById("root")
  );
};

renderApp();

if (module.hot) {
  module.hot.accept("./App", renderApp);
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
