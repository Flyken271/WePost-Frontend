import React from "react";
import "./App.css";
import Navbar1 from "./Navbar";
//import JumboInfo from './JumboInfo';
//import CardWButton from './CardWButton';
import Footer1 from "./Footer1";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import LogoutPage from "./LogoutPage";
import CreatePage from "./CreatePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Userpage from "./Userpage";
import { UserProvider } from "./userContext";
import Termsofservice from "./Termsofservice";
import PostPage from "./PostPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <UserProvider>
          <Navbar1 navbarBrand="WePost" />
          <Switch>
            <Route exact path="/u/:user">
              <Userpage />
            </Route>
            <Route exact path="/post/:id">
              <PostPage />
            </Route>
            <Route exact path="/">
              <Homepage />
            </Route>

            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/logout">
              <LogoutPage />
            </Route>

            <Route exact path="/register">
              <RegisterPage />
            </Route>

            <Route exact path="/create">
              <CreatePage />
            </Route>

            <Route exact path="/tos">
              <Termsofservice />
            </Route>
          </Switch>
          <Footer1 />
        </UserProvider>
      </div>
    </Router>
  );
};

export default App;
