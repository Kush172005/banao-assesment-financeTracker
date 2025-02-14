import { createSlice } from "@reduxjs/toolkit";

const transactionsSlice = createSlice({
    name: "transactions",
    initialState: { transactions: [] },
    reducers: {
        addTransaction: (state, action) => {
            state.transactions.push(action.payload);
        },
        editTransaction: (state, action) => {
            const index = state.transactions.findIndex(
                (t) => t.id === action.payload.id
            );
            if (index !== -1) state.transactions[index] = action.payload;
        },
        deleteTransaction: (state, action) => {
            state.transactions = state.transactions.filter(
                (t) => t.id !== action.payload
            );
        },
    },
});

export const { addTransaction, editTransaction, deleteTransaction } =
    transactionsSlice.actions;
export default transactionsSlice.reducer;
