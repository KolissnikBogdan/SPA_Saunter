const initialState = [null];

export default function userInfo (state = initialState, {type , payload}) {
    switch (type) {
        case 'ADD_ITEM':
            console.log('Add item text', payload);
            return state;
        case 'ADD_ITEM_ERROR':
            console.log('Add item text error');
            return state;
        case 'DELETE_ITEM_SUCCESS':
            console.log('Delete item succes');
            return state;
        case 'DELETE_ITEM_ERROR':
            console.log('Delete item error')
            return state;
        default:
            return state;
    }
}