import React, { useCallback, useState } from 'react';
//import logo from './logo.svg';
//import './App.css';
import Users from './users/pages/Users';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import MainNavigation from './shared/components/Navigation/MainNavigation';
import AddUser from './users/pages/AddUser';
import Auth from './users/pages/Auth';
import BeaconData from './real-time-data/floor_1/pages/homePage';
import BeaconCharts from './real-time-data/floor_1/pages/beacon-charts';
import BeaconChartData from './real-time-data/floor_1/components/beaconsData';
import { AuthContext } from './shared/context/auth-context';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  let logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/users/list" exact>
          <Users />
        </Route>
        <Route path='/users/add' exact>
          <AddUser />
        </Route>
        <Route path='/users/:userId' exact>
          <AddUser />
        </Route>
        <Route path='/' exact>
          <BeaconData />
        </Route>
        <Route path='/sensors' exact>
          <BeaconCharts />
        </Route>
        <Route path='/sensors/charts' exact>
          <BeaconChartData />
        </Route>
        {/* <Redirect to="/" /> */}
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/users/list" exact>
          <Users />
        </Route>
        <Route path='/users/:userId' exact>
          <AddUser />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>
        <Route path='/' exact>
          <BeaconData />
        </Route>
        <Route path='/sensors' exact>
          <BeaconCharts />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
