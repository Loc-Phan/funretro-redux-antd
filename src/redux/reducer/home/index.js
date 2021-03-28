import * as type from '../../actionType/home';

const initialState = {
    board: [],
    updateBoard: null,
    loading: false
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case (type.ADD_BOARD):
            const data = [...state.board, action.payload]
            return {
                ...state,
                board: data
            }
        case (type.FETCH_DATA):
            return {
                ...state,
                board: action.payload
            }
        case (type.UPDATE_BOARD):
            return {
                ...state,
                updateBoard: action.payload
            }
        case (type.CONFIRM_UPDATE_BOARD):
            const newBoard = state.board.map(data => {
                if (data._id !== action.payload._id) {
                    return action.payload
                }
                else {
                    return data
                }
            })
            return {
                ...state,
                board: newBoard
            }
        case (type.DELETE_BOARD):
            return {
                ...state,
                board: action.payload
            }
        default:
            return state
    }
}

export default homeReducer