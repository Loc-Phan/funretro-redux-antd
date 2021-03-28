import * as types from '../../actionType/home';

export const addBoard = (data) => {
    return {
        type: types.ADD_BOARD,
        payload: data
    }
}

export const fetchData = (data) => {
    return {
        type: types.FETCH_DATA,
        payload: data
    }
}

export const updateBoard = (data) => {
    return {
        type: types.UPDATE_BOARD,
        payload: data
    }
}

export const confirmUpdateBoard = (data) => {
    return {
        type: types.CONFIRM_UPDATE_BOARD,
        payload: data
    }
}

export const deleteBoard = (data) => {
    return {
        type: types.DELETE_BOARD,
        payload: data
    }
}