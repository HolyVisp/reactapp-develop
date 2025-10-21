const initialState = {
    inIframe: false
};

export const iframeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_IN_IFRAME":
            return {
                ...state,
                inIframe: action.payload
            };
        default:
            return state;
    }
};

export default iframeReducer;