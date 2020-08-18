import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import NotFoundPages from "../Pages/NotFoundPage";
import Home from "../Pages/MainPage.js";
import Header from "../Header/Header";

const App = () => {
    return (
        <Router>
            <Header/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route component={NotFoundPages}/>
            </Switch>
        </Router>
    );
}

export default App;
