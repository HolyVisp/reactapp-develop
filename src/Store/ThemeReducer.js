import {createTheme} from "@mui/material";
import { ruRU as coreruRU } from '@mui/material/locale';
import { ruRU } from '@mui/x-date-pickers/locales';
var initialState = localStorage.Theme;

if(!initialState || initialState !== "dark" & initialState !== "light")
{
    initialState = "dark";
    localStorage.Theme = "dark";
}
const defaultState =
    {
        theme: createTheme({
            palette: {
                mode: initialState,
            }
        },
            ruRU,
            coreruRU
            ),
        isDark: initialState === "dark" ? true : false
    }
export const ThemeReducer = (state = defaultState, action) =>{
    switch(action.type){
        case "CHANGE_THEME":
            return {...state,
                isDark: action.payload === "dark" ? true : false,
                theme: createTheme({
                    palette: {
                        mode: action.payload,
                    }},
                    ruRU,
                    coreruRU)}
        default:
            return state
    }
}



