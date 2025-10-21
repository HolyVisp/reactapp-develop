import React from 'react';
import {
    Stack,
    Button,
    Typography
} from "@mui/material";
import { Link } from "react-router-dom";
export default function ErrorPage() {


    return (
        <>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                style={{ minHeight: '100vh' }}
            >
                <Typography
                    variant="h1"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    Ошибка 404
                </Typography>
                <Typography
                    variant="h2"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    Страница не найдена
                </Typography>
                <Button variant="contained" component={Link} to={"/"}>
                    Вернуться на главную страницу
                </Button>
            </Stack>
        </>
    );
}