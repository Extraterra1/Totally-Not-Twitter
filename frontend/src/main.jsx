import React from 'react';
import ReactDOM from 'react-dom/client';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import './index.css';

import App from './App.jsx';
import Router from './Router.jsx';

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:'
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider store={store}>
    <Router />
  </AuthProvider>
);
