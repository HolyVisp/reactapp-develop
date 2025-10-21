import {Outlet} from 'react-router-dom';
import {Box, Container, Toolbar} from "@mui/material";
import AppBarComponent from "../AppBarComponent";

// Единый лэйаут приложения: фиксированная верхняя панель и основная область контента
export default function NavigationRoute(){
    return (
        <>
            <AppBarComponent/>
            <Box component="main" sx={{flexGrow: 1, bgcolor: "background.default", minHeight: "100vh"}}>
                {/* Отступ, компенсирующий фиксированную AppBar */}
                <Toolbar/>
                <Container maxWidth="xl" sx={{pt: 4, pb: 6}}>
                    <Outlet />
                </Container>
            </Box>
        </>
    );
};