import React from 'react';
import NavBar from "./components/NavBar";
import { useAuth0 } from "./wrappers/react-auth0-wrapper";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Posts from "./components/Posts";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ExternalApi from "./components/ExternalApi";

const App = (props) => {

	const { loading } = useAuth0();

	if (loading) {
		return (
			<div>Loading...</div>
		);
	}

	return (
		<div>
			<BrowserRouter>
				<header>
					<NavBar />
				</header>
				<Switch>
					<Route path="/" exact />
					<Route path="/posts" component={Posts} />
					<PrivateRoute path="/profile" component={Profile} />
					<PrivateRoute path="/external-api" component={ExternalApi} />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App;
