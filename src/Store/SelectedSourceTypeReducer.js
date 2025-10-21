const defaultState =
    {
        sourceType:null
    }
export const SelectedSourceTypeReducer = (state = defaultState, action) =>{
    switch(action.type){
        case "CHANGE_SOURCE_TYPE":
            return {...state,
                sourceType: action.payload
               }
        default:
            return state
    }
}



