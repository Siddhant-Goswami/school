import React from "react";
import { Switch, Route } from "react-router-dom";

import NotFoundPage from "../containers/NotFound";
import HomePage from "../containers/Home";

function AppRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default AppRouter;
