import {Alert, AlertTitle, Button, Snackbar} from "@mui/material";
import React, {useState} from "react";
import client from "../Api/Client";
import DownloadIcon from '@mui/icons-material/Download';
import {ApiMessages} from "../Configs/ApiMessages";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import { saveAs } from 'file-saver';
export default function ApiAlertComponent(){
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("info")
    const [alertTitle, setAlertTitle] = useState("Нет инициализации")
    const [error, setError] = useState();
    const [statusCode, setStatusCode] = useState(0);
    const [message, setMessage] = useState("");

    const makeMessage = (statCode, url, message) => {
        try {
            let resultMessage = ApiMessages[statCode][url].message;
            setMessage(resultMessage)
        }
        catch (error)
        {
            setMessage(message);
        }
    }
    const handleClose = (event, reason) => {
        setOpen(false);
    };

    // Add a request interceptor
    client.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        console.log("5555555555")
        console.log(error);
        console.log("5555555555")
    });
// Add a response interceptor
    client.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        console.log("--------------------ОШИБКА------------------------")
        console.log(error);
        console.log("--------------------ОШИБКА------------------------")
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        setError(error);
        setAlertTitle("Ошибка");
        setSeverity("error");
        if(error.code === "ECONNABORTED")
        {
            setStatusCode(408);
            setMessage(`Вышло время ожидания ${error.config.timeout} мс. `)
        }
        else if(error.code === "ERR_NETWORK")
        {
            setStatusCode(408);
            setMessage(`Ошибка сети`)
        }
        else
        {
            makeMessage(error.response.status, error.config.url, error.message)
            setStatusCode(error.response.status)
        }
        setOpen(true);

    });
    const saveLog = () => {
        const str = `${alertTitle}\n\r${statusCode}\n\r${message}\n\r${JSON.stringify(error,null, 2)}`;
        const bytes = new TextEncoder().encode(str);
        const blob = new Blob([bytes], {
            type: "application/json;charset=utf-8"
        });
        saveAs(blob, `Лог запроса от ${format(new Date(), 'dd.MM.yyyy HH-mm-ss', {locale:ru})}.txt`);
    };
    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                <AlertTitle>{alertTitle}</AlertTitle>
                Код ошибки: {statusCode}
                <br/>
                Сообщение: {message}
                <br/>
                <Button variant="contained" size="small" startIcon={<DownloadIcon/>} onClick={saveLog}>
                    Скачать отчёт об ошибке
                </Button>
            </Alert>
        </Snackbar>
    );
}