import { configureStore } from "@reduxjs/toolkit"
import transactionsReducer from "./slices/transactionsSlice"
import budgetGoalsReducer from "./slices/budgetGoalsSlice"
import { exchangeRateApi } from "./services/exchangeRateApi"

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budgetGoals: budgetGoalsReducer,
    [exchangeRateApi.reducerPath]: exchangeRateApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(exchangeRateApi.middleware),
})

