import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import ExpSliceReducer from './expenseReducer'
import themeReducer from "./themeReducer";


const store =configureStore({
    reducer:{auth:authReducer,exp:ExpSliceReducer,theme:themeReducer}
});

export default store