import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import { userApi } from "./apis/userApi";
import { dashboardApi } from "./apis/dashboardApi";
import { transactionApi } from "./apis/transactionApi";
import { budgetApi } from "./apis/budgetApi";
import { savingGoalApi } from "./apis/savingGoalApi";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer,
        [budgetApi.reducerPath]: budgetApi.reducer,
        [savingGoalApi.reducerPath]: savingGoalApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(dashboardApi.middleware)
            .concat(transactionApi.middleware)
            .concat(budgetApi.middleware)
            .concat(savingGoalApi.middleware),
});