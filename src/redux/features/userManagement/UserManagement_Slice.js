import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";
import UserTableData from "../../../utils/UserTableData.json";


const initialState = {
    selectedTab: "All Users",
    userTableData: [],
    selectedDateRange: [],

    staffID: "",
    agentId: "",

    isCreateUserModalOpen: false,
    id: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "",
    zone: "",
    selectedRole: {label: "Select...", value: "Select"},
    roleOption: [
        {label: "Super Admin", value: "1"},
        {label: "Low Level Admin", value: "2"},
        {label: "Mid Level Admin", value: "3"},
        {label: "High Level Admin", value: "4"},
    ],

    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    token: "",

    isUserReportModalOpen: false,
    userActivityTableData: UserTableData.UserActivityTable,
    singleUserDetail: {},
    isLoading: false,
};


/*==== CREATE SLICE ====*/
export const userManagementSlice = createSlice({
    name: "userManagementSlice",
    initialState,
    reducers: {
        handleTabChange: (state, action) => {
            state.selectedTab = action.payload;
        },
        handleSelectedDateChange: (state, action) => {
            state.selectedDateRange = action.payload;
        },
        handleUpdateUserTableData: (state, action) => {
            state.userTableData = action.payload;
        },
        handleUpdateUserActivityTableData: (state, action) => {
            state.userActivityTableData = action.payload;
        },
        handleUpdateSingleUserDetail: (state, action) => {
            state.singleUserDetail = action.payload;
        },


        handleIsCreateUserModalChange: (state, action) => {
            state.isCreateUserModalOpen = action.payload;
        },
        handleInputChange: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
        handleTokenInputChange: (state, action) => {
            const { value } = action.payload;
            state.token = value;
        },
        toggleShowPassword: (state) => {
            state.showPassword = !state.showPassword;
        },


        handleSelectedRoleChange: (state, action) => {
            state.selectedRole = action.payload;
        },
        toggleShowConfirmPassword: (state) => {
            state.showConfirmPassword = !state.showConfirmPassword;
        },
        handleUpdateAgentId: (state, action) => {
            state.agentId = action.payload;
        },
        handleLogoutUser: (state) => {
            secureLocalStorage.removeItem("userData");
            state.isAuthenticated = false;
        },

        handleIsUserReportModalChange: (state, { payload }) => {
            state.isUserReportModalOpen = payload;
        },
    },
});



const { actions, reducer } = userManagementSlice;

export const {
    handleTabChange, handleSelectedDateChange,
    handleUpdateUserTableData, handleUpdateUserActivityTableData, handleUpdateSingleUserDetail,

    handleIsCreateUserModalChange,
    handleInputChange,
    handleSelectedRoleChange,
    handleTokenInputChange,
    toggleShowPassword, toggleShowConfirmPassword,
    handleUpdateAgentId,

    handleIsUserReportModalChange,

    handleLogoutUser,
} = actions;

export default reducer;