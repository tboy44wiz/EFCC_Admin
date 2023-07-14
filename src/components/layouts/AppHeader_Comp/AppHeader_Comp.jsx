import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Bell, HamburgerMenu, Logout3, Settings, User} from "solar-icon-set";

/*==== Import Actions ====*/
import {handleIsLogoutModalChange, toggleProfileOptionBox} from "../../../redux/features/auths/Auths_Slice";
import { toggleSideNav } from "../../../redux/features/layout/Layout_Slice";

const AppHeaderComp = () => {
    const { isProfileOptionBoxOpen } = useSelector((state) => state.authsState);
    const { state } = useLocation();
    const dispatch = useDispatch();

    return (
        // <section className="h-auto w-full relative">
        <section className="h-auto w-[calc(100%-340px)] fixed top-[13px]">
            <div className="h-auto px-4 md:px-6 py-5 bg-white rounded-xl flex items-center justify-between shadow shadow-xl shadow-gray-100">
                <div>
                    <h1 className="font-bold text-xl text-[#900000]">{ state !== null ? state.pageTitle : "" }</h1>
                    <p>{ state !== null ? state.subTitle : "" }</p>
                </div>

                {/*==== Hamburger Menu Icon ====*/}
                <div onClick={ () => dispatch(toggleSideNav()) } className="lg:hidden text-gray-600 cursor-pointer">
                    <HamburgerMenu size={32} iconStyle="Outline" />
                </div>

                <div className="hidden lg:flex items-center relative">
                    <div className="hidden lg:flex items-center">
                        <Bell size={30} color="#2021200" className="cursor-pointer" />
                        <div onClick={ (event) => {
                            event.stopPropagation();
                            dispatch(toggleProfileOptionBox(true));
                        } } className="h-[50px] w-[50px] ml-4 bg-[url('/src/assets/images/user_image.png')] bg-cover bg-no-repeat bg-center cursor-pointer" />
                    </div>

                    { (isProfileOptionBoxOpen) ? (
                        <div className="pt-3.5 bg-white rounded-lg absolute top-[50px] right-[-20px] text-gray-500 shadow-lg z-[1000]">
                            <p className="pl-4 pr-10 py-2 flex items-center cursor-pointer hover:bg-black/5 hover:text-gray-700">
                                <User size={20} iconStyle="Outline" className="mr-5" />
                                Profile
                            </p>
                            <p className="pl-4 pr-10 py-2 flex items-center cursor-pointer hover:bg-black/5 hover:text-gray-700">
                                <Settings size={20} iconStyle="Outline" className="mr-5" />
                                Settings
                            </p>
                            <p onClick={ () => {
                                dispatch(toggleProfileOptionBox(false));
                                dispatch(handleIsLogoutModalChange(true));
                            } } className="pl-4 pr-10 py-2 flex items-center cursor-pointer hover:bg-black/5 hover:text-gray-700">
                                <Logout3 size={20} iconStyle="Outline" className="mr-5" />
                                Logout
                            </p>
                        </div>
                    ) : null }
                </div>
            </div>
        </section>
    );
};

export default AppHeaderComp;
