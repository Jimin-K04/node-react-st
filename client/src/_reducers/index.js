import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user_reducer";

// console.log("🔥 userReducer import 확인:", userReducer); 

const rootReducer = combineReducers({
    user: userReducer
});
// console.log("🔥 rootReducer 생성 확인:", rootReducer);

export default rootReducer;