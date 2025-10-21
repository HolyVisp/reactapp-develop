let initialState = localStorage.Token;
if(!initialState)
{
    initialState = "";
}
const defaultState =
    {
        token: initialState
    }
export const AuthorizationReducer = (state = defaultState, action) =>{
    switch(action.type){
        case "CHANGE_IS_LOGIN":
            return {...state, token: action.payload}
        default:
            return state
    }
}



