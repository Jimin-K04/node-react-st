import {
    LOGIN_USER,
    REGISTER_USER
} from "../_actions/types";

const initalState = {
    userData: null,
};

export default function userReducer(state = initalState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}; //...은 spread operater. 위의 state 를 그대로 가져옴, backend 에서 가져온 data 를 payload 에 넣어줬음
            break;
        case REGISTER_USER:
            return {...state, register: action.payload};
            break;
        
        default:
            return state;
    }
}