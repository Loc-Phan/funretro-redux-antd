import * as types from '../../actionType/board'

export const fetchDataBoard = (data) => {
    return {
        type: types.FETCH_DATA,
        payload: data
    }
}

export const fetchDataType1 = (data) => {
    return {
        type: types.FETCH_DATA_TYPE1,
        payload: data
    }
}

export const fetchDataType2 = (data) => {
    return {
        type: types.FETCH_DATA_TYPE2,
        payload: data
    }
}

export const fetchDataType3 = (data) => {
    return {
        type: types.FETCH_DATA_TYPE3,
        payload: data
    }
}

export const addDataType1 = (data) => {
    return {
        type: types.ADD_DATA_TYPE1,
        payload: data
    }
}

export const addDataType2 = (data) => {
    return {
        type: types.ADD_DATA_TYPE2,
        payload: data
    }
}

export const addDataType3 = (data) => {
    return {
        type: types.ADD_DATA_TYPE3,
        payload: data
    }
}

export const reFetchData = () => {
    return {
        type: types.RE_FETCH_DATA,
        payload: null
    }
}