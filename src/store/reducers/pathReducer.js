const initialState = {
    selectedPath: null
}

const pathReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SELECT_PATH':
            return {
                ...state,
                selectedPath: payload
            };

        default:
            return state;
    }
}

export default pathReducer;