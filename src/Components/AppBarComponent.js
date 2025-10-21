import {Box, Toolbar} from "@mui/material";
import ThemeToggleComponent from "./ThemeToggleComponent";
import MuiAppBar from '@mui/material/AppBar';
import BreadcrumbsComponent from "./BreadcrumbsComponent";


export default function AppBarComponent(){
    return (
        <MuiAppBar position="fixed">
            <Toolbar>
                <Box sx={{flexGrow:1}}>
                    <BreadcrumbsComponent/>
                </Box>
                <ThemeToggleComponent/>
            </Toolbar>
        </MuiAppBar>
    );
}