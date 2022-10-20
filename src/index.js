import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WebFont from 'webfontloader';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

WebFont.load({
    google: {
        families: ['Open Sans','Roboto']
    }
});

ReactDOM.render(
  <React.StrictMode>
      <HashRouter>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
