import {Outlet, useLocation} from 'react-router-dom';
import React, { useState} from "react";
import { useSelector} from "react-redux";
import AuthorizationPage from "../../Pages/AuthorizationPage";
import AuthorizationService from "../../Api/Services/AuthorizationService";
import DeviceDetector from "device-detector-js";
import {Backdrop, CircularProgress} from "@mui/material";

export default function AuthorizationRoute(){
    const token = useSelector(state => state.authorization.token);
    const inIframe = useSelector(state => state.iframe.inIframe);
    const [isLogin, setIsLogin] = useState(false);
    let location = useLocation();

    // Если приложение запущено в iframe, пропускаем проверку авторизации
    if (inIframe) {
        return <Outlet />;
    }

    if(token !== "")
             {
                 AuthorizationService.validate(token)
                     .then(function(response){
                         if(response.status === 200)
                         {
                             setIsLogin(true);
                         }
                         else
                         {
                             setIsLogin(false);
                         }
                     }).catch(function (error) {
                     setIsLogin(false);
                 });
             }
    return (
        <>
            <main>
                {isLogin ? <Outlet /> : <AuthorizationPage/>}
            </main>
        </>
    );
};