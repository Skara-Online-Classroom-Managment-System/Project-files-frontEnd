import React from "react";
// import ReactDOM from "react-dom";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import Classroom from "layouts/Classroom.js";
import People from "layouts/People.js";
import Teams from "layouts/Teams.js";
// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Dashboard from "views/admin/Dashboard.js";
import IndividualTeam from "views/admin/IndividualTeam.js";

const app = () => {
  return (
    <Switch>
      {/* add routes with layouts */}
      <Route path='/admin' component={Admin} />
      <Route path='/auth' component={Auth} />
      {/* add routes without layouts */}
      <Route exact path='/landing' component={Landing} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/' component={Index} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/classroom/:pos' component={Classroom} />
      <Route exact path='/classroom/:pos/people' component={People} />
      <Route exact path='/classroom/:pos/teams' component={Teams} />
      <Route
        exact
        path='/classroom/:pos/teams/:teampos'
        component={IndividualTeam}
      />
      {/* add redirect for first page */}
      <Redirect from='*' to='/' />
    </Switch>
  );
};

export default withRouter(app);
