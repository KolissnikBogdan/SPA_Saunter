import itemsReduser from "./itemsReduser";
import pathReducer from "./pathReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
    path: pathReducer,
    itemDescript: itemsReduser,
    firestore: firestoreReducer
})

export default rootReducer;