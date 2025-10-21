import { Outlet } from 'react-router-dom';
import {
    Box,
    Grid
} from "@mui/material";
import {useSelector} from "react-redux";
import AppBarComponent from "../AppBarComponent";




export default function NavigationRoute(){
    const isOpen = useSelector(state => state.navigation.isOpen)
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <AppBarComponent/>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Outlet />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};