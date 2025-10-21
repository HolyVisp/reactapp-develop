import { Outlet } from 'react-router-dom';
import {
    CssBaseline,
    ThemeProvider,
} from "@mui/material";
import {useSelector} from "react-redux";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
export default function StyleRoute(){
    const theme = useSelector(state => state.theme.theme)
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <main>
                    <Outlet />
                </main>
            </ThemeProvider>
        </>
    );
};