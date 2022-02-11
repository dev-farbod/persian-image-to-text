import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom"
import ContextProvider from './container/Context';
import "./container/css-reset.css"
import "./container/index.scss"

ReactDOM.render(
  <ContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ContextProvider>,
  document.getElementById('root')
);
