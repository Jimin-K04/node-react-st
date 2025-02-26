import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './_reducers/index';
import promiseMiddleware from 'redux-promise';
// console.log("Root Reducer: ",  rootReducer(undefined, { type: "@@INIT" }));
// // 🔍 rootReducer가 undefined인지 확인
// console.log("🔥 rootReducer:", rootReducer);
// console.log("🔥 rootReducer typeof:", typeof rootReducer);
// console.log("🔥 rootReducer keys:", Object.keys(rootReducer || {}));

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production", //Redux Devtools 자동 적용
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(promiseMiddleware)//Redux Thunk 기본 포함함
});


const root = ReactDOM.createRoot(document.getElementById('root')); //index.html root 에 보여 줄 내용(렌더링 할 내용)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
