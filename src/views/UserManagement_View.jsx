import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

/*==== Import AppLayoutHOC ====*/
import AppLayoutHOC from "../components/layouts/AppLayout_HOC/AppLayout_HOC.jsx";

/*==== Import Component ====*/
import TabComp from "../components/pages/userManagement/Tab_Comp.jsx";
import Title_Comp from "../components/pages/userManagement/Title_Comp.jsx";
import AllUsersTableComp from "../components/pages/userManagement/userTables/AllUsersTable_Comp.jsx";
import ReportedUsersTableComp from "../components/pages/userManagement/userTables/ReportedUsersTable_Comp.jsx";
import ArchivedUsersTableComp from "../components/pages/userManagement/userTables/ArchivedUser_Comp.jsx";
import CreateUserPageComp from "../components/pages/userManagement/CreateUserPage_Comp/CreateUserPage_Comp.jsx";
import UserReportComp from "../components/pages/userManagement/UserReport_Comp/UserReport_Comp.jsx";

const UserManagementView = () => {
    const { selectedTab } = useSelector((state) => state.userManagementState);
    const dispatch = useDispatch();


    return (
        <AppLayoutHOC>
            <section className="">
                {/*==== Tab Comp ====*/}
                <TabComp />

                {/*==== Title Comp ====*/}
                <Title_Comp />

                {selectedTab === "All Users" ? (
                    <AllUsersTableComp />
                ) : selectedTab === "Reported Users" ? (
                    <ReportedUsersTableComp />
                ) : (
                    <ArchivedUsersTableComp />
                )}


                {/*==== User Modals Slider ====*/}
                <CreateUserPageComp />
                <UserReportComp />
            </section>
        </AppLayoutHOC>
    );
};

export default UserManagementView;