import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import AuthorizationHeader from "../AuthorizationHeader";
import {
    handleUpdateUserActivityTableData,
    handleUpdateUserTableData
} from "../../features/userManagement/UserManagement_Slice";

export const UserManagementAPI = createApi({
    reducerPath: "userManagementAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://46.101.118.67:6065/api/v1"
    }),
    tagTypes: ["UserManagementAPI"],

    endpoints: (builder) => ({
        getAllAgents: builder.query({
            query: ({ pageNumber, pageSize }) => ({
                url: `/EFCCAgentManagement/GetAllAgents?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: "GET",
                headers: AuthorizationHeader(),
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const { data: responseData } = await queryFulfilled;
                    dispatch(handleUpdateUserTableData(responseData.data));
                    // console.log("RESPONSE DATA::: ", responseData);
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        getUserActivity: builder.query({
            query: ({ agentId, pageNumber, pageSize }) => ({
                url: `/EFCCAgentManagement/GetUserActivity?agentId=${agentId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: "GET",
                headers: AuthorizationHeader(),
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const { data: responseData } = await queryFulfilled;
                    dispatch(handleUpdateUserActivityTableData(responseData.data));
                    console.log("RESPONSE DATA::: ", responseData);
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        registerUser: builder.mutation({
            query: (requestData) => ({
                url: "/EFCCAgent/RegisterUser",
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
    }),
});

export const {
    useLazyGetAllAgentsQuery,
    useLazyGetUserActivityQuery,
    useRegisterUserMutation,
} = UserManagementAPI;
export default UserManagementAPI;