import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const savingGoalApi = createApi({
    reducerPath: "savingGoalApi",
    tagTypes: ["SavingGoal", "Dashboard"],
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
        getSavingGoals: builder.query({
            query: () => "/saving-goals",
            providesTags: ["SavingGoal"],
        }),

        createSavingGoal: builder.mutation({
            query: (newGoal) => ({
                url: "/saving-goals",
                method: "POST",
                body: newGoal,
            }),
            invalidatesTags: ["SavingGoal", "Dashboard"],
        }),

        updateSavingGoal: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/saving-goals/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["SavingGoal", "Dashboard"],
        }),

        deleteSavingGoal: builder.mutation({
            query: (id) => ({
                url: `/saving-goals/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["SavingGoal", "Dashboard"],
        }),
    }),
});

export const {
    useGetSavingGoalsQuery,
    useCreateSavingGoalMutation,
    useUpdateSavingGoalMutation,
    useDeleteSavingGoalMutation,
} = savingGoalApi;