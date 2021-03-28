import *as type from '../../actionType/user'

const users = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
    user: users,
    loading: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case (type.ADD_USER):
            const user = JSON.stringify(action.payload)
            localStorage.setItem('user', user)
            return {
                ...state,
                user: action.payload
            }
        case (type.LOG_OUT):
            localStorage.setItem('user', null)
            return {
                ...state,
                payload: null
            }
        default:
            return state
    }
}

export default userReducer