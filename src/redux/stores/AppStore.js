import { configureStore } from "@reduxjs/toolkit";

import layoutReducer from "../features/layout/Layout_Slice";
import authsReducer from "../features/auths/Auths_Slice";
import dashboardReducer from "../features/dashboard/Dashboard_Slice";
import userManagementReducer from "../features/userManagement/UserManagement_Slice";
// import caseManagementReducer from "../features/caseManagement/CaseManagement.Slice";
// import assetManagementReducer from "../features/assetsManagement/AssetManagement_Slice";
// import reportReducer from "../features/reports/Report_Slice";
// import SettingsReducer from "../features/settings/Settings_Slice";

import AuthsAPI from "../services/api/Auths_API";
import DashboardAPI from "../services/api/Dashboard_API";
import UserManagementAPI from "../services/api/UserManagement_API";
// import CaseManagementAPI from "../services/api/CaseManagement_API";
// import AssetsManagementAPI from "../services/api/AssetsManagement_API";

const appStore = configureStore({
    reducer: {
        layoutState: layoutReducer,
        authsState: authsReducer,
        dashboardState: dashboardReducer,
        userManagementState: userManagementReducer,
        // caseManagementState: caseManagementReducer,
        // assetManagementState: assetManagementReducer,
        // assetReport: reportReducer,
        // setting: SettingsReducer,

        [AuthsAPI.reducerPath]: AuthsAPI.reducer,
        [DashboardAPI.reducerPath]: DashboardAPI.reducer,
        [UserManagementAPI.reducerPath]: UserManagementAPI.reducer,
        // [CaseManagementAPI.reducerPath]: CaseManagementAPI.reducer,
        // [AssetsManagementAPI.reducerPath]: AssetsManagementAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat([
        AuthsAPI.middleware,
        DashboardAPI.middleware,
        UserManagementAPI.middleware,
        // CaseManagementAPI.middleware,
        // AssetsManagementAPI.middleware,
    ]),
});

export default appStore;