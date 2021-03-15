import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './index.css';
import "./assets/css/main.css"
import reportWebVitals from './reportWebVitals';
import AllConnections from "./components/AllConnections";
import SideMenu from "./components/SideMenu";
import Main from "./components/Main";
import NewConnection from "./components/NewConnection";
import Header from "./components/Header";

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <div className="app">
              <Header/>
              <div className="parent">
                  <SideMenu/>
                  <Switch>
                      <Route path="/connection/new">
                          <Main component={NewConnection}/>
                      </Route>
                      <Route path="/">
                          <Main component={AllConnections}/>
                      </Route>
                  </Switch>
              </div>
          </div>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
