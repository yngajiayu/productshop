import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Login from "./pages/login";
import Admin from "./pages/admin";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route exact path="/login" component={Login} />
        <Redirect exact to="/login"></Redirect>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
