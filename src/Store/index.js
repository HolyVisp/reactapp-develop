import {combineReducers, createStore} from "redux";
import {ThemeReducer} from "./ThemeReducer";
import {AuthorizationReducer} from "./AuthorizationReducer";
import {NavigationReducer} from "./NavigationReducer";
import {SelectedSourceTypeReducer} from "./SelectedSourceTypeReducer";
import {SelectedSourceReducer} from "./SelectedSourceReducer";
import {UserReducer} from "./UserReducer";
import {iframeReducer} from "./IframeReducer";

const rootReducer = combineReducers({
    theme: ThemeReducer,
    authorization: AuthorizationReducer,
    navigation: NavigationReducer,
    sourceType: SelectedSourceTypeReducer,
    source: SelectedSourceReducer,
    user: UserReducer,
    iframe: iframeReducer
})
export const store = createStore(rootReducer)