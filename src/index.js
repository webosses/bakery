import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
 import {AppProvider} from './context';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
     <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    audience="https://mtaichi.eu.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
  
  >
    <AppProvider>
    <App />
    </AppProvider>
     </Auth0Provider>
   
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
