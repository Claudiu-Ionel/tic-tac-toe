import React from 'react';
import './index.css';
import App from './App';
import { AppContextProvider } from './context/Context';
import { render } from "react-dom";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');

render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>, 
  rootElement
);


reportWebVitals();