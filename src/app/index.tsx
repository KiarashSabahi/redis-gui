import React from "react";
import ReactDOM from "react-dom";
import { Switch, HashRouter as Router, Route } from "react-router-dom";
import "./index.css";
import "./assets/css/main.css";
import reportWebVitals from "./reportWebVitals";
import AllConnections from "./components/AllConnections";
import SideMenu from "./components/SideMenu";
import Main from "./components/Main";
import NewConnection from "./components/NewConnection";
import Header from "./components/Header";
import ConnectionPage from "./components/ConnectionPage";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<div className="app">
				<Header />
				<div className="parent">
					<SideMenu />
					<Switch>
						<Route path="/connection/new">
							<Main component={NewConnection} />
						</Route>
						<Route path="/connection/fav">
							<Main component={NewConnection} />
						</Route>
						<Route path="/connection/recent">
							<Main component={NewConnection} />
						</Route>
						<Route path="/connection/:id" component={ConnectionPage} />
						<Route path="/">
							<Main component={AllConnections} />
						</Route>
						<Route component={AllConnections} />
					</Switch>
				</div>
			</div>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
