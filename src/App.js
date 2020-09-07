import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Header from './Components/Header/Header';
import Users from './Components/Users/Users';
import UserDetails from './Components/UserDetails/UserDetails'

function App() {
  return (
    <Fragment>
      <Route exact path="/" render={() => 
        <div>
          <Header />
          <Users />
        </div>} />
      <Route exact path="/User/:name" render={() => 
        <div>
          <Header />
          <UserDetails />
        </div>} />
    </Fragment>
  );
}

export default App;
