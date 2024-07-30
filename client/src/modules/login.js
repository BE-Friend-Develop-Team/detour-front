import { createAction, handleActions } from "redux-actions";

// type 생성
const SET_PREVIOUS_URL = "user/SET_PREVIOUS_URL";
const SET_USER = "user/SET_USER";
const SET_USER_STATUS = "user/SET_USER_STATUS";
const SET_USER_LOGOUT = "user/SET_USER_LOGOUT";

const DELETE_USER = "user/DELETE_USER";

// 초기값
const userInitialState = {
    currentUser: {},
    isLogin: false,
    previousURL: "",
};

// action을 생성
export const setPreviousURL = createAction(SET_PREVIOUS_URL, (previousURL) => previousURL);
export const setUser = createAction(SET_USER, (currentUser) => currentUser);
export const setUserStatus = createAction(SET_USER_STATUS, (isLogin) => isLogin);
export const setUserLogout = createAction(SET_USER_LOGOUT, (currentUser, isLogin) => ({ currentUser, isLogin }));
export const deleteUser = createAction(DELETE_USER, (currentUser, isLogin) => ({ currentUser, isLogin }));

// reducer 생성
const userReducer = handleActions(
    {
        [SET_PREVIOUS_URL]: (state, action) => ({ ...state, previousURL: action.payload }),
        [SET_USER]: (state, action) => ({ ...state, currentUser: action.payload }),
        [SET_USER_STATUS]: (state, action) => ({ ...state, isLogin: action.payload }),
        [SET_USER_LOGOUT]: (state, action) => ({
            ...state,
            currentUser: action.payload.currentUser,
            isLogin: action.payload.isLogin,
        }),
        [DELETE_USER]: (state, action) => ({
            ...state,
            currentUser: action.payload.currentUser,
            isLogin: action.payload.isLogin,
        }),
    },
    userInitialState
);

export default userReducer;
