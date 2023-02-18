import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./views/examples/own/HomePage";
import Profile from "./views/examples/Profile";
import Register from "./views/examples/Register";
import Index from "./views/Index";
import Login from "./views/IndexSections/Login";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";
import { SearchSchool } from "./views/examples/own/SearchSchool";

export function App(){
  return(
    <BrowserRouter>
      <Switch>
        <Route 
          path="/landing-page"
          exact 
          render={(props) => <Index {...props} />}
        />
        <Route 
          path="/go_to"
          exact 
          component={<SearchSchool/>}
        />
        <Route
          path="/"
          exact
          render={(props) => <HomePage {...props} />}
        />
        <Route
          path="/signin"
          exact
          render={(props) => <Login {...props} />}
        />
        <Route
          path="/profile-page"
          exact
          render={(props) => <Profile {...props} />}
        />
        <Route
          path="/register-page"
          exact
          render={(props) => <Register {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
}