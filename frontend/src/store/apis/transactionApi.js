import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
    reducerPath: "transactionApi",
    tagTypes: ["Transaction", "Dashboard"],
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
        getTransactions: builder.query({
            query: () => "/transactions",
            providesTags: ["Transaction"],
        }),

        createTransaction: builder.mutation({
            query: (newTransaction) => ({
                url: "/transactions",
                method: "POST",
                body: newTransaction,
            }),
            invalidatesTags: ["Transaction", "Dashboard"],
        }),

        updateTransaction: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/transactions/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Transaction", "Dashboard"],
        }),

        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `/transactions/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Transaction", "Dashboard"],
        }),
    }),
});

export const {
    useGetTransactionsQuery,
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation,
} = transactionApi;