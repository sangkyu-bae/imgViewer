import { combineReducers } from "redux";
import borderReducer from './borderReducer'
import loginReducer from "./loginReducer";
const rootReducer = combineReducers({
    borderReducer,
    loginReducer
})

export default rootReducer