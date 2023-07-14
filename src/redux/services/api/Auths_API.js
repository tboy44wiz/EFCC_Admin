import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const AuthsAPI = createApi({
    reducerPath: "authsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://46.101.118.67:6065/api/v1/EFCCAgent",
        // baseUrl: "http://localhost:5000",
    }),

    tagTypes: ["User"],

    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (requestData) => ({
                url: "/Login",
                method: "POST",
                body: requestData
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const { data: responseData } = await queryFulfilled;
                    // console.log("RESPONSE DATA::: ", responseData);
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        validateUser: builder.mutation({
            query: ({ agentId, token }) => ({
                url: `/ValidateUser?agentId=${agentId}&token=${token}`,
                method: "POST",
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const { data: responseData } = await queryFulfilled;
                    // console.log("RESPONSE DATA::: ", responseData);
                } catch (error) {
                    console.log(error);
                }
            }
        }),
    }),
});

export const {
    useLoginUserMutation,
    useValidateUserMutation,
} = AuthsAPI;
export default AuthsAPI;