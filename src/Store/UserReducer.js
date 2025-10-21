let initialState = localStorage.User;
if(!initialState)
{
    initialState = {
        aud:"",
        exp:-1,
        iss:"",
        userApiKey: "",
        userName: "",
        userRole:""
    }
}
else
{
    initialState = JSON.parse(localStorage.User)
}
const defaultState = initialState
export const UserReducer = (state = defaultState, action) =>{
    switch(action.type){
        case "CHANGE_USER":
            return {...state, ...action.payload}
        default:
            return state
    }
}



