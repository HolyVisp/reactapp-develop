import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Box, Typography } from '@mui/material';
import AuthorizationService from '../Api/Services/AuthorizationService';
import AuthorizationPage from '../Pages/AuthorizationPage';

const IframeDetectionComponent = ({ children }) => {
    const [isIframe, setIsIframe] = useState(null);
    const [tokenReceived, setTokenReceived] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const dispatch = useDispatch();
    const inIframe = useSelector(state => state.iframe.inIframe);

    useEffect(() => {
        // Проверяем, запущено ли приложение внутри iframe
        const inIframe = window.self !== window.top;
        setIsIframe(inIframe);
        // Сохраняем состояние в хранилище
        dispatch({type: "SET_IN_IFRAME", payload: inIframe});

        if (inIframe) {
            // Слушаем сообщения от родительского приложения
            const handleMessage = (event) => {
                // В реальной реализации необходимо проверять источник сообщения
                // Для безопасности следует проверять event.origin на соответствие ожидаемым значениям
                if (event.data && event.data.type === 'AUTH_TOKEN') {
                    const token = event.data.token;
                    if (token) {
                        // Валидируем токен перед использованием
                        AuthorizationService.validate(token)
                            .then(function(response){
                                if(response.status === 200) {
                                    dispatch({type:"CHANGE_IS_LOGIN", payload: token});
                                    localStorage.Token = token;
                                    let user = JSON.parse(atob(token.split('.')[1]));
                                    localStorage.User = JSON.stringify(user)
                                    dispatch({type:"CHANGE_USER", payload: user});
                                    setTokenReceived(true);
                                    setShowAuth(false); // Не показываем страницу авторизации
                                } else {
                                    // Токен невалидный, показываем страницу авторизации
                                    setShowAuth(true);
                                }
                            }).catch(function (error) {
                                // Ошибка валидации, показываем страницу авторизации
                                setShowAuth(true);
                            });
                    }
                }
            };

            window.addEventListener('message', handleMessage);
            
            // Запрашиваем токен у родительского приложения
            window.parent.postMessage({ type: 'REQUEST_AUTH_TOKEN' }, '*');

            // Устанавливаем таймаут для показа страницы авторизации, если токен не получен
            const timeout = setTimeout(() => {
                if (!tokenReceived) {
                    setShowAuth(true);
                }
            }, 10000); // Таймаут 10 секунд

            return () => {
                window.removeEventListener('message', handleMessage);
                clearTimeout(timeout);
            };
        }
    }, [dispatch, tokenReceived]);

    // Показываем индикатор загрузки во время определения наличия iframe
    if (isIframe === null) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    // Если приложение внутри iframe и ожидает токен
    if (isIframe && !tokenReceived && !showAuth) {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                    Ожидание токена от родительского приложения...
                </Typography>
            </Box>
        );
    }

    // Если приложение внутри iframe и токен получен или показывается страница авторизации
    if (isIframe) {
        if (tokenReceived) {
            return children;
        }
        if (showAuth) {
            return <AuthorizationPage />;
        }
    }

    // Если приложение не внутри iframe, показываем обычное приложение
    if (!isIframe) {
        return children;
    }

    // Резервный вариант
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
    );
};

export default IframeDetectionComponent;