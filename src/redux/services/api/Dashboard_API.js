import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import AuthorizationHeader from "../AuthorizationHeader.js";
import {
    handleIsTabFourLoading,
    handleIsTabOneLoading, handleIsTabThreeLoading,
    handleIsTabTwoLoading, handleUpdateTabFourData,
    handleUpdateTabOneData, handleUpdateTabThreeData, handleUpdateTabTwoData
} from "../../features/dashboard/Dashboard_Slice.js";

export const DashboardAPI = createApi({
    reducerPath: "dashboardAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://46.101.118.67:6065/api/v1/EFCCAssetDashboard"
    }),
    tagTypes: ["Dashboard"],
    endpoints: (builder) => ({
        getPreInterimForfeitureStats: builder.query({
            query: ({ startDate, endDate }) => ({
                url: `/GetPreInterimForfeitureStats?startDate=${startDate}&endDate=${endDate}`,
                method: "GET",
                headers: AuthorizationHeader(),
            }),
            /*providesTags: ["Dashboard"],*/
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                dispatch(handleIsTabOneLoading(true));
                try {
                    const { data: preInterimData } = await queryFulfilled;
                    dispatch(handleUpdateTabOneData(preInterimData.data));
                    dispatch(handleIsTabOneLoading(false));
                    // console.log("RESPONSE DATA::: ", preInterimData.data);
                } catch (error) {
                    console.log(error);
                    dispatch(handleIsTabOneLoading(false));
                }
            },
        }),
        getInterimForfeitureStats: builder.query({
            query: ({ startDate, endDate }) => ({
                url: `/GetInterimForfeitureStats?startDate=${startDate}&endDate=${endDate}`,
                method: "GET",
                headers: AuthorizationHeader(),
            }),
            // providesTags: ["Dashboard"],
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                dispatch(handleIsTabTwoLoading(true));
                try {
                    const { data: interimData } = await queryFulfilled;
                    dispatch(handleUpdateTabTwoData(interimData.data));
                    dispatch(handleIsTabTwoLoading(false));
                } catch (error) {
                    console.log(error);
                    dispatch(handleIsTabTwoLoading(false));
                }
            },
        }),
        getFinalForfeitureStats: builder.query({
            query: ({ startDate, endDate }) => ({
                url: `/GetFinalForfeitureStats?startDate=${startDate}&endDate=${endDate}`,
                method: "GET",
                headers: AuthorizationHeader(),
            }),
            providesTags: ["Dashboard"],
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                dispatch(handleIsTabThreeLoading(true));
                try {
                    const { data: finalData } = await queryFulfilled;
                    dispatch(handleUpdateTabThreeData(finalData.data));
                    dispatch(handleIsTabThreeLoading(false));
                } catch (error) {
                    console.log(error);
                    dispatch(handleIsTabThreeLoading(false));
                }
            },
        }),
        getDisposedForfeitureStats: builder.query({
            query: ({ startDate, endDate }) => ({
                url: `/GetDisposedForfeitureStats?startDate=${startDate}&endDate=${endDate}`,
                method: "GET",
                headers: AuthorizationHeader(),
            }),
            providesTags: ["Dashboard"],
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                dispatch(handleIsTabFourLoading(true));
                try {
                    const { data: disposedData } = await queryFulfilled
                    dispatch(handleUpdateTabFourData(disposedData.data));
                    dispatch(handleIsTabFourLoading(false));
                } catch (error) {
                    console.log(error);
                    dispatch(handleIsTabFourLoading(false));
                }
            },
        }),

        searchForTangibleAsset: builder.query({
            query: ({ searchString }) => ({
                url: `/GetDisposedForfeitureStats?startDate=${searchString}`,
                method: "GET",
                headers: AuthorizationHeader(),
            }),
            providesTags: ["Dashboard"],
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                dispatch(handleIsTabFourLoading(true));
                try {
                    const { data: disposedData } = await queryFulfilled
                    dispatch(handleUpdateTabFourData(disposedData.data));
                    dispatch(handleIsTabFourLoading(false));
                } catch (error) {
                    console.log(error);
                    dispatch(handleIsTabFourLoading(false));
                }
            },
        }),
    }),
});

export const {
    useGetPreInterimForfeitureStatsQuery,
    useGetInterimForfeitureStatsQuery,
    useGetFinalForfeitureStatsQuery,
    useGetDisposedForfeitureStatsQuery,
    searchForTangibleAsset
} = DashboardAPI;
export default DashboardAPI;