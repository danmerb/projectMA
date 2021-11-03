import React from "react";
import AuthProvider from "./context/AuthProvider";
import ExpedienteProvider from "./context/ExpedienteProvider";
import { Switch, Route } from "react-router-dom";
import Register from "./components/forms/RegisterForm";
import Login from "./components/forms/LoginForm";
import LayoutDashboard from "./Layout/LayoutDashboard";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export const App = () => {
  return (
    <AuthProvider>
      <ExpedienteProvider>
        <Switch>
          <Route exact path="/" render={() => <Redirect exact to="/login" />} />
          <LayoutDashboard path="/home" />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </ExpedienteProvider>
    </AuthProvider>
  );
};

export default App;
