import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./views/examples/own/HomePage";
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
import { Signup } from "./views/examples/own/Signup";
import { Profile } from "./views/examples/own/Profile";
import { NotFound } from "./views/examples/own/NotFound";
import { AddTrip } from "./views/examples/own/AddTrip";

export function App(){
  return(
    <BrowserRouter basename="/MyPooling-FE">
      <Routes>
        <Route
          path="/choose"
          exact
          element={<><DemoNavbar/><Hero/></>}
        />
        <Route
          path="/signup"
          exact
          element={<><DemoNavbar/><Signup/></>}
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
          path="/profile/:username"
          exact
          element={<Profile/>}
        />
        <Route
          path="/add_trip"
          exact
          element={<AddTrip/>}
        />
        <Route
          path="/*"
          exact
          element={<NotFound page={true}/>}
        />
      </Routes>
    </BrowserRouter>
  );
}