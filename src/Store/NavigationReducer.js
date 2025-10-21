const defaultState =
    {
        isOpen: false
    }
export const NavigationReducer = (state = defaultState, action) =>{
    switch(action.type){
        case "CHANGE_IS_OPEN":
            return {...state, isOpen: action.payload}
        default:
            return state
    }
}
