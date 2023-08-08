import { createSlice } from "@reduxjs/toolkit";


const initialExpState = {
    items: [],

};

const ExpSlice = createSlice({
    name: 'Expense',
    initialState: initialExpState,
    reducers: {
        addItemHandler(state, action) {
            state.items = [...action.payload]
            // let newitem = {
            //   items: [...action.payload]
            //  }
            // return newitem
        }
    }
});

export const expAction = ExpSlice.actions;
export default ExpSlice.reducer;