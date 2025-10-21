import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Alert, Box, Button, CircularProgress, Typography} from '@mui/material';
import AuthorizationService from '../Api/Services/AuthorizationService';

const WAITING_TIMEOUT = 60000;

const IframeDetectionComponent = ({ children }) => {
    const [isIframe, setIsIframe] = useState(null);
    const [tokenReceived, setTokenReceived] = useState(false);
    const [error, setError] = useState('');
    const [retryCounter, setRetryCounter] = useState(0);
    const dispatch = useDispatch();
    const timerRef = useRef(null);
    const tokenReceivedRef = useRef(false);

    useEffect(() => {
        let isMounted = true;
        let detectedIframe = false;

        try {
            detectedIframe = window.self !== window.top;
        } catch (e) {
            detectedIframe = true;
        }

        setIsIframe(detectedIframe);
        dispatch({type: 'SET_IN_IFRAME', payload: detectedIframe});

        if (!detectedIframe) {
            return () => {
                isMounted = false;
            };
        }

        tokenReceivedRef.current = false;
        setTokenReceived(false);
        setError('');

        const handleMessage = (event) => {
            if (!event.data || typeof event.data !== 'object') {
                return;
            }

            if (event.data.type !== 'AUTH_TOKEN' || tokenReceivedRef.current) {
                return;
            }

            const token = event.data.token;
            if (!token) {
                setError('Получен пустой токен авторизации.');
                return;
            }

            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }

            AuthorizationService.validate(token)
                .then((response) => {
                    if (!isMounted) {
                        return;
                    }

                    if (response.status === 200) {
                        tokenReceivedRef.current = true;
                        setTokenReceived(true);
                        setError('');

                        dispatch({type: 'CHANGE_IS_LOGIN', payload: token});
                        localStorage.Token = token;

                        try {
                            const payload = JSON.parse(atob(token.split('.')[1]));
                            localStorage.User = JSON.stringify(payload);
                            dispatch({type: 'CHANGE_USER', payload});
                        } catch (e) {
                            const emptyUser = {};
                            localStorage.User = JSON.stringify(emptyUser);
                            dispatch({type: 'CHANGE_USER', payload: emptyUser});
                        }
                    } else {
                        setError('Получен недействительный токен авторизации.');
                    }
                })
                .catch(() => {
                    if (!isMounted) {
                        return;
                    }
                    setError('Не удалось подтвердить токен авторизации.');
                });
        };

        window.addEventListener('message', handleMessage);
        window.parent.postMessage({ type: 'REQUEST_AUTH_TOKEN' }, '*');

        timerRef.current = window.setTimeout(() => {
            if (!tokenReceivedRef.current && isMounted) {
                setError('Не удалось получить токен авторизации от родительского приложения. Попробуйте обновить страницу.');
            }
        }, WAITING_TIMEOUT);

        return () => {
            isMounted = false;
            window.removeEventListener('message', handleMessage);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [dispatch, retryCounter]);

    const handleRetry = () => {
        setError('');
        setRetryCounter((prev) => prev + 1);
    };

    if (isIframe === null) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (isIframe && error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" px={2}>
                <Alert
                    severity="error"
                    action={(
                        <Button color="inherit" size="small" onClick={handleRetry}>
                            Повторить
                        </Button>
                    )}
                    sx={{maxWidth: 480}}
                >
                    {error}
                </Alert>
            </Box>
        );
    }

    if (isIframe && !tokenReceived) {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
                <Typography variant="h6" sx={{mt: 2}}>
                    Ожидание токена от родительского приложения...
                </Typography>
            </Box>
        );
    }

    return children;
};

export default IframeDetectionComponent;
