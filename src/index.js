import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/metro/metro-4.2.43-725-5cec954e23845.min.css';
import "./assets/css/index.css";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GlobalProvider } from '../src/context/GlobalState';
ReactDOM.render(
    <GlobalProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </GlobalProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
