import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App/App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { reduxFirestore, getFirestore, createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "firebase/app";

import thunk from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer.js";
import fbConfig from "./config/fbConfig.js";

const middleware = [ thunk.withExtraArgument({getFirestore}) ];

const store = createStore(rootReducer,
    compose(
        applyMiddleware(...middleware),
        reduxFirestore(fbConfig)
    )
);

const rrfProps = {
    firebase,
    config: {
        userProfile: 'users',
        useFirestoreForProfile: true
    },
    dispatch: store.dispatch,
    createFirestoreInstance
};

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();