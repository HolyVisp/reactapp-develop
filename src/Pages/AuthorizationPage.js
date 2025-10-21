import React, {useState} from "react"
import {
    Stack,
    TextField,
    Button,
    Typography,
    Paper,
    Box, AlertTitle, Alert, Snackbar, Backdrop, CircularProgress
} from "@mui/material"
import ThemeToggleComponent from "../Components/ThemeToggleComponent";
import {useDispatch} from "react-redux";
import AuthorizationService from "../Api/Services/AuthorizationService";

export default function AuthorizationPage() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    // Состояния для alert.
    const [severity, setSeverity] = useState("info");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    // Состояние для Backdrop.
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleClose = (event, reason) => {
        setOpen(false);
    };
    const authorize = () =>{
        if (login === "")
        {
            setMessage(prevState => "Имя пользователя не может быть пустым");
            setSeverity(prevState => "error");
            setOpen(prevState => true);
            return;
        }
        if (password === "")
        {
            setMessage(prevState => "Пароль не может быть пустым");
            setSeverity(prevState => "error");
            setOpen(prevState => true);
            return;
        }
        setOpenBackdrop(prevState => true);
        let baseStr = login + ':' + password;
        baseStr = btoa(baseStr);
        AuthorizationService.login(baseStr, 0, "123456")
            .then(function(response){
                localStorage.Token = response.data.userToken;
                let user = JSON.parse(atob(response.data.userToken.split('.')[1]));
                localStorage.User = JSON.stringify(user)
                dispatch({type:"CHANGE_IS_LOGIN", payload: response.data.userToken});
                dispatch({type:"CHANGE_USER", payload: user});
                setOpenBackdrop(prevState => false);
            }).catch(function (error) {
            setOpenBackdrop(prevState => false);
        });
    }

    const keyDownHandler = (event) => {
        if (event.key === "Enter") {
            authorize()
        }
    }
    const handleLoginChange = (e) => {
        setLogin(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    return (
        <>
            <Box
                display="flex"
                width={'100wh'}
                height={'100vh'}
                alignItems="center"
                justifyContent="center"
            >
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
                        <AlertTitle>Ошибка</AlertTitle>
                        Сообщение: {message}
                    </Alert>
                </Snackbar>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    style={{ position: 'absolute', top: '0', right: '0', margin: '5px'}}
                >
                    <Paper elevation={6} >
                        <ThemeToggleComponent/>
                    </Paper>
                </Stack>
                <Paper elevation={6} style={{ padding:'40px'}} id="loginForm">
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography
                            variant="h2"
                        >
                            Сервис "Архив"
                        </Typography>
                        <Typography
                            variant="caption"
                        >
                            вы зашли в сервис не через основное приложение
                        </Typography>
                        <Typography
                            variant="caption"
                        >
                            стабильная работа не гарантируется
                        </Typography>
                        <TextField
                            variant="filled"
                            label="Имя пользователя"
                            id="nameInput"
                            onChange={handleLoginChange}
                            onKeyDown={keyDownHandler}
                        />
                        <TextField
                            variant="filled"
                            label="Пароль"
                            type="password"
                            id="passwordInput"
                            onChange={handlePasswordChange}
                            onKeyDown={keyDownHandler}
                        />
                        <Button variant="contained" id="loginButton" onClick={authorize}>
                            Войти
                        </Button>
                    </Stack>
                    <Backdrop
                        open={openBackdrop}
                    >
                        <CircularProgress />
                    </Backdrop>
                </Paper>

            </Box>
        </>
    )
}
