import * as type from '../../actionType/board'

const initialState = {
    data: [],
    data1: [],
    data2: [],
    data3: [],
    reFetchData: 0,
    loading: false
}

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case (type.FETCH_DATA):
            const dataCard = action.payload
            const col1 = dataCard.filter((data) => {
                return data.type === 1
            })
            const col2 = dataCard.filter((data) => {
                return data.type === 2
            })
            const col3 = dataCard.filter((data) => {
                return data.type === 3
            })
            return {
                ...state,
                data: action.payload,
                data1: col1,
                data2: col2,
                data3: col3,
            }
        case (type.FETCH_DATA_TYPE1):
            // console.log(action.payload);
            return {
                ...state,
                data1: action.payload
            }
        case (type.FETCH_DATA_TYPE2):
            return {
                ...state,
                data2: action.payload
            }
        case (type.FETCH_DATA_TYPE3):
            return {
                ...state,
                data3: action.payload
            }
        case (type.ADD_DATA_TYPE1):
            return {
                ...state,
                data1: [...state.data1, action.payload]
            }
        case (type.ADD_DATA_TYPE2):
            return {
                ...state,
                data2: [...state.data2, action.payload]
            }
        case (type.ADD_DATA_TYPE3):
            return {
                ...state,
                data3: [...state.data3, action.payload]
            }
        case (type.RE_FETCH_DATA):
            return {
                ...state,
                reFetchData: state.reFetchData + 1
            }
        default:
            return state
    }
}

export default boardReducer