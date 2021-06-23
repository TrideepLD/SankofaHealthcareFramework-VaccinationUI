import React from "react";
import { Route, Switch } from "react-router-dom";

import "./app.scss";
import { Content } from "carbon-components-react";

import ShellHeader from "./components/ShellHeader";
import LoginPage from "./content/LoginPage";
import LandingPage from "./content/LandingPage/LandingPage";
import ConfirmationPage from "./content/ConfirmationPage/ConfirmationPage";

import { useSelector } from "react-redux";

/*
  Primary App component

  Renders UI shell and conditionally renders login screen or authenticated user screen
*/

const App = () => {
  const user = useSelector((state) => state.authenticatedUser);

  return (
    <>
      <ShellHeader user={user} />
      <Content className="content-container">
        <Switch>
          <Route exact path="/">
            {!user ? <LoginPage /> : <LandingPage />}
          </Route>

          <Route path="/confirmation" component={ConfirmationPage} />
        </Switch>
      </Content>
    </>
  );
};

export default App;
