import {DarkMode, LightMode} from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

export default function ThemeToggleComponent(){
    const dispatch = useDispatch()
    const isDark = useSelector(state => state.theme.isDark)
    const handleButtonClick = () => {
        dispatch({type:"CHANGE_THEME", payload: isDark ? "light" : "dark"})
        localStorage.Theme = isDark ? "light" : "dark";
    };

    return (
        <Tooltip
            title = {isDark ? "Перевести в светлую тему" : "Перевести в темную тему"}
        >
            <IconButton
                size="large"
                onClick={handleButtonClick}
            >
                {isDark ? <LightMode /> : <DarkMode />}
            </IconButton>
        </Tooltip>
    );
}