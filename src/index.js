import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo'
import 'foundation-sites/dist/css/foundation.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import client from './apollo'
import { Auth0Provider } from "./react-auth0-wrapper";
import config from "./auth_config.json";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
    >
        <ApolloProvider client={client} >
            <App />
        </ApolloProvider>
    </Auth0Provider>,
    document.getElementById('root')
)

serviceWorker.unregister();
if (module.hot) module.hot.accept()
