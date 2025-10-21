const defaultState =
    {
        source:null
    }
export const SelectedSourceReducer = (state = defaultState, action) =>{
    switch(action.type){
        case "CHANGE_SOURCE":
            return {...state,
                source: action.payload
            }
        default:
            return state
    }
}



