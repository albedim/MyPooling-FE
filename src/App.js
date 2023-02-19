import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./views/examples/own/HomePage";
import Profile from "./views/examples/Profile";
import Register from "./views/examples/Register";
import Index from "./views/Index";
import Login from "./views/examples/Login";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/scss/argon-design-system-react.scss?v1.1.0";
import { SearchSchool } from "./views/examples/own/SearchSchool";
import { Signin } from "./views/examples/own/Signin";
import { SearchHome } from "./views/examples/own/SearchHome";
import { DemoNavbar } from "./components/Navbars/DemoNavbar";
import { Hero } from "./views/IndexSections/Hero";

export function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route
          path="/choose"
          exact
          element={<><DemoNavbar/><Hero/></>}
        />
         <Route
          path="/go_home"
          exact 
          element={<SearchHome/>}
        />
        <Route
          path="/go_to"
          exact 
          element={<SearchSchool/>}
        />
        <Route
          path="/"
          exact
          element={<HomePage/>}
        />
        <Route
          path="/signin"
          exact
          element={<Signin/>}
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
      </Routes>
    </BrowserRouter>
  );
}