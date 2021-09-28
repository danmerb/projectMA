import React from "react";
import AuthProvider from './context/AuthProvider'
import {Switch, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Register from './components/forms/RegisterForm'
import Login from './components/forms/LoginForm'
import Layout from "./Layout/Layout";

export const App = () => {
  return (
    <AuthProvider>
      <Switch>
        <Layout exact path="/" component={Dashboard} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </AuthProvider>
  );
};

export default App;