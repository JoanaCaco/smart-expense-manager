import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const budgetApi = createApi({
    reducerPath: "budgetApi",
    tagTypes: ["Budget", "Dashboard"],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user?.token;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getBudgets: builder.query({
            query: () => "/budgets",
            providesTags: ["Budget"],
        }),

        createBudget: builder.mutation({
            query: (newBudget) => ({
                url: "/budgets",
                method: "POST",
                body: newBudget,
            }),
            invalidatesTags: ["Budget", "Dashboard"],
        }),

        updateBudget: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/budgets/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Budget", "Dashboard"],
        }),

        deleteBudget: builder.mutation({
            query: (id) => ({
                url: `/budgets/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Budget", "Dashboard"],
        }),
    }),
});

export const {
    useGetBudgetsQuery,
    useCreateBudgetMutation,
    useUpdateBudgetMutation,
    useDeleteBudgetMutation,
} = budgetApi;