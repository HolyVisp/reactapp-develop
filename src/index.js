import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
    BrowserRouter
} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./Store";
import "./Styles/Index.css"
import ApiAlertComponent from "./Components/ApiAlertComponent";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
            <ApiAlertComponent/>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
);
