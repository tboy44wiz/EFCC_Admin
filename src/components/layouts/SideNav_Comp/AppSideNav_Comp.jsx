import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    BoxMinimalistic,
    CaseMinimalistic,
    FileText,
    Logout3,
    Settings,
    UsersGroupRounded,
    Widget
} from "solar-icon-set";
import { handleIsLogoutModalChange } from "../../../redux/features/auths/Auths_Slice";
// import { handleIsAssetsDetailChange } from "../../../redux/features/assetsManagement/AssetManagement_Slice.js";

const AppSideNavComp = () => {
    const { isSideNavOpen } = useSelector((state) => state.layoutState);
    const dispatch = useDispatch();
    const hour = new Date().getHours();
    // console.log("PATH NAME::: ", pathname);

    const menuItems = [
        {
            iconOutline: <Widget size={24} width={24} height={24} iconStyle="Outline" />,
            iconBold: <Widget size={24} iconStyle="Bold" />,
            title: "My Dashboard",
            subTitle: (hour < 12) ? "Good morning" : (hour < 18) ? "Good afternoon" : "Good evening",
            link: "/dashboard"
        },
        {
            iconOutline: <UsersGroupRounded size={24} iconStyle="Outline" />,
            iconBold: <UsersGroupRounded size={24} iconStyle="Bold" />,
            title: "User Management",
            subTitle: "View and manage users",
            link: "/user_management"
        },
        {
            iconOutline: <CaseMinimalistic size={24} width={24} height={24} iconStyle="Outline" />,
            iconBold: <CaseMinimalistic size={24} iconStyle="Bold" />,
            title: "Case Management",
            subTitle: "View and manage cases",
            link: "/case_management"
        },
        {
            iconOutline: <BoxMinimalistic size={24} iconStyle="Outline" />,
            iconBold: <BoxMinimalistic size={24} iconStyle="Bold" />,
            title: "Asset Management",
            subTitle: "View and manage assets",
            link: "/asset_management"
        },
        {
            iconOutline: <FileText size={24} iconStyle="Outline" />,
            iconBold: <FileText size={24} iconStyle="Bold" />,
            title: "Reports",
            subTitle: "View reports",
            link: "/reports"
        },
        {
            iconOutline: <Settings size={24} iconStyle="Outline" />,
            iconBold: <Settings size={24} iconStyle="Bold" />,
            title: "Settings",
            subTitle: "Update and manage user information",
            link: "/settings"
        }
    ];


    return (
        <section className={ (isSideNavOpen) ? (
            "h-screen w-full lg:w-auto px-[15px] py-[13px] lg:block fixed left-0 z-[1000] bg-gray-100 transition-all ease-in-out duration-300"
        ) : (
            "h-screen w-full md:w-auto px-[15px] py-[13px] lg:block fixed left-[-100%] lg:left-0 z-[1000] bg-gray-100 transition-all ease-in-out duration-300"
        )}>
            <div className="h-full w-full lg:w-[280px] py-4 rounded-xl bg-white">
                <div className="flex items-center px-7">
                    <div className="h-12 w-12 bg-AppLogo bg-contain bg-center bg-no-repeat mr-3" />
                    <div>
                        <h1 className="font-semibold text-xl lg:text-2xl text-red-600 drop-shadow-md">NAIIMS</h1>
                        <p className="font-semibold">Admin</p>
                    </div>
                </div>

                <ul className="mt-6 lg:mt-10">
                    {
                        menuItems.map((eachMenuItem) => (
                            <li key={ eachMenuItem.link } className="px-4">
                                <NavLink to={ eachMenuItem.link } state={{ pageTitle: eachMenuItem.title, subTitle: eachMenuItem.subTitle }}
                                         onClick={ () => {
                                             // dispatch(handleIsAssetsDetailChange(false));
                                             dispatch(handleIsLogoutModalChange(false));
                                         } }
                                         className={
                                             ({isActive}) => isActive ?
                                                 "w-full pt-3 pb-2.5 px-3 rounded-2xl flex items-center justify-start bg-[red] bg-opacity-10 font-bold text-red-500" :
                                                 "py-4 px-3 flex items-center justify-start"
                                         }
                                >
                                    <div className="mr-4">
                                        { eachMenuItem.iconOutline }
                                    </div>
                                    <p>{ eachMenuItem.title }</p>
                                </NavLink>
                            </li>
                        ))
                    }

                    <li onClick={ () => dispatch(handleIsLogoutModalChange(true)) } className="px-7 py-4 flex items-center justify-start cursor-pointer">
                        <Logout3 size={24} iconStyle="Outline" className="mr-4" />
                        <p>Logout</p>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default AppSideNavComp;
