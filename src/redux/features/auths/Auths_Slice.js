import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";


const initialState = {
    staffID: "",
    agentId: "",

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

    isAuthenticated: false,
    isEmailNotificationModalOpen: false,
    isLogoutModalOpen: false,
    isProfileOptionBoxOpen: false,
    isLoading: false,
};


/*==== CREATE SLICE ====*/
export const authsSlice = createSlice({
    name: "authsSlice",
    initialState,
    reducers: {
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
        handleIsLogoutModalChange: (state, action) => {
            state.isLogoutModalOpen = action.payload;
        },
        toggleProfileOptionBox: (state, action) => {
            state.isProfileOptionBoxOpen = action.payload;
        },
        handleUpdateAgentId: (state, action) => {
            state.agentId = action.payload;
        },
        handleUpdateIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        handleIsEmailNotificationModalChange: (state, action) => {
            state.isEmailNotificationModalOpen = action.payload;
        },
        handleLogoutUser: (state) => {
            secureLocalStorage.removeItem("userData");
            state.isAuthenticated = false;
        },
    },
});



const { actions, reducer } = authsSlice;

export const {
    handleInputChange,
    handleTokenInputChange,
    toggleShowPassword,
    handleIsEmailNotificationModalChange,
    handleIsLogoutModalChange,
    handleUpdateAgentId,
    handleUpdateIsAuthenticated,
    toggleProfileOptionBox,
    handleLogoutUser
} = actions;

export default reducer;