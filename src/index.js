import React from 'react';
import ReactDOM from 'react-dom';

// import './index.css';

import { ApolloProvider } from 'react-apollo'
import 'foundation-sites/dist/css/foundation.min.css'

import App from './App';
import * as serviceWorker from './serviceWorker';

import client from './apollo'

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)

serviceWorker.unregister();
if (module.hot) module.hot.accept()
