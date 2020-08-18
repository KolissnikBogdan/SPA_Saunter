import computeDistance from "../../utils/computeDistance";

export const addItem = ({ title, sDescript, fDescript, pathLength, route }) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('pathDescription').add({
            title,
            sDescript,
            fDescript,
            pathLength: computeDistance(route),
            route,
            favorite: false,
            createAt: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_ITEM', payload: {
                    title,
                    sDescript,
                    fDescript,
                    pathLength: computeDistance(route),
                    route,
                    favorite: false,
                    createAt: new Date()
                }
            });
        }).catch((err) => {
            dispatch({ type: 'ADD_ITEM_ERROR', err });
        })
    }
};

export const deleteItem = (id) => {
    return (dispatch, getState, { getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('pathDescription').doc(id).delete().then(
            () => {
                dispatch({ type: 'DELETE_ITEM_SUCCESS' });
            }).catch(err => {
            dispatch({ type: 'DELETE_ITEM_ERROR' });
        })
    }
}

export const markFavorite = id => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('pathDescription').doc(id).get()
            .then(res => (res.data()['favorite']))
            .then(switcher => firestore.collection('pathDescription').doc(id).update({
                favorite: !switcher
            }))
    }
}

export const selectItem = selectedPath => {
    return {
        type: 'SELECT_PATH',
        payload: selectedPath
    }
};