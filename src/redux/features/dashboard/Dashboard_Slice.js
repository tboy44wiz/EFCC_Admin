import React from "react";
import { createSlice } from "@reduxjs/toolkit";


/*==== Import Icons & Images ====*/
import MoneyAssetIcon from "../../../assets/images/money_sack_icon.png";
import MapBoxIcon from "../../../assets/images/map_box_icon.png";


const initialState = {
    selectedTab: "Pre Interim Forfeiture",
    selectedAssetsTableTab: "Tangible Assets",

    isTabOneLoading: false,
    tabOneCounterData: [
        {
            title: "Tangible Forfeiture",
            count: 0,
            percent: 0,
            date: "January 2023",
            icon: "",
            color: "text-green-500",
            image: MoneyAssetIcon
        },
        {
            title: "Intangible Forfeiture",
            count: 0,
            percent: 0,
            date: "January 2023",
            icon: "",
            color: "text-red-500",
            image: MapBoxIcon
        },
    ],
    tabOneChartData: {
        categories: ["Tangible Assets", "Intangible Assets"],
        data: []
    },
    tabOneSelectedDateRange: [],

    isTabTwoLoading: false,
    tabTwoCounterData: [
        {
            title: "Tangible Forfeiture",
            count: 0,
            percent: 0,
            date: "January 2023",
            icon: "",
            color: "text-green-500",
            image: MoneyAssetIcon
        },
        {
            title: "Intangible Forfeiture",
            count: 0,
            percent: 0,
            date: "January 2023",
            icon: "",
            color: "text-red-500",
            image: MapBoxIcon
        },
    ],
    tabTwoChartData: {
        categories: ["Assets up for claim", "Pending court verdict"],
        data: []
    },
    tabTwoSelectedDateRange: [],

    isTabThreeLoading: false,
    tabThreeCounterData: [
        {
            title: "Tangible Forfeiture",
            count: 0,
            percent: 0,
            date: "January 2023",
            // icon: <ArrowRightUp size={16} iconStyle="Outline" className="mr-2" />,
            icon: "",
            color: "text-green-500",
            image: MoneyAssetIcon
        },
        {
            title: "Intangible Forfeiture",
            count: 0,
            percent: 0,
            date: "January 2023",
            icon: "",
            color: "text-red-500",
            image: MapBoxIcon
        },
    ],
    tabThreeChartData: {
        categories: ["Unclaimed Assets", "Evidence / Proof of crime", "Convicted"],
        data: []
    },
    tabThreeSelectedDateRange: [],

    isTabFourLoading: false,
    tabFourCounterData: [
        {
            title: "Tangible Forfeiture",
            count: 0,
            percent: 0,
            date: "January 2023",
            icon: "",
            color: "text-green-500",
            image: MoneyAssetIcon
        },
        {
            title: "Intangible Forfeiture",
            count: 0,
            percent: 0,
            date: "January 2023",
            icon: "",
            color: "text-red-500",
            image: MapBoxIcon
        },
    ],
    tabFourChartData: {
        categories: ["Transformed", "Auctioned / Sold", "Destroyed", "Operating Assets", "Restituted"],
        data: []
    },
    tabFourSelectedDateRange: [],

    searchString: "",
    isAssetsTableOpen: false,
    tangibleAssetSelectedDateRange: [],
    selectedAssetType: {label: "Select...", value: "Select"},
    assetTypeOptions: [
        {label: "All", value: "All"},
        {label: "Tangible", value: "Tangible"},
        {label: "Intangible", value: "Intangible"},
    ],
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        handleTabChange: (state, { payload }) => {
            state.selectedTab = payload;
        },

        handleIsTabOneLoading: (state, action) => {
            state.isTabOneLoading = action.payload;
        },
        handleUpdateTabOneData: (state, action) => {
            const { tangibleAssets, intangibleAssets } = action.payload;
            state.tabOneCounterData[0].count = tangibleAssets;
            state.tabOneCounterData[1].count = intangibleAssets;

            state.tabOneCounterData[0].percent = (tangibleAssets / (tangibleAssets + intangibleAssets === 0) && 1) * 100;
            state.tabOneCounterData[1].percent = (intangibleAssets / (tangibleAssets + intangibleAssets === 0) && 1) * 100;
            state.tabOneChartData.data = [tangibleAssets, intangibleAssets];
        },
        handleTabOneDateChange: (state, action) => {
            state.tabOneSelectedDateRange = action.payload;
        },

        handleIsTabTwoLoading: (state, action) => {
            state.isTabTwoLoading = action.payload;
        },
        handleUpdateTabTwoData: (state, action) => {
            const { tangibleAssets, intangibleAssets, assetsUpForCliam, pendingCourtVerdict } = action.payload;
            state.tabTwoCounterData[0].count = tangibleAssets;
            state.tabTwoCounterData[1].count = intangibleAssets;

            state.tabTwoCounterData[0].percent = (tangibleAssets / (tangibleAssets + intangibleAssets <= 0) && 1) * 100;
            state.tabTwoCounterData[1].percent = (intangibleAssets / (tangibleAssets + intangibleAssets <= 0) && 1) * 100;
            state.tabTwoChartData.data = [assetsUpForCliam, pendingCourtVerdict];
        },
        handleTabTwoDateChange: (state, action) => {
            state.tabTwoSelectedDateRange = action.payload;
        },

        handleIsTabThreeLoading: (state, action) => {
            state.isTabThreeLoading = action.payload;
        },
        handleUpdateTabThreeData: (state, action) => {
            const { tangibleAssets, intangibleAssets, evidence, unclaimedAssets, convicted } = action.payload;
            state.tabThreeCounterData[0].count = tangibleAssets;
            state.tabThreeCounterData[1].count = intangibleAssets;

            state.tabThreeCounterData[0].percent = (tangibleAssets / (tangibleAssets + intangibleAssets <= 0) && 1) * 100;
            state.tabThreeCounterData[1].percent = (intangibleAssets / (tangibleAssets + intangibleAssets <= 0) && 1) * 100;
            state.tabThreeChartData.data = [evidence, unclaimedAssets, convicted];
        },
        handleTabThreeDateChange: (state, action) => {
            state.tabThreeSelectedDateRange = action.payload;
        },

        handleIsTabFourLoading: (state, action) => {
            state.isTabFourLoading = action.payload;
        },
        handleUpdateTabFourData: (state, action) => {
            const { tangibleAssets, intangibleAssets, transformed, auctioned, destroyed, operatingAsset, restituted } = action.payload;
            state.tabFourCounterData[0].count = tangibleAssets;
            state.tabFourCounterData[1].count = intangibleAssets;

            state.tabFourCounterData[0].percent = (tangibleAssets / (tangibleAssets + intangibleAssets <= 0) && 1) * 100;
            state.tabFourCounterData[1].percent = (intangibleAssets / (tangibleAssets + intangibleAssets <= 0) && 1) * 100;
            state.tabFourChartData.data = [transformed, auctioned, destroyed, operatingAsset, restituted];
        },
        handleTabFourDateChange: (state, action) => {
            state.tabFourSelectedDateRange = action.payload;
        },

        handleAssetsTableTabChange: (state, action) => {
            state.selectedAssetsTableTab = action.payload;
        },
        handleIsAssetsTableOpenChange: (state, action) => {
            state.isAssetsTableOpen = action.payload;
        },
        handleTangibleAssetDateChange: (state, action) => {
            state.tangibleAssetSelectedDateRange = action.payload;
        },
    },
});

const { actions, reducer } = dashboardSlice;
export const {
    handleTabChange,
    handleIsTabOneLoading, handleUpdateTabOneData, handleTabOneDateChange,
    handleIsTabTwoLoading, handleUpdateTabTwoData, handleTabTwoDateChange,
    handleIsTabThreeLoading, handleUpdateTabThreeData, handleTabThreeDateChange,
    handleIsTabFourLoading, handleUpdateTabFourData, handleTabFourDateChange,
    handleAssetsTableTabChange, handleIsAssetsTableOpenChange, handleTangibleAssetDateChange
} = actions;
export default reducer;