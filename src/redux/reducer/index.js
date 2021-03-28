import { combineReducers } from 'redux'
import homeReducer from './home'
import useReducer from './user'
import boardReducer from './board'

const rootReducer = combineReducers({
    user: useReducer,
    home: homeReducer,
    board: boardReducer
})
export default rootReducer