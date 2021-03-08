import React from "react";
import { Switch, Route } from "react-router-dom";

import NotFoundPage from "../containers/NotFound";
import HomePage from "../containers/Home";
import SignupPage from "../containers/Signup";

function AppRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default AppRouter;
