import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    budgetGoals: [],
};

const budgetGoalsSlice = createSlice({
    name: "budgetGoals",
    initialState,
    reducers: {
        addBudgetGoal: (state, action) => {
            state.budgetGoals.push(action.payload);
        },
        editBudgetGoal: (state, action) => {
            const index = state.budgetGoals.findIndex(
                (g) => g.id === action.payload.id
            );
            if (index !== -1) {
                state.budgetGoals[index] = action.payload;
            }
        },
        deleteBudgetGoal: (state, action) => {
            state.budgetGoals = state.budgetGoals.filter(
                (g) => g.id !== action.payload
            );
        },
    },
});

export const { addBudgetGoal, editBudgetGoal, deleteBudgetGoal } =
    budgetGoalsSlice.actions;
export default budgetGoalsSlice.reducer;
